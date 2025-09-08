import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Users, ArrowLeft, CheckCircle } from 'lucide-react';

const TestPage: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  
  // Get the current path to handle both /test/:testId and direct category routes
  const currentPath = window.location.pathname;
  const categoryFromPath = currentPath.split('/').pop();

  // This is a placeholder - in a real app, you'd fetch test data based on testId
  const testInfo = {
    mbti: { name: '16 Types (MBTI)', duration: '10-15 min', description: 'Discover your Myers-Briggs personality type' },
    bigfive: { name: 'Big Five Traits', duration: '8-12 min', description: 'Measure your personality across five key dimensions' },
    career: { name: 'Career Aptitude', duration: '15-20 min', description: 'Find careers that match your personality' },
    enneagram: { name: 'Enneagram Test', duration: '12-18 min', description: 'Explore your core motivations and fears' },
    disc: { name: 'DISC Assessment', duration: '8-10 min', description: 'Understand your work style' },
    eq: { name: 'EQ Assessment', duration: '10-15 min', description: 'Measure your emotional intelligence' },
    // New test categories
    reasoning: { name: 'Reasoning Test', duration: '20-25 min', description: 'Test your logical reasoning and analytical thinking abilities' },
    psychology: { name: 'Psychology Test', duration: '15-20 min', description: 'Explore psychological patterns and cognitive behaviors' },
    gto: { name: 'GTO Test', duration: '25-30 min', description: 'Group Testing Officer assessment for leadership and teamwork skills' },
    personality: { name: 'Personality Test', duration: '12-18 min', description: 'Comprehensive personality assessment and trait analysis' },
    education: { name: 'Education Test', duration: '18-25 min', description: 'Assess your academic knowledge and learning aptitude across various subjects' },
    // Interview categories
    gd: { name: 'GD (Group Discussion)', duration: '30-45 min', description: 'Group discussion skills assessment and communication evaluation' },
    gpe: { name: 'GPE', duration: '25-35 min', description: 'Group Planning Exercise for leadership and decision-making skills' },
    obstacle: { name: 'Obstacle Test', duration: '20-30 min', description: 'Physical and mental obstacle course assessment' },
  }[testId || categoryFromPath as string] || { name: 'Test', duration: '10-15 min', description: 'Discover insights about yourself' };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {testInfo.name}
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              {testInfo.description}
            </p>
            <div className="flex items-center justify-center space-x-6 text-gray-500">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                {testInfo.duration}
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Free
              </div>
            </div>
          </div>

          {/* Test Coming Soon Card */}
          <div className="card text-center max-w-2xl mx-auto">
            <div className="mb-8">
              <div className="mx-auto w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="h-10 w-10 text-primary-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Test Implementation Coming Soon!
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                We're currently building the interactive test interface for {testInfo.name}. 
                This will include all the questions, progress tracking, and detailed results analysis.
              </p>
              
              <div className="bg-primary-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">What to expect:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Scientific questions
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Progress tracking
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Detailed results
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Personalized insights
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.history.back()}
                className="btn-secondary"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Tests
              </button>
              <button className="btn-primary" disabled>
                Coming Soon
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TestPage;