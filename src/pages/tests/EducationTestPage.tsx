import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  GraduationCap, 
  Calculator, 
  Palette, 
  Trophy, 
  Microscope,
  BarChart3,
  Clock, 
  Users, 
  ArrowRight,
  ArrowLeft,
  Target,
  Award
} from 'lucide-react';
import { TestConfig, TestResult } from '../../types/testTypes';
import CommonTestComponent from '../../components/tests/CommonTestComponent';

const EducationTestPage: React.FC = () => {
  const [selectedTestType, setSelectedTestType] = useState<'primary' | 'secondary' | 'higher' | 'science' | 'commerce' | 'arts' | 'sports' | null>(null);
  const [showTest, setShowTest] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  // Primary Education Test Configuration
  const primaryTestConfig: TestConfig = {
    id: 'primary-education',
    name: 'Primary Education Assessment',
    description: 'Basic educational skills assessment for elementary level students',
    duration: '30 minutes',
    instructions: [
      'Read each question carefully before answering',
      'Choose the best answer from the given options',
      'Take your time to think through each question',
      'If you don\'t know an answer, make your best guess',
      'Complete all questions to get accurate results'
    ],
    categories: ['mathematics', 'language', 'science basics', 'general knowledge'],
    questions: [
      {
        id: 'pe1',
        type: 'multiple-choice',
        category: 'mathematics',
        question: 'What is 15 + 23?',
        options: [
          { id: 'a', text: '35' },
          { id: 'b', text: '38' },
          { id: 'c', text: '41' },
          { id: 'd', text: '33' }
        ]
      },
      {
        id: 'pe2',
        type: 'multiple-choice',
        category: 'language',
        question: 'Which word is spelled correctly?',
        options: [
          { id: 'a', text: 'Recieve' },
          { id: 'b', text: 'Receive' },
          { id: 'c', text: 'Recive' },
          { id: 'd', text: 'Receeve' }
        ]
      },
      {
        id: 'pe3',
        type: 'multiple-choice',
        category: 'science basics',
        question: 'How many legs does a spider have?',
        options: [
          { id: 'a', text: '6' },
          { id: 'b', text: '8' },
          { id: 'c', text: '10' },
          { id: 'd', text: '4' }
        ]
      }
    ]
  };

  // Secondary Education Test Configuration
  const secondaryTestConfig: TestConfig = {
    id: 'secondary-education',
    name: 'Secondary Education Assessment',
    description: 'Comprehensive assessment for middle and high school level knowledge',
    duration: '45 minutes',
    instructions: [
      'Answer questions across multiple subjects',
      'Apply critical thinking and analytical skills',
      'Show your working for mathematical problems',
      'Read passages carefully for comprehension questions',
      'Manage your time effectively across all sections'
    ],
    categories: ['advanced mathematics', 'literature', 'sciences', 'social studies'],
    questions: [
      {
        id: 'se1',
        type: 'multiple-choice',
        category: 'advanced mathematics',
        question: 'If x + 5 = 12, what is the value of x?',
        options: [
          { id: 'a', text: '7' },
          { id: 'b', text: '17' },
          { id: 'c', text: '5' },
          { id: 'd', text: '12' }
        ]
      },
      {
        id: 'se2',
        type: 'multiple-choice',
        category: 'sciences',
        question: 'What is the chemical symbol for gold?',
        options: [
          { id: 'a', text: 'Go' },
          { id: 'b', text: 'Gd' },
          { id: 'c', text: 'Au' },
          { id: 'd', text: 'Ag' }
        ]
      }
    ]
  };

  // Higher Education Test Configuration
  const higherTestConfig: TestConfig = {
    id: 'higher-education',
    name: 'Higher Education Readiness',
    description: 'Assessment of college and university level academic preparedness',
    duration: '60 minutes',
    instructions: [
      'Demonstrate advanced critical thinking skills',
      'Analyze complex problems and scenarios',
      'Show depth of knowledge in chosen subjects',
      'Apply theoretical concepts to practical situations',
      'Present well-reasoned arguments and solutions'
    ],
    categories: ['critical thinking', 'research skills', 'academic writing', 'problem solving'],
    questions: [
      {
        id: 'he1',
        type: 'text-input',
        category: 'critical thinking',
        question: 'Analyze the statement: "Technology has made communication easier but relationships more difficult." Provide arguments for both sides.',
        description: 'Write a balanced analysis considering multiple perspectives.'
      },
      {
        id: 'he2',
        type: 'multiple-choice',
        category: 'research skills',
        question: 'Which is the most reliable source for academic research?',
        options: [
          { id: 'a', text: 'Wikipedia articles' },
          { id: 'b', text: 'Peer-reviewed journals' },
          { id: 'c', text: 'Blog posts' },
          { id: 'd', text: 'Social media posts' }
        ]
      }
    ]
  };

  // Science Stream Test Configuration
  const scienceTestConfig: TestConfig = {
    id: 'science-stream',
    name: 'Science Stream Assessment',
    description: 'Comprehensive evaluation of Physics, Chemistry, Biology, and Mathematics',
    duration: '50 minutes',
    instructions: [
      'Apply scientific principles and formulas',
      'Show calculations and reasoning clearly',
      'Understand concepts across all science subjects',
      'Demonstrate problem-solving in scientific contexts',
      'Use scientific terminology accurately'
    ],
    categories: ['physics', 'chemistry', 'biology', 'mathematics'],
    questions: [
      {
        id: 'sc1',
        type: 'multiple-choice',
        category: 'physics',
        question: 'What is the SI unit of force?',
        options: [
          { id: 'a', text: 'Joule' },
          { id: 'b', text: 'Newton' },
          { id: 'c', text: 'Watt' },
          { id: 'd', text: 'Pascal' }
        ]
      },
      {
        id: 'sc2',
        type: 'multiple-choice',
        category: 'chemistry',
        question: 'What is the molecular formula of water?',
        options: [
          { id: 'a', text: 'H2O2' },
          { id: 'b', text: 'HO2' },
          { id: 'c', text: 'H2O' },
          { id: 'd', text: 'H3O' }
        ]
      },
      {
        id: 'sc3',
        type: 'multiple-choice',
        category: 'biology',
        question: 'Which organelle is known as the powerhouse of the cell?',
        options: [
          { id: 'a', text: 'Nucleus' },
          { id: 'b', text: 'Mitochondria' },
          { id: 'c', text: 'Ribosome' },
          { id: 'd', text: 'Chloroplast' }
        ]
      }
    ]
  };

  // Commerce Stream Test Configuration
  const commerceTestConfig: TestConfig = {
    id: 'commerce-stream',
    name: 'Commerce Stream Assessment',
    description: 'Business, Economics, and Accounting knowledge evaluation',
    duration: '45 minutes',
    instructions: [
      'Apply business and economic principles',
      'Calculate financial problems accurately',
      'Understand market dynamics and business concepts',
      'Demonstrate knowledge of accounting principles',
      'Analyze business scenarios effectively'
    ],
    categories: ['accounting', 'economics', 'business studies', 'mathematics'],
    questions: [
      {
        id: 'co1',
        type: 'multiple-choice',
        category: 'accounting',
        question: 'In double-entry bookkeeping, every transaction affects:',
        options: [
          { id: 'a', text: 'One account only' },
          { id: 'b', text: 'At least two accounts' },
          { id: 'c', text: 'Three accounts' },
          { id: 'd', text: 'The cash account only' }
        ]
      },
      {
        id: 'co2',
        type: 'multiple-choice',
        category: 'economics',
        question: 'What happens to demand when the price of a product increases?',
        options: [
          { id: 'a', text: 'Demand increases' },
          { id: 'b', text: 'Demand decreases' },
          { id: 'c', text: 'Demand remains the same' },
          { id: 'd', text: 'Supply increases' }
        ]
      }
    ]
  };

  // Arts Stream Test Configuration
  const artsTestConfig: TestConfig = {
    id: 'arts-stream',
    name: 'Arts Stream Assessment',
    description: 'Humanities, Literature, History, and Social Sciences evaluation',
    duration: '50 minutes',
    instructions: [
      'Demonstrate understanding of humanities subjects',
      'Analyze literary works and historical events',
      'Show knowledge of social sciences and philosophy',
      'Write comprehensive and analytical responses',
      'Connect concepts across different humanities disciplines'
    ],
    categories: ['literature', 'history', 'political science', 'philosophy'],
    questions: [
      {
        id: 'ar1',
        type: 'multiple-choice',
        category: 'literature',
        question: 'Who wrote the novel "Pride and Prejudice"?',
        options: [
          { id: 'a', text: 'Charlotte Brontë' },
          { id: 'b', text: 'Jane Austen' },
          { id: 'c', text: 'Emily Dickinson' },
          { id: 'd', text: 'Virginia Woolf' }
        ]
      },
      {
        id: 'ar2',
        type: 'multiple-choice',
        category: 'history',
        question: 'In which year did India gain independence?',
        options: [
          { id: 'a', text: '1945' },
          { id: 'b', text: '1947' },
          { id: 'c', text: '1948' },
          { id: 'd', text: '1950' }
        ]
      }
    ]
  };

  // Sports Assessment Test Configuration
  const sportsTestConfig: TestConfig = {
    id: 'sports-assessment',
    name: 'Sports Knowledge & Fitness Assessment',
    description: 'Physical education, sports knowledge, and fitness awareness evaluation',
    duration: '35 minutes',
    instructions: [
      'Answer questions about various sports and games',
      'Demonstrate knowledge of fitness and health principles',
      'Show understanding of sports rules and regulations',
      'Apply knowledge of physical training and nutrition',
      'Consider both theoretical and practical aspects of sports'
    ],
    categories: ['sports knowledge', 'fitness principles', 'nutrition', 'sports psychology'],
    questions: [
      {
        id: 'sp1',
        type: 'multiple-choice',
        category: 'sports knowledge',
        question: 'How many players are there in a basketball team on the court?',
        options: [
          { id: 'a', text: '4' },
          { id: 'b', text: '5' },
          { id: 'c', text: '6' },
          { id: 'd', text: '7' }
        ]
      },
      {
        id: 'sp2',
        type: 'multiple-choice',
        category: 'fitness principles',
        question: 'Which is the best time to stretch muscles?',
        options: [
          { id: 'a', text: 'Before warming up' },
          { id: 'b', text: 'After warming up' },
          { id: 'c', text: 'Only after exercise' },
          { id: 'd', text: 'Anytime during exercise' }
        ]
      }
    ]
  };

  const testConfigs = {
    'primary': primaryTestConfig,
    'secondary': secondaryTestConfig,
    'higher': higherTestConfig,
    'science': scienceTestConfig,
    'commerce': commerceTestConfig,
    'arts': artsTestConfig,
    'sports': sportsTestConfig
  };

  const testDetails = [
    {
      id: 'primary' as const,
      name: 'Primary Education',
      description: 'Basic educational skills for elementary level students',
      icon: BookOpen,
      color: 'blue',
      duration: '30 min',
      questions: '3 subjects',
      areas: ['Mathematics', 'Language', 'Science Basics', 'General Knowledge'],
      type: 'Elementary level',
      level: 'Grades 1-5'
    },
    {
      id: 'secondary' as const,
      name: 'Secondary Education',
      description: 'Middle and high school level comprehensive assessment',
      icon: GraduationCap,
      color: 'green',
      duration: '45 min',
      questions: '4 subjects',
      areas: ['Advanced Math', 'Literature', 'Sciences', 'Social Studies'],
      type: 'Secondary level',
      level: 'Grades 6-12'
    },
    {
      id: 'higher' as const,
      name: 'Higher Education',
      description: 'College and university readiness assessment',
      icon: Target,
      color: 'purple',
      duration: '60 min',
      questions: '4 areas',
      areas: ['Critical Thinking', 'Research Skills', 'Academic Writing', 'Problem Solving'],
      type: 'University level',
      level: 'College+'
    },
    {
      id: 'science' as const,
      name: 'Science Stream',
      description: 'Physics, Chemistry, Biology, and Mathematics evaluation',
      icon: Microscope,
      color: 'red',
      duration: '50 min',
      questions: '4 subjects',
      areas: ['Physics', 'Chemistry', 'Biology', 'Mathematics'],
      type: 'Science specialization',
      level: 'Grade 11-12'
    },
    {
      id: 'commerce' as const,
      name: 'Commerce Stream',
      description: 'Business, Economics, and Accounting knowledge test',
      icon: BarChart3,
      color: 'yellow',
      duration: '45 min',
      questions: '4 subjects',
      areas: ['Accounting', 'Economics', 'Business Studies', 'Mathematics'],
      type: 'Commerce specialization',
      level: 'Grade 11-12'
    },
    {
      id: 'arts' as const,
      name: 'Arts Stream',
      description: 'Humanities, Literature, and Social Sciences assessment',
      icon: Palette,
      color: 'pink',
      duration: '50 min',
      questions: '4 subjects',
      areas: ['Literature', 'History', 'Political Science', 'Philosophy'],
      type: 'Arts specialization',
      level: 'Grade 11-12'
    },
    {
      id: 'sports' as const,
      name: 'Sports Assessment',
      description: 'Physical education and sports knowledge evaluation',
      icon: Trophy,
      color: 'orange',
      duration: '35 min',
      questions: '4 areas',
      areas: ['Sports Knowledge', 'Fitness Principles', 'Nutrition', 'Sports Psychology'],
      type: 'Physical education',
      level: 'All levels'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-500 border-blue-200',
      green: 'bg-green-100 text-green-500 border-green-200',
      purple: 'bg-purple-100 text-purple-500 border-purple-200',
      red: 'bg-red-100 text-red-500 border-red-200',
      yellow: 'bg-yellow-100 text-yellow-500 border-yellow-200',
      pink: 'bg-pink-100 text-pink-500 border-pink-200',
      orange: 'bg-orange-100 text-orange-500 border-orange-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getDotColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-400',
      green: 'bg-green-400',
      purple: 'bg-purple-400',
      red: 'bg-red-400',
      yellow: 'bg-yellow-400',
      pink: 'bg-pink-400',
      orange: 'bg-orange-400'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const handleTestTypeSelect = (type: 'primary' | 'secondary' | 'higher' | 'science' | 'commerce' | 'arts' | 'sports') => {
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
      <div className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="card text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-10 w-10 text-green-500" />
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Educational Assessment Complete!
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
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Educational Insights:</h3>
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
                Educational Assessments
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Comprehensive evaluations to assess academic readiness, subject knowledge, and educational stream compatibility
              </p>
              <div className="flex items-center justify-center space-x-6 text-gray-500">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  30-60 minutes
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Free
                </div>
                <div className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Academic Focused
                </div>
              </div>
            </div>
          </div>

          {/* Educational Levels */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Educational Levels</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testDetails.slice(0, 3).map((test, index) => (
                <motion.div
                  key={test.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="text-center mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${getColorClasses(test.color)}`}>
                      <test.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {test.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {test.description}
                    </p>
                    <span className="text-xs text-blue-600 font-medium">{test.level}</span>
                  </div>

                  <div className="mb-4">
                    <div className="space-y-1">
                      {test.areas.slice(0, 2).map((area) => (
                        <div key={area} className="flex items-center text-gray-600 text-xs">
                          <div className={`w-1 h-1 rounded-full mr-2 ${getDotColor(test.color)}`} />
                          {area}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>⏱️ {test.duration}</span>
                    <span>📝 {test.questions}</span>
                  </div>

                  <button
                    onClick={() => handleTestTypeSelect(test.id)}
                    className="btn-primary w-full text-sm"
                  >
                    Start Test
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Academic Streams */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Academic Streams</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testDetails.slice(3).map((test, index) => (
                <motion.div
                  key={test.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="text-center mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${getColorClasses(test.color)}`}>
                      <test.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {test.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {test.description}
                    </p>
                    <span className="text-xs text-blue-600 font-medium">{test.level}</span>
                  </div>

                  <div className="mb-4">
                    <div className="space-y-1">
                      {test.areas.slice(0, 2).map((area) => (
                        <div key={area} className="flex items-center text-gray-600 text-xs">
                          <div className={`w-1 h-1 rounded-full mr-2 ${getDotColor(test.color)}`} />
                          {area}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>⏱️ {test.duration}</span>
                    <span>📝 {test.questions}</span>
                  </div>

                  <button
                    onClick={() => handleTestTypeSelect(test.id)}
                    className="btn-primary w-full text-sm"
                  >
                    Start Test
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="card bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
              <div className="text-center">
                <BookOpen className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Educational Assessment Benefits
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Academic Readiness</h4>
                    <p>Evaluate your preparedness for different educational levels and identify areas for improvement</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Stream Selection</h4>
                    <p>Make informed decisions about choosing the right academic stream based on your strengths</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Skill Development</h4>
                    <p>Identify specific subjects and skills that need focused attention and practice</p>
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

export default EducationTestPage;