import React, { useState, Suspense } from 'react';

import {
  ArrowLeft,
  Clock,
  Users,
  Award
} from 'lucide-react';
import { TestConfig, TestResult } from '../../types/testTypes';
import CommonTestComponent from '../../components/tests/CommonTestComponent';
import Loading from '../../components/common/Loading';
import EducationTestList from './components/education/EducationTestList';

// Import config and data
import {
  primaryTestConfig,
  secondaryTestConfig,
  higherTestConfig,
  scienceTestConfig,
  commerceTestConfig,
  artsTestConfig,
  sportsTestConfig
} from '../../data/educationData';

// Lazy load result view
const EducationTestResult = React.lazy(() => import('./components/education/EducationTestResult'));

const EducationTestPage: React.FC = () => {
  const [selectedTestType, setSelectedTestType] = useState<string | null>(null);
  const [showTest, setShowTest] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  const testConfigs: Record<string, TestConfig> = {
    'primary-education': primaryTestConfig, // Mapping might need adjustment based on IDs in list
    'secondary-education': secondaryTestConfig,
    'higher-education': higherTestConfig,
    'science-stream': scienceTestConfig,
    'commerce-stream': commerceTestConfig,
    'arts-stream': artsTestConfig,
    'sports-assessment': sportsTestConfig,
    // Add mapping for short IDs if used in List component
    'primary': primaryTestConfig,
    'secondary': secondaryTestConfig,
    'higher': higherTestConfig,
    'science': scienceTestConfig,
    'commerce': commerceTestConfig,
    'arts': artsTestConfig,
    'sports': sportsTestConfig
  };

  const handleTestTypeSelect = (testId: string) => {
    setSelectedTestType(testId);
    setShowTest(true);
  };

  const handleTestComplete = (result: TestResult) => {
    setTestResult(result);
    setShowTest(false);
  };

  const handleTestExit = () => {
    setShowTest(false);
    setSelectedTestType(null);
    setTestResult(null);
  };

  const resetTest = () => {
    setTestResult(null);
    setSelectedTestType(null);
    setShowTest(false);
  };

  if (showTest && selectedTestType) {
    const config = testConfigs[selectedTestType];
    if (!config) return <div>Test configuration not found</div>;
    return (
      <CommonTestComponent
        testConfig={config}
        onTestComplete={handleTestComplete}
        onTestExit={handleTestExit}
      />
    );
  }

  if (testResult) {
    return (
      <Suspense fallback={<Loading />}>
        <EducationTestResult
          result={testResult}
          onRetake={resetTest}
          onBack={handleTestExit}
        />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Back Button & Header */}
          <div className="mb-8">
            <button
              onClick={() => window.history.back()}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Tests
            </button>

            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                Educational Assessments
              </h1>
              <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
                Comprehensive evaluations to assess academic readiness, subject knowledge, and educational stream compatibility.
              </p>
              <div className="flex items-center justify-center space-x-6 text-gray-500 bg-white inline-flex px-6 py-2 rounded-full shadow-sm">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  30-60 minutes
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Free Access
                </div>
                <div className="flex items-center">
                  <Award className="h-4 w-4 mr-2" />
                  Academic Focused
                </div>
              </div>
            </div>
          </div>

          <EducationTestList onSelectTest={handleTestTypeSelect} />
        </motion.div>
      </div>
    </div>
  );
};

export default EducationTestPage;