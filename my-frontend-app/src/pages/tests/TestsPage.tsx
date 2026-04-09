import { Brain, Clock, Users, Star, ArrowRight, BookOpen, GraduationCap, Trophy, Heart, Target, Briefcase, Microscope, Calculator, Palette, Activity, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';
import publicAssessmentService from '../../services/publicAssessmentService';



const TestsPage: React.FC = () => {
  const [allTests, setAllTests] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchTests = async () => {
      try {
        const response: any = await publicAssessmentService.getAll();
        const data = response.data?.data || [];
        
        const mappedTests = data.map((test: any) => ({
          ...test,
          id: test.id || test.testType,
          popularity: 5,
          features: ['Scientifically Validated', 'Immediate Results', 'Career Insights'],
          icon: getIconForCategory(test.category)
        }));
        
        setAllTests(mappedTests);
      } catch (error) {
        console.error('Failed to fetch tests:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, []);

  const getIconForCategory = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'personality': return Brain;
      case 'career': return Briefcase;
      case 'psychology': return Target;
      case 'aptitude': return Calculator;
      case 'education': return BookOpen;
      case 'wellness': return Heart;
      case 'emotional': return Activity;
      default: return Brain;
    }
  };

  const categories = ['All', 'Personality', 'Psychology', 'Career', 'Aptitude', 'Education', 'Emotional', 'Wellness'];
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
      durationMatch = (test.duration ? parseInt(test.duration) : test.estimatedTimeMinutes) < 15;
    } else if (selectedDuration === 'Medium (15-30 min)') {
      const duration = test.duration ? parseInt(test.duration) : test.estimatedTimeMinutes;
      durationMatch = duration >= 15 && duration <= 30;
    } else if (selectedDuration === 'Long (> 30 min)') {
      durationMatch = (test.duration ? parseInt(test.duration) : test.estimatedTimeMinutes) > 30;
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
      'Aptitude': 'bg-indigo-100 text-indigo-600',
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
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin h-12 w-12 border-4 border-primary-500/30 border-t-primary-500 rounded-full mb-4"></div>
            <p className="text-gray-500 font-medium animate-pulse">Loading assessments...</p>
          </div>
        ) : (
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
                <p className="text-gray-600 mb-4 leading-relaxed text-sm h-12 line-clamp-2">
                  {test.description}
                </p>

                {/* Test Info */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4 bg-gray-50 rounded-lg p-2">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {test.duration || `${test.estimatedTimeMinutes} min`}
                  </div>
                  <div className="flex items-center">
                    <Brain className="h-3 w-3 mr-1" />
                    {test.difficulty}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    {test.price === 0 || !test.price ? 'Free' : `₹${test.price}`}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-xs font-medium text-gray-700 mb-2">Key Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {test.features.slice(0, 3).map((feature: string, idx: number) => (
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
        )}

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