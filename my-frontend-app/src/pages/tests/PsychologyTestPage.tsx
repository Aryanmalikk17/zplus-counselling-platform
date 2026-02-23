import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Filter
} from 'lucide-react';
import { TestConfig, TestResult } from '../../types/testTypes';
import CommonTestComponent from '../../components/tests/CommonTestComponent';
import Loading from '../../components/common/Loading';
import PsychologyTestList from './components/PsychologyTestList';

// Import configs from data file
import {
  iqTestConfig,
  memoryTestConfig,
  attentionTestConfig,
  cognitiveSpeedTestConfig,
  emotionalProcessingTestConfig,
  problemSolvingTestConfig,
  tatTestConfig,
  watTestConfig,
  srtTestConfig,
  sdtTestConfig,
  gpeTestConfig,
  cognitiveTests
} from '../../data/psychologyData';

// Lazy load results view
const PsychologyTestResult = React.lazy(() => import('./components/PsychologyTestResult'));

const PsychologyTestPage: React.FC = () => {
  const [selectedTestType, setSelectedTestType] = useState<string | null>(null);
  const [showTest, setShowTest] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Map test IDs to configs
  const testConfigs: Record<string, TestConfig> = {
    'iq-test': iqTestConfig, // Mapping might need adjustment based on how ID is passed
    'iq': iqTestConfig,
    'memory': memoryTestConfig,
    'attention': attentionTestConfig,
    'cognitive-speed': cognitiveSpeedTestConfig,
    'emotional-processing': emotionalProcessingTestConfig,
    'problem-solving': problemSolvingTestConfig,
    'tat': tatTestConfig,
    'wat': watTestConfig,
    'srt': srtTestConfig,
    'sdt': sdtTestConfig,
    'gpe': gpeTestConfig
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
        <PsychologyTestResult
          result={testResult}
          onRetake={resetTest}
          onBack={handleTestExit}
        />
      </Suspense>
    );
  }

  const categories = ['All', ...Array.from(new Set(cognitiveTests.map(test => test.category)))];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header Section */}
          <div className="mb-10">
            <button
              onClick={() => window.history.back()}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-200 group"
            >
              <div className="bg-white p-2 rounded-full shadow-sm group-hover:shadow-md mr-3 transition-all">
                <ArrowLeft className="h-5 w-5" />
              </div>
              <span className="font-medium">Back to All Tests</span>
            </button>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                  Psychological Assessments
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                  Advanced cognitive and personality evaluations designed to provide deep insights into your mental capabilities and traits.
                </p>
              </div>

              {/* Category Filter */}
              <div className="flex overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 gap-2 no-scrollbar">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${selectedCategory === category
                        ? 'bg-gray-900 text-white shadow-lg transform scale-105'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <PsychologyTestList
            onSelectTest={handleTestTypeSelect}
            selectedCategory={selectedCategory}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default PsychologyTestPage;