import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  updateProfile as firebaseUpdateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import { User, AuthState } from '../types';
import authService from '../services/authService';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => void;
  signInWithGoogle: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'LOGOUT' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: action.payload !== null,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

// Helper to map Firebase User to App User
const mapFirebaseUser = (firebaseUser: FirebaseUser): User => {
  return {
    id: firebaseUser.uid,
    email: firebaseUser.email || '',
    fullName: firebaseUser.displayName || 'User',
    profilePictureUrl: firebaseUser.photoURL || undefined,
    isEmailVerified: firebaseUser.emailVerified,
    createdAt: firebaseUser.metadata.creationTime || new Date().toISOString(),
    updatedAt: firebaseUser.metadata.lastSignInTime || new Date().toISOString(),
    // Default values for other required fields
    isActive: true
  };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Get token first to ensure we can make requests
          await firebaseUser.getIdToken();

          // Sync with backend to get full profile
          const backendUser = await authService.syncUser();
          dispatch({ type: 'SET_USER', payload: { ...backendUser, updatedAt: backendUser.updatedAt || new Date().toISOString() } });
        } catch (error) {
          console.error("Failed to sync user with backend", error);
          // Fallback to basic Firebase user if backend fails
          const user = mapFirebaseUser(firebaseUser);
          dispatch({ type: 'SET_USER', payload: user });
        }
      } else {
        dispatch({ type: 'SET_USER', payload: null });
      }
      dispatch({ type: 'SET_LOADING', payload: false });
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // State updated by onAuthStateChanged
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      throw error;
    }
  };

  const register = async (email: string, password: string, fullName: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await firebaseUpdateProfile(userCredential.user, {
        displayName: fullName
      });
      // State updated by onAuthStateChanged
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await signInWithPopup(auth, googleProvider);
      // State updated by onAuthStateChanged
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const updateProfile = async (userData: Partial<User>) => {
    if (!auth.currentUser) throw new Error('No user logged in');

    if (userData.fullName || userData.profilePictureUrl) {
      await firebaseUpdateProfile(auth.currentUser, {
        displayName: userData.fullName,
        photoURL: userData.profilePictureUrl
      });

      // Refresh user in state
      const updatedUser = mapFirebaseUser(auth.currentUser);
      dispatch({ type: 'SET_USER', payload: updatedUser });
    }
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    signInWithGoogle,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};