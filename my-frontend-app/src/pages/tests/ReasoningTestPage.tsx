import { Brain, MessageSquare, Image, ArrowRight, ArrowLeft, Clock, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import React, { useState } from 'react';


import { TestConfig, TestResult } from '../../types/testTypes';
import CommonTestComponent from '../../components/tests/CommonTestComponent';

const ReasoningTestPage: React.FC = () => {
  const [selectedTestType, setSelectedTestType] = useState<'verbal' | 'non-verbal' | null>(null);
  const [showTest, setShowTest] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  // Verbal Reasoning Test Configuration
  const verbalTestConfig: TestConfig = {
    id: 'verbal-reasoning',
    name: 'Verbal Reasoning Test',
    description: 'Test your language comprehension, vocabulary, and logical reasoning with words',
    duration: '25 minutes',
    instructions: [
      'Read each question carefully and select the most appropriate answer',
      'Some questions may have passages to read before answering',
      'You can navigate between questions using Previous/Next buttons',
      'All questions must be answered to complete the test',
      'There is no negative marking for incorrect answers'
    ],
    categories: ['vocabulary', 'comprehension', 'analogies', 'logical reasoning'],
    questions: [
      {
        id: 'vr1',
        type: 'multiple-choice',
        category: 'vocabulary',
        question: 'Choose the word that is most similar in meaning to "METICULOUS"',
        options: [
          { id: 'a', text: 'Careless' },
          { id: 'b', text: 'Precise' },
          { id: 'c', text: 'Quick' },
          { id: 'd', text: 'Loud' }
        ]
      },
      {
        id: 'vr2',
        type: 'multiple-choice',
        category: 'analogies',
        question: 'Book : Library :: Car : ?',
        options: [
          { id: 'a', text: 'Road' },
          { id: 'b', text: 'Garage' },
          { id: 'c', text: 'Engine' },
          { id: 'd', text: 'Driver' }
        ]
      },
      {
        id: 'vr3',
        type: 'multiple-choice',
        category: 'comprehension',
        question: 'Read the passage: "The rapid advancement of technology has transformed how we communicate, work, and learn." What is the main idea?',
        description: 'Choose the option that best summarizes the passage.',
        options: [
          { id: 'a', text: 'Technology is advancing rapidly' },
          { id: 'b', text: 'Technology has changed multiple aspects of life' },
          { id: 'c', text: 'Communication has improved' },
          { id: 'd', text: 'Work is easier now' }
        ]
      },
      {
        id: 'vr4',
        type: 'multiple-choice',
        category: 'logical reasoning',
        question: 'If all roses are flowers, and some flowers are red, which statement is definitely true?',
        options: [
          { id: 'a', text: 'All roses are red' },
          { id: 'b', text: 'Some roses are red' },
          { id: 'c', text: 'All roses are flowers' },
          { id: 'd', text: 'No roses are red' }
        ]
      }
    ]
  };

  // Non-Verbal Reasoning Test Configuration
  const nonVerbalTestConfig: TestConfig = {
    id: 'non-verbal-reasoning',
    name: 'Non-Verbal Reasoning Test',
    description: 'Test your spatial awareness, pattern recognition, and visual reasoning abilities',
    duration: '30 minutes',
    instructions: [
      'Analyze visual patterns, shapes, and sequences carefully',
      'Look for relationships between different elements',
      'Some questions involve rotating or manipulating shapes mentally',
      'Take your time to understand each visual puzzle',
      'Use the process of elimination when unsure'
    ],
    categories: ['pattern recognition', 'spatial reasoning', 'series completion', 'matrix reasoning'],
    questions: [
      {
        id: 'nvr1',
        type: 'multiple-choice',
        category: 'pattern recognition',
        question: 'What comes next in this sequence: ○ ◐ ● ◐ ?',
        description: 'Identify the pattern and select the next symbol',
        options: [
          { id: 'a', text: '○' },
          { id: 'b', text: '◐' },
          { id: 'c', text: '●' },
          { id: 'd', text: '◑' }
        ]
      },
      {
        id: 'nvr2',
        type: 'multiple-choice',
        category: 'spatial reasoning',
        question: 'Which shape can be formed by folding this net?',
        description: 'Imagine folding the given pattern into a 3D shape',
        options: [
          { id: 'a', text: 'Cube' },
          { id: 'b', text: 'Pyramid' },
          { id: 'c', text: 'Cylinder' },
          { id: 'd', text: 'Cone' }
        ]
      },
      {
        id: 'nvr3',
        type: 'multiple-choice',
        category: 'series completion',
        question: 'Complete the series: △ □ ○ △ □ ?',
        options: [
          { id: 'a', text: '△' },
          { id: 'b', text: '□' },
          { id: 'c', text: '○' },
          { id: 'd', text: '◇' }
        ]
      },
      {
        id: 'nvr4',
        type: 'multiple-choice',
        category: 'matrix reasoning',
        question: 'What shape should replace the question mark in the 3x3 grid?',
        description: 'Analyze the pattern in rows and columns',
        options: [
          { id: 'a', text: '■' },
          { id: 'b', text: '▲' },
          { id: 'c', text: '●' },
          { id: 'd', text: '◆' }
        ]
      }
    ]
  };

  const handleTestTypeSelect = (type: 'verbal' | 'non-verbal') => {
    setSelectedTestType(type);
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
    const config = selectedTestType === 'verbal' ? verbalTestConfig : nonVerbalTestConfig;
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
      <div className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="card text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="h-10 w-10 text-green-500" />
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Test Completed!
              </h1>
              
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-6">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {Math.round(testResult.score)}%
                </div>
                <p className="text-gray-600">Overall Score</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {testResult.categoryResults.map((category) => (
                  <div key={category.category} className="bg-gray-50 rounded-lg p-4">
                    <div className="text-lg font-semibold text-gray-900 capitalize mb-1">
                      {category.category.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      {Math.round(category.percentage)}%
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-left mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Recommendations:</h3>
                <ul className="space-y-2">
                  {testResult.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={resetTest} className="btn-secondary">
                  Take Another Test
                </button>
                <button onClick={() => window.history.back()} className="btn-primary">
                  Back to Tests
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
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
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Reasoning Tests
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Test your logical thinking and problem-solving abilities through verbal and non-verbal reasoning
              </p>
              <div className="flex items-center justify-center space-x-6 text-gray-500">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  25-30 minutes
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Free
                </div>
              </div>
            </div>
          </div>

          {/* Test Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Verbal Reasoning */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Verbal Reasoning
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Test your language skills, vocabulary, comprehension, and logical reasoning with words and text.
                </p>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Test Areas:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-2" />
                    Vocabulary
                  </div>
                  <div className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-2" />
                    Comprehension
                  </div>
                  <div className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-2" />
                    Analogies
                  </div>
                  <div className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-2" />
                    Logic
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                <span>⏱️ 25 minutes</span>
                <span>📝 4 questions</span>
                <span>🎯 Multiple choice</span>
              </div>

              <button
                onClick={() => handleTestTypeSelect('verbal')}
                className="btn-primary w-full"
              >
                Start Verbal Test
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </motion.div>

            {/* Non-Verbal Reasoning */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Image className="h-8 w-8 text-purple-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Non-Verbal Reasoning
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Test your spatial awareness, pattern recognition, and visual reasoning through shapes and diagrams.
                </p>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Test Areas:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2" />
                    Patterns
                  </div>
                  <div className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2" />
                    Spatial Reasoning
                  </div>
                  <div className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2" />
                    Series
                  </div>
                  <div className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2" />
                    Matrix
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                <span>⏱️ 30 minutes</span>
                <span>📝 4 questions</span>
                <span>🎯 Visual puzzles</span>
              </div>

              <button
                onClick={() => handleTestTypeSelect('non-verbal')}
                className="btn-primary w-full"
              >
                Start Non-Verbal Test
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </motion.div>
          </div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <div className="card bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <div className="text-center">
                <Brain className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Why Take Reasoning Tests?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Academic Success</h4>
                    <p>Essential for competitive exams and academic assessments</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Career Advancement</h4>
                    <p>Highly valued in technical and analytical roles</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Cognitive Skills</h4>
                    <p>Improves problem-solving and critical thinking abilities</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReasoningTestPage;