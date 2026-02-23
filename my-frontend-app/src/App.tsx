import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Loading from './components/common/Loading';

// Lazy load pages
const HomePage = React.lazy(() => import('./pages/home/HomePage'));
const TestsPage = React.lazy(() => import('./pages/tests/TestsPage'));
const TestPage = React.lazy(() => import('./pages/tests/TestPage'));
const ReasoningTestPage = React.lazy(() => import('./pages/tests/ReasoningTestPage'));
const PsychologyTestPage = React.lazy(() => import('./pages/tests/PsychologyTestPage'));
const PersonalityTestPage = React.lazy(() => import('./pages/tests/PersonalityTestPage'));
const EducationTestPage = React.lazy(() => import('./pages/tests/EducationTestPage'));
const ResultsPage = React.lazy(() => import('./pages/results/ResultsPage'));
const ProfilePage = React.lazy(() => import('./pages/profile/ProfilePage'));
const BlogPage = React.lazy(() => import('./pages/blog/BlogPage'));
const LoginPage = React.lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/auth/RegisterPage'));
const CareerPage = React.lazy(() => import('./pages/career/CareerPage'));
const AssessmentListPage = React.lazy(() => import('./pages/admin/AssessmentListPage'));
const AssessmentEditorPage = React.lazy(() => import('./pages/admin/AssessmentEditorPage'));
const DynamicTestPage = React.lazy(() => import('./pages/tests/DynamicTestPage'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100">
            <Navbar />
            <main className="pt-20">
              <Suspense fallback={<Loading />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/tests" element={<TestsPage />} />
                  <Route path="/test/:testId" element={<DynamicTestPage />} />
                  {/* Admin Routes - Public Access Requested by User */}
                  <Route path="/admin/assessments" element={<AssessmentListPage />} />
                  <Route path="/admin/assessments/new" element={<AssessmentEditorPage />} />
                  <Route path="/admin/assessments/:id" element={<AssessmentEditorPage />} />
                  {/* New test category routes */}
                  <Route path="/test/reasoning" element={<ReasoningTestPage />} />
                  <Route path="/test/psychology" element={<PsychologyTestPage />} />
                  <Route path="/test/personality" element={<PersonalityTestPage />} />
                  <Route path="/test/education" element={<EducationTestPage />} />
                  <Route path="/test/gto" element={<TestPage />} />
                  <Route path="/test/career" element={<TestPage />} />
                  <Route path="/career" element={<CareerPage />} />
                  {/* Interview category routes - Protected */}
                  <Route
                    path="/interview/gd"
                    element={
                      <ProtectedRoute>
                        <TestPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/interview/gpe"
                    element={
                      <ProtectedRoute>
                        <TestPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/interview/obstacle"
                    element={
                      <ProtectedRoute>
                        <TestPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route
                    path="/results/:resultId"
                    element={
                      <ProtectedRoute>
                        <ResultsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
