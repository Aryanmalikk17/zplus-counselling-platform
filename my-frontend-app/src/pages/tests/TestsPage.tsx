import React from 'react';
import { Link } from 'react-router-dom';

import { 
  Brain, 
  Clock, 
  Users, 
  Star, 
  ArrowRight, 
  BookOpen,
  GraduationCap,
  Trophy,
  Heart,
  Target,
  Briefcase,
  Microscope,
  Calculator,
  Palette,
  Activity
} from 'lucide-react';

const TestsPage: React.FC = () => {
  const allTests = [
    // Personality Tests
    {
      id: 'mbti',
      title: '16 Types (MBTI)',
      description: 'Discover your Myers-Briggs personality type and understand your cognitive preferences.',
      duration: '10-15 min',
      difficulty: 'Beginner',
      category: 'Personality',
      popularity: 5,
      features: ['Cognitive functions', 'Type descriptions', 'Career insights'],
      icon: Brain
    },
    {
      id: 'bigfive',
      title: 'Big Five Traits',
      description: 'Measure your personality across five key dimensions: openness, conscientiousness, and more.',
      duration: '8-12 min',
      difficulty: 'Beginner',
      category: 'Personality',
      popularity: 5,
      features: ['Scientific validity', 'Trait analysis', 'Behavioral predictions'],
      icon: Target
    },
    {
      id: 'enneagram',
      title: 'Enneagram Test',
      description: 'Explore your core motivations, fears, and desires through nine personality types.',
      duration: '12-18 min',
      difficulty: 'Intermediate',
      category: 'Personality',
      popularity: 4,
      features: ['Core motivations', 'Growth paths', 'Relationship insights'],
      icon: Heart
    },
    {
      id: 'disc',
      title: 'DISC Assessment',
      description: 'Understand your work style and communication preferences in professional settings.',
      duration: '8-10 min',
      difficulty: 'Beginner',
      category: 'Career',
      popularity: 4,
      features: ['Work style', 'Communication', 'Team dynamics'],
      icon: Briefcase
    },
    {
      id: 'eq',
      title: 'Emotional Intelligence',
      description: 'Measure your ability to understand and manage emotions effectively.',
      duration: '10-15 min',
      difficulty: 'Intermediate',
      category: 'Emotional',
      popularity: 4,
      features: ['Self-awareness', 'Empathy', 'Social skills'],
      icon: Heart
    },
    {
      id: 'career',
      title: 'Career Aptitude',
      description: 'Find careers that match your personality traits and natural strengths.',
      duration: '15-20 min',
      difficulty: 'Intermediate',
      category: 'Career',
      popularity: 5,
      features: ['Career matching', 'Skill assessment', 'Industry insights'],
      icon: Trophy
    },
    // Psychology Tests
    {
      id: 'iq',
      title: 'IQ Test',
      description: 'Assess your cognitive abilities and intellectual potential.',
      duration: '30-45 min',
      difficulty: 'Advanced',
      category: 'Psychology',
      popularity: 5,
      features: ['Logic reasoning', 'Pattern recognition', 'Problem solving'],
      icon: Brain
    },
    {
      id: 'memory',
      title: 'Memory Assessment',
      description: 'Evaluate your short-term and long-term memory capabilities.',
      duration: '20-25 min',
      difficulty: 'Intermediate',
      category: 'Psychology',
      popularity: 3,
      features: ['Visual memory', 'Verbal memory', 'Working memory'],
      icon: Brain
    },
    {
      id: 'attention',
      title: 'Attention & Focus',
      description: 'Test your concentration abilities and attention span.',
      duration: '15-20 min',
      difficulty: 'Intermediate',
      category: 'Psychology',
      popularity: 3,
      features: ['Sustained attention', 'Selective attention', 'Divided attention'],
      icon: Target
    },
    // Education Tests
    {
      id: 'primary',
      title: 'Primary Education',
      description: 'Basic educational skills assessment for elementary level students.',
      duration: '30 min',
      difficulty: 'Beginner',
      category: 'Education',
      popularity: 4,
      features: ['Mathematics', 'Language', 'Science Basics'],
      icon: BookOpen
    },
    {
      id: 'secondary',
      title: 'Secondary Education',
      description: 'Comprehensive assessment for middle school knowledge and skills.',
      duration: '45 min',
      difficulty: 'Intermediate',
      category: 'Education',
      popularity: 4,
      features: ['Advanced Math', 'Literature', 'Sciences', 'History'],
      icon: GraduationCap
    },
    {
      id: 'science-stream',
      title: 'Science Stream',
      description: 'Specialized test for Physics, Chemistry, Biology, and Mathematics.',
      duration: '50 min',
      difficulty: 'Advanced',
      category: 'Education',
      popularity: 4,
      features: ['Physics', 'Chemistry', 'Biology', 'Mathematics'],
      icon: Microscope
    },
    {
      id: 'commerce-stream',
      title: 'Commerce Stream',
      description: 'Business, Economics, and Accounting knowledge assessment.',
      duration: '45 min',
      difficulty: 'Advanced',
      category: 'Education',
      popularity: 3,
      features: ['Accounting', 'Economics', 'Business Studies'],
      icon: Calculator
    },
    {
      id: 'arts-stream',
      title: 'Arts Stream',
      description: 'Humanities, Literature, and Social Sciences assessment.',
      duration: '50 min',
      difficulty: 'Advanced',
      category: 'Education',
      popularity: 3,
      features: ['Literature', 'History', 'Political Science', 'Philosophy'],
      icon: Palette
    },
    // Additional Career Tests
    {
      id: 'leadership',
      title: 'Leadership Style',
      description: 'Discover your natural leadership approach and management style.',
      duration: '12-15 min',
      difficulty: 'Intermediate',
      category: 'Career',
      popularity: 4,
      features: ['Leadership traits', 'Management style', 'Team building'],
      icon: Trophy
    },
    {
      id: 'entrepreneurship',
      title: 'Entrepreneurship Potential',
      description: 'Assess your entrepreneurial mindset and business acumen.',
      duration: '15-18 min',
      difficulty: 'Intermediate',
      category: 'Career',
      popularity: 3,
      features: ['Risk taking', 'Innovation', 'Business skills'],
      icon: Briefcase
    },
    // Health & Wellness
    {
      id: 'stress',
      title: 'Stress Assessment',
      description: 'Evaluate your stress levels and coping mechanisms.',
      duration: '10-12 min',
      difficulty: 'Beginner',
      category: 'Wellness',
      popularity: 4,
      features: ['Stress indicators', 'Coping strategies', 'Mental health'],
      icon: Activity
    },
    {
      id: 'wellness',
      title: 'Overall Wellness',
      description: 'Comprehensive assessment of your physical and mental well-being.',
      duration: '15-20 min',
      difficulty: 'Intermediate',
      category: 'Wellness',
      popularity: 3,
      features: ['Physical health', 'Mental health', 'Life balance'],
      icon: Heart
    }
  ];

  const categories = ['All', 'Personality', 'Psychology', 'Career', 'Education', 'Emotional', 'Wellness'];
  const difficulties = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
  const durations = ['All Durations', 'Quick (< 15 min)', 'Medium (15-30 min)', 'Long (> 30 min)'];

  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = React.useState('All Levels');
  const [selectedDuration, setSelectedDuration] = React.useState('All Durations');

  const filteredTests = allTests.filter(test => {
    const categoryMatch = selectedCategory === 'All' || test.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'All Levels' || test.difficulty === selectedDifficulty;
    
    let durationMatch = true;
    if (selectedDuration === 'Quick (< 15 min)') {
      durationMatch = parseInt(test.duration) < 15;
    } else if (selectedDuration === 'Medium (15-30 min)') {
      const duration = parseInt(test.duration);
      durationMatch = duration >= 15 && duration <= 30;
    } else if (selectedDuration === 'Long (> 30 min)') {
      durationMatch = parseInt(test.duration) > 30;
    }
    
    return categoryMatch && difficultyMatch && durationMatch;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Personality': 'bg-blue-100 text-blue-600',
      'Psychology': 'bg-purple-100 text-purple-600',
      'Career': 'bg-green-100 text-green-600',
      'Education': 'bg-orange-100 text-orange-600',
      'Emotional': 'bg-pink-100 text-pink-600',
      'Wellness': 'bg-teal-100 text-teal-600'
    };
    return colors[category] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Comprehensive Test Suite
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover yourself through our scientifically-validated assessments covering personality, 
            psychology, career, education, and wellness.
          </p>
        </motion.div>

        {/* Enhanced Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 space-y-6"
        >
          {/* Category Filter */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Categories</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-primary-500 text-white shadow-md transform scale-105'
                      : 'bg-white text-gray-600 hover:text-primary-500 hover:bg-primary-50 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Secondary Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Difficulty Level</h4>
              <div className="flex flex-wrap justify-center gap-2">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={`px-3 py-1 rounded-full text-xs transition-all duration-200 ${
                      selectedDifficulty === difficulty
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-blue-100'
                    }`}
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-center">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Duration</h4>
              <div className="flex flex-wrap justify-center gap-2">
                {durations.map((duration) => (
                  <button
                    key={duration}
                    onClick={() => setSelectedDuration(duration)}
                    className={`px-3 py-1 rounded-full text-xs transition-all duration-200 ${
                      selectedDuration === duration
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-green-100'
                    }`}
                  >
                    {duration}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Showing {filteredTests.length} of {allTests.length} tests
            </p>
          </div>
        </motion.div>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTests.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              {/* Test Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <test.icon className="h-5 w-5 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                      {test.title}
                    </h3>
                    <div className="flex items-center space-x-1">
                      {renderStars(test.popularity)}
                      <span className="text-xs text-gray-500 ml-1">({test.popularity}/5)</span>
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(test.category)}`}>
                  {test.category}
                </span>
              </div>

              {/* Test Description */}
              <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                {test.description}
              </p>

              {/* Test Info */}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4 bg-gray-50 rounded-lg p-2">
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {test.duration}
                </div>
                <div className="flex items-center">
                  <Brain className="h-3 w-3 mr-1" />
                  {test.difficulty}
                </div>
                <div className="flex items-center">
                  <Users className="h-3 w-3 mr-1" />
                  Free
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h4 className="text-xs font-medium text-gray-700 mb-2">Key Features:</h4>
                <div className="flex flex-wrap gap-1">
                  {test.features.slice(0, 3).map((feature, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <Link 
                to={`/test/${test.id}`}
                className="btn-primary w-full text-center group-hover:shadow-lg transition-all duration-200 text-sm"
              >
                Take Test
                <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredTests.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Brain className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No tests found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your filters to see more tests.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedDifficulty('All Levels');
                setSelectedDuration('All Durations');
              }}
              className="btn-secondary"
            >
              Reset Filters
            </button>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="card bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need Personalized Guidance?
            </h3>
            <p className="text-gray-600 mb-6">
              Not sure which test suits you best? Start with our most popular personality assessment 
              or explore our comprehensive test recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/test/mbti" className="btn-primary">
                Start with MBTI
              </Link>
              <Link to="/blog" className="btn-secondary">
                Read Test Guide
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TestsPage;