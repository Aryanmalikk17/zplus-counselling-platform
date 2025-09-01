import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Calendar,
  Award,
  Brain,
  Users,
  Clock
} from 'lucide-react';
import { testHistoryService, TestStats } from '../../services/testHistoryService';
import { useAuth } from '../../context/AuthContext';

const TestStatsDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<TestStats>({
    totalTestsTaken: 0,
    averageScore: 0,
    bestScore: 0,
    totalTimeSpent: 0,
    categoriesCompleted: [],
    improvementTrend: [],
    categoryStats: [],
    recentActivity: [],
    achievements: [],
    streak: {
      current: 0,
      longest: 0,
      lastTestDate: ''
    }
  });

  useEffect(() => {
    if (user?.id) {
      loadStats();
    }
  }, [user?.id]);

  const loadStats = () => {
    if (!user?.id) return;
    const userStats = testHistoryService.getUserStats(user.id);
    setStats(userStats);
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'personality': return '🧠';
      case 'iq': return '🎯';
      case 'education': return '📚';
      case 'reasoning': return '🔍';
      case 'ssb': return '🎖️';
      default: return '📊';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPerformanceLevel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Good';
    if (score >= 70) return 'Average';
    return 'Needs Improvement';
  };

  if (!user) {
    return <div>Please log in to view statistics</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Test Statistics</h2>
        <p className="text-gray-600">Your performance analytics and insights</p>
      </div>

      {stats.totalTestsTaken === 0 ? (
        <div className="text-center py-12">
          <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No statistics available</h3>
          <p className="text-gray-600">Take some tests to see your performance analytics</p>
        </div>
      ) : (
        <>
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="card text-center"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stats.totalTestsTaken}</div>
              <div className="text-gray-600 text-sm">Tests Completed</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card text-center"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className={`text-2xl font-bold mb-1 ${getScoreColor(stats.averageScore)}`}>
                {Math.round(stats.averageScore)}%
              </div>
              <div className="text-gray-600 text-sm">Average Score</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card text-center"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div className={`text-2xl font-bold mb-1 ${getScoreColor(stats.bestScore)}`}>
                {Math.round(stats.bestScore)}%
              </div>
              <div className="text-gray-600 text-sm">Best Score</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="card text-center"
            >
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Brain className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stats.categoryStats.length}
              </div>
              <div className="text-gray-600 text-sm">Categories</div>
            </motion.div>
          </div>

          {/* Performance Level */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="card"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="text-sm text-gray-600">Current Performance Level</div>
                <div className={`text-xl font-bold ${getScoreColor(stats.averageScore)}`}>
                  {getPerformanceLevel(stats.averageScore)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Average Score</div>
                <div className={`text-2xl font-bold ${getScoreColor(stats.averageScore)}`}>
                  {Math.round(stats.averageScore)}%
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tests by Category */}
          {stats.categoryStats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tests by Category</h3>
              <div className="space-y-4">
                {stats.categoryStats.map((category, index) => (
                  <div key={category.category} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{getCategoryIcon(category.category)}</span>
                      <div>
                        <div className="font-medium text-gray-900 capitalize">{category.category}</div>
                        <div className="text-sm text-gray-600">{category.testsCount} test{category.testsCount !== 1 ? 's' : ''}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(category.testsCount / stats.totalTestsTaken) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {Math.round((category.testsCount / stats.totalTestsTaken) * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Recent Activity */}
          {stats.recentActivity.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {stats.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-lg">{getCategoryIcon(activity.testName)}</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{activity.testName}</div>
                        <div className="text-sm text-gray-600 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(activity.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {activity.score && (
                        <>
                          <div className={`text-lg font-bold ${getScoreColor(activity.score)}`}>
                            {Math.round(activity.score)}%
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Achievements */}
          {stats.achievements.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Award className="h-5 w-5 text-yellow-500 mr-2" />
                Achievements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stats.achievements.map((achievement, index) => (
                  <div key={achievement.id} className="flex items-center p-3 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg">
                    <div className="text-2xl mr-3">{achievement.icon}</div>
                    <div>
                      <div className="font-semibold text-gray-900">{achievement.name}</div>
                      <div className="text-sm text-gray-600">{achievement.description}</div>
                      <div className="text-xs text-gray-500">
                        Unlocked: {new Date(achievement.unlockedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default TestStatsDashboard;