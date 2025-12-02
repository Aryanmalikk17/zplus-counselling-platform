import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/home/HomePage';
import TestsPage from './pages/tests/TestsPage';
import TestPage from './pages/tests/TestPage';
import ReasoningTestPage from './pages/tests/ReasoningTestPage';
import PsychologyTestPage from './pages/tests/PsychologyTestPage';
import PersonalityTestPage from './pages/tests/PersonalityTestPage';
import EducationTestPage from './pages/tests/EducationTestPage';
import ResultsPage from './pages/results/ResultsPage';
import ProfilePage from './pages/profile/ProfilePage';
import BlogPage from './pages/blog/BlogPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import CareerPage from './pages/career/CareerPage';

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
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/tests" element={<TestsPage />} />
                <Route path="/test/:testId" element={<TestPage />} />
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
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
