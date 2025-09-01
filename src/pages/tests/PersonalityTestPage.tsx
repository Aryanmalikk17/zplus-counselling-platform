import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Heart, 
  Users, 
  Target, 
  Clock, 
  ArrowRight,
  ArrowLeft,
  Star,
  Compass,
  Lightbulb
} from 'lucide-react';
import { TestConfig, TestResult } from '../../types/testTypes';
import CommonTestComponent from '../../components/tests/CommonTestComponent';
import TestResultDashboard from '../../components/results/TestResultDashboard';

const PersonalityTestPage: React.FC = () => {
  const [selectedTestType, setSelectedTestType] = useState<'enneagram' | '16-types' | 'big-five' | null>(null);
  const [showTest, setShowTest] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  // Enneagram Test Configuration
  const enneagramTestConfig: TestConfig = {
    id: 'enneagram-test',
    name: 'Enneagram Personality Test',
    description: 'Discover your core motivations, fears, and personality type among the 9 Enneagram types',
    duration: '20 minutes',
    instructions: [
      'Read each statement carefully and rate how much it applies to you',
      'Be honest about your natural tendencies, not how you think you should be',
      'Consider your behavior in various situations, not just work or home',
      'Choose the response that feels most authentic to who you are',
      'There are no right or wrong answers - this is about self-discovery'
    ],
    categories: ['core motivations', 'emotional patterns', 'behavioral tendencies', 'growth areas'],
    questions: [
      {
        id: 'enn1',
        type: 'multiple-choice',
        category: 'core motivations',
        question: 'What motivates you most in life?',
        options: [
          { id: 'a', text: 'Being perfect and avoiding mistakes' },
          { id: 'b', text: 'Being loved and helping others' },
          { id: 'c', text: 'Achieving success and being admired' },
          { id: 'd', text: 'Being unique and authentic' },
          { id: 'e', text: 'Understanding and being competent' }
        ]
      },
      {
        id: 'enn2',
        type: 'multiple-choice',
        category: 'emotional patterns',
        question: 'When facing stress, you tend to:',
        options: [
          { id: 'a', text: 'Become more critical and controlling' },
          { id: 'b', text: 'Focus more on helping others than yourself' },
          { id: 'c', text: 'Work harder to maintain your image' },
          { id: 'd', text: 'Withdraw and focus on your feelings' },
          { id: 'e', text: 'Overthink and seek more information' }
        ]
      },
      {
        id: 'enn3',
        type: 'multiple-choice',
        category: 'behavioral tendencies',
        question: 'In relationships, you typically:',
        options: [
          { id: 'a', text: 'Try to improve and guide your partner' },
          { id: 'b', text: 'Focus on meeting their needs' },
          { id: 'c', text: 'Want to be seen as successful together' },
          { id: 'd', text: 'Seek deep, meaningful connections' },
          { id: 'e', text: 'Need space and independence' }
        ]
      },
      {
        id: 'enn4',
        type: 'multiple-choice',
        category: 'growth areas',
        question: 'Your biggest challenge for personal growth is:',
        options: [
          { id: 'a', text: 'Learning to accept imperfection' },
          { id: 'b', text: 'Taking care of your own needs' },
          { id: 'c', text: 'Being authentic rather than impressive' },
          { id: 'd', text: 'Finding stability in your emotions' },
          { id: 'e', text: 'Engaging more with the world' }
        ]
      }
    ]
  };

  // 16 Types Personality Test Configuration
  const sixteenTypesTestConfig: TestConfig = {
    id: '16-types-test',
    name: '16 Personality Types Test (MBTI-Style)',
    description: 'Discover your personality type based on four key dimensions of human personality',
    duration: '25 minutes',
    instructions: [
      'Choose the option that best describes your natural preferences',
      'Consider how you typically behave, not how you think you should behave',
      'Think about your preferences across different situations and contexts',
      'Select the response that feels more natural and energizing to you',
      'Remember: both options can be valuable - choose your preference'
    ],
    categories: ['extraversion vs introversion', 'sensing vs intuition', 'thinking vs feeling', 'judging vs perceiving'],
    questions: [
      {
        id: 'mbti1',
        type: 'multiple-choice',
        category: 'extraversion vs introversion',
        question: 'You gain energy from:',
        options: [
          { id: 'a', text: 'Being around people and external stimulation (Extraversion)' },
          { id: 'b', text: 'Quiet time alone or with close friends (Introversion)' }
        ]
      },
      {
        id: 'mbti2',
        type: 'multiple-choice',
        category: 'sensing vs intuition',
        question: 'You prefer to focus on:',
        options: [
          { id: 'a', text: 'Facts, details, and practical realities (Sensing)' },
          { id: 'b', text: 'Possibilities, patterns, and future potential (Intuition)' }
        ]
      },
      {
        id: 'mbti3',
        type: 'multiple-choice',
        category: 'thinking vs feeling',
        question: 'When making decisions, you prioritize:',
        options: [
          { id: 'a', text: 'Logic, objective analysis, and fairness (Thinking)' },
          { id: 'b', text: 'Values, harmony, and impact on people (Feeling)' }
        ]
      },
      {
        id: 'mbti4',
        type: 'multiple-choice',
        category: 'judging vs perceiving',
        question: 'You prefer life to be:',
        options: [
          { id: 'a', text: 'Planned, organized, and decided (Judging)' },
          { id: 'b', text: 'Flexible, spontaneous, and open (Perceiving)' }
        ]
      },
      {
        id: 'mbti5',
        type: 'multiple-choice',
        category: 'extraversion vs introversion',
        question: 'At parties, you typically:',
        options: [
          { id: 'a', text: 'Mingle with many people and feel energized (Extraversion)' },
          { id: 'b', text: 'Talk to a few people you know well (Introversion)' }
        ]
      }
    ]
  };

  // Big Five Test Configuration
  const bigFiveTestConfig: TestConfig = {
    id: 'big-five-test',
    name: 'Big Five Personality Test',
    description: 'Measure your personality across the five major dimensions: OCEAN model',
    duration: '15 minutes',
    instructions: [
      'Rate each statement on how accurately it describes you',
      'Be honest about your typical behavior and preferences',
      'Consider your general tendencies across different situations',
      'Use the full range of ratings from strongly disagree to strongly agree',
      'There are no right or wrong answers - this measures your unique traits'
    ],
    categories: ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism'],
    questions: [
      {
        id: 'bf1',
        type: 'multiple-choice',
        category: 'openness',
        question: 'I enjoy trying new and unusual activities',
        options: [
          { id: 'a', text: 'Strongly Disagree' },
          { id: 'b', text: 'Disagree' },
          { id: 'c', text: 'Neutral' },
          { id: 'd', text: 'Agree' },
          { id: 'e', text: 'Strongly Agree' }
        ]
      },
      {
        id: 'bf2',
        type: 'multiple-choice',
        category: 'conscientiousness',
        question: 'I am always well-prepared and organized',
        options: [
          { id: 'a', text: 'Strongly Disagree' },
          { id: 'b', text: 'Disagree' },
          { id: 'c', text: 'Neutral' },
          { id: 'd', text: 'Agree' },
          { id: 'e', text: 'Strongly Agree' }
        ]
      },
      {
        id: 'bf3',
        type: 'multiple-choice',
        category: 'extraversion',
        question: 'I am outgoing and sociable in most situations',
        options: [
          { id: 'a', text: 'Strongly Disagree' },
          { id: 'b', text: 'Disagree' },
          { id: 'c', text: 'Neutral' },
          { id: 'd', text: 'Agree' },
          { id: 'e', text: 'Strongly Agree' }
        ]
      },
      {
        id: 'bf4',
        type: 'multiple-choice',
        category: 'agreeableness',
        question: 'I am generally trusting and cooperative with others',
        options: [
          { id: 'a', text: 'Strongly Disagree' },
          { id: 'b', text: 'Disagree' },
          { id: 'c', text: 'Neutral' },
          { id: 'd', text: 'Agree' },
          { id: 'e', text: 'Strongly Agree' }
        ]
      },
      {
        id: 'bf5',
        type: 'multiple-choice',
        category: 'neuroticism',
        question: 'I often feel anxious or stressed in daily life',
        options: [
          { id: 'a', text: 'Strongly Disagree' },
          { id: 'b', text: 'Disagree' },
          { id: 'c', text: 'Neutral' },
          { id: 'd', text: 'Agree' },
          { id: 'e', text: 'Strongly Agree' }
        ]
      }
    ]
  };

  const testConfigs = {
    'enneagram': enneagramTestConfig,
    '16-types': sixteenTypesTestConfig,
    'big-five': bigFiveTestConfig
  };

  const testDetails = [
    {
      id: 'enneagram' as const,
      name: 'Enneagram Test',
      description: 'Discover your core motivations and one of 9 personality types',
      icon: Compass,
      color: 'purple',
      duration: '20 min',
      questions: '4 areas',
      areas: ['Core Motivations', 'Emotional Patterns', 'Behavioral Tendencies', 'Growth Areas'],
      type: 'Motivation-based',
      types: '9 Types'
    },
    {
      id: '16-types' as const,
      name: '16 Personality Types',
      description: 'MBTI-style assessment of cognitive preferences and personality type',
      icon: Brain,
      color: 'blue',
      duration: '25 min',
      questions: '5 dimensions',
      areas: ['Extraversion/Introversion', 'Sensing/Intuition', 'Thinking/Feeling', 'Judging/Perceiving'],
      type: 'Cognitive functions',
      types: '16 Types'
    },
    {
      id: 'big-five' as const,
      name: 'Big Five Test',
      description: 'Scientific measurement of personality across five major dimensions',
      icon: Star,
      color: 'green',
      duration: '15 min',
      questions: '5 traits',
      areas: ['Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Neuroticism'],
      type: 'Trait-based',
      types: '5 Dimensions'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      purple: 'bg-purple-100 text-purple-500 border-purple-200',
      blue: 'bg-blue-100 text-blue-500 border-blue-200',
      green: 'bg-green-100 text-green-500 border-green-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getDotColor = (color: string) => {
    const colors = {
      purple: 'bg-purple-400',
      blue: 'bg-blue-400',
      green: 'bg-green-400'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const handleTestTypeSelect = (type: 'enneagram' | '16-types' | 'big-five') => {
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
    const config = testConfigs[selectedTestType];
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
      <TestResultDashboard
        result={testResult}
        onRetakeTest={resetTest}
        onBackToTests={() => window.history.back()}
      />
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
                Personality Tests
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Discover your unique personality traits, motivations, and behavioral patterns through scientifically validated assessments
              </p>
              <div className="flex items-center justify-center space-x-6 text-gray-500">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  15-25 minutes
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Free
                </div>
                <div className="flex items-center">
                  <Brain className="h-5 w-5 mr-2" />
                  Scientifically Validated
                </div>
              </div>
            </div>
          </div>

          {/* Test Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {testDetails.map((test, index) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${getColorClasses(test.color)}`}>
                    <test.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {test.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {test.description}
                  </p>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="font-medium text-gray-700">Result Types:</span>
                    <span className="text-blue-600 font-semibold">{test.types}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 text-sm">Assessment Areas:</h4>
                  <div className="space-y-2">
                    {test.areas.map((area) => (
                      <div key={area} className="flex items-center text-gray-600 text-xs">
                        <div className={`w-1.5 h-1.5 rounded-full mr-2 ${getDotColor(test.color)}`} />
                        {area}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-6">
                  <span>⏱️ {test.duration}</span>
                  <span>📝 {test.questions}</span>
                  <span>🎯 {test.type}</span>
                </div>

                <button
                  onClick={() => handleTestTypeSelect(test.id)}
                  className="btn-primary w-full text-sm"
                >
                  Start {test.name}
                  <ArrowRight className="ml-2 h-3 w-3" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="card bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
              <div className="text-center">
                <Heart className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Understanding Your Personality
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Self-Awareness</h4>
                    <p>Gain deep insights into your natural preferences, strengths, and behavioral patterns</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Relationship Insights</h4>
                    <p>Understand how you interact with others and improve your communication style</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Career Alignment</h4>
                    <p>Discover careers and work environments that match your personality type</p>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-600">
                  <div className="bg-purple-100 rounded-lg p-3">
                    <strong className="text-purple-800">Enneagram:</strong> Focus on core motivations and fears that drive behavior
                  </div>
                  <div className="bg-blue-100 rounded-lg p-3">
                    <strong className="text-blue-800">16 Types:</strong> Cognitive preferences and information processing styles
                  </div>
                  <div className="bg-green-100 rounded-lg p-3">
                    <strong className="text-green-800">Big Five:</strong> Scientific measurement of personality dimensions
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

export default PersonalityTestPage;