export interface TestResult {
  id: string;
  testName: string;
  testType: string;
  category: string;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  skippedQuestions: number;
  percentage: number;
  grade: string;
  isPassed: boolean;
  timeSpent: number; // in seconds
  maxTime: number; // in seconds
  difficulty: 'Easy' | 'Medium' | 'Hard';
  answers: Array<{
    questionId: string;
    userAnswer: string | string[];
    correctAnswer: string | string[];
    isCorrect: boolean;
    timeSpent: number;
    questionText?: string;
    explanation?: string;
  }>;
  categoryBreakdown: Array<{
    category: string;
    total: number;
    correct: number;
    percentage: number;
  }>;
  recommendations?: string[];
  strengths?: string[];
  weaknesses?: string[];
}

export interface UserTestHistory {
  id: string;
  userId: string;
  testResult: TestResult;
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean;
  notes?: string;
  tags?: string[];
  retakeCount: number;
  averageScore?: number;
  bestScore?: number;
  improvementRate?: number;
}

export interface TestStats {
  totalTestsTaken: number;
  averageScore: number;
  bestScore: number;
  totalTimeSpent: number;
  categoriesCompleted: string[];
  improvementTrend: Array<{
    date: string;
    score: number;
    testName: string;
  }>;
  categoryStats: Array<{
    category: string;
    testsCount: number;
    averageScore: number;
    bestScore: number;
    improvement: number;
  }>;
  recentActivity: Array<{
    date: string;
    action: string;
    testName: string;
    score?: number;
  }>;
  achievements: Array<{
    id: string;
    name: string;
    description: string;
    icon: string;
    unlockedAt: string;
    category: string;
  }>;
  streak: {
    current: number;
    longest: number;
    lastTestDate: string;
  };
}

export interface SearchFilters {
  category?: string;
  dateFrom?: string;
  dateTo?: string;
  minScore?: number;
  maxScore?: number;
  tags?: string[];
  difficulty?: string;
  isPassed?: boolean;
}

class TestHistoryService {
  private readonly STORAGE_KEY = 'userTestHistory';
  private readonly STATS_KEY = 'userTestStats';

  // Save test result to history
  saveTestResult(userId: string, testResult: TestResult): string {
    const histories = this.getAllHistories();
    const userHistory = histories[userId] || [];
    
    const historyItem: UserTestHistory = {
      id: this.generateId(),
      userId,
      testResult,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isFavorite: false,
      retakeCount: this.getRetakeCount(userId, testResult.testName),
      tags: this.generateAutoTags(testResult)
    };

    // Calculate improvement metrics
    const previousAttempts = userHistory.filter(h => h.testResult.testName === testResult.testName);
    if (previousAttempts.length > 0) {
      const scores = previousAttempts.map(h => h.testResult.percentage);
      historyItem.averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
      historyItem.bestScore = Math.max(...scores);
      
      if (previousAttempts.length > 1) {
        const lastScore = previousAttempts[previousAttempts.length - 1].testResult.percentage;
        historyItem.improvementRate = testResult.percentage - lastScore;
      }
    }

    userHistory.push(historyItem);
    histories[userId] = userHistory;
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(histories));
    
    // Update user stats
    this.updateUserStats(userId, testResult);
    
    return historyItem.id;
  }

  // Get user's test history
  getUserTestHistory(userId: string): UserTestHistory[] {
    const histories = this.getAllHistories();
    return histories[userId] || [];
  }

  // Get specific test result
  getTestResult(userId: string, testId: string): UserTestHistory | null {
    const userHistory = this.getUserTestHistory(userId);
    return userHistory.find(h => h.id === testId) || null;
  }

  // Search and filter test history
  searchTestHistory(userId: string, query: string, filters?: SearchFilters): UserTestHistory[] {
    let history = this.getUserTestHistory(userId);

    // Text search
    if (query) {
      const searchTerm = query.toLowerCase();
      history = history.filter(h => 
        h.testResult.testName.toLowerCase().includes(searchTerm) ||
        h.testResult.category.toLowerCase().includes(searchTerm) ||
        h.notes?.toLowerCase().includes(searchTerm) ||
        h.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Apply filters
    if (filters) {
      if (filters.category) {
        history = history.filter(h => h.testResult.category === filters.category);
      }
      
      if (filters.dateFrom) {
        history = history.filter(h => new Date(h.createdAt) >= new Date(filters.dateFrom!));
      }
      
      if (filters.dateTo) {
        history = history.filter(h => new Date(h.createdAt) <= new Date(filters.dateTo!));
      }
      
      if (filters.minScore !== undefined) {
        history = history.filter(h => h.testResult.percentage >= filters.minScore!);
      }
      
      if (filters.maxScore !== undefined) {
        history = history.filter(h => h.testResult.percentage <= filters.maxScore!);
      }
      
      if (filters.tags && filters.tags.length > 0) {
        history = history.filter(h => 
          h.tags?.some(tag => filters.tags!.includes(tag))
        );
      }
      
      if (filters.difficulty) {
        history = history.filter(h => h.testResult.difficulty === filters.difficulty);
      }
      
      if (filters.isPassed !== undefined) {
        history = history.filter(h => h.testResult.isPassed === filters.isPassed);
      }
    }

    return history;
  }

  // Update test notes
  updateTestNotes(userId: string, testId: string, notes: string): boolean {
    const histories = this.getAllHistories();
    const userHistory = histories[userId] || [];
    
    const testIndex = userHistory.findIndex(h => h.id === testId);
    if (testIndex === -1) return false;
    
    userHistory[testIndex].notes = notes;
    userHistory[testIndex].updatedAt = new Date().toISOString();
    
    histories[userId] = userHistory;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(histories));
    
    return true;
  }

  // Toggle favorite status
  toggleFavorite(userId: string, testId: string): boolean {
    const histories = this.getAllHistories();
    const userHistory = histories[userId] || [];
    
    const testIndex = userHistory.findIndex(h => h.id === testId);
    if (testIndex === -1) return false;
    
    userHistory[testIndex].isFavorite = !userHistory[testIndex].isFavorite;
    userHistory[testIndex].updatedAt = new Date().toISOString();
    
    histories[userId] = userHistory;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(histories));
    
    return true;
  }

  // Add tags to test
  addTags(userId: string, testId: string, tags: string[]): boolean {
    const histories = this.getAllHistories();
    const userHistory = histories[userId] || [];
    
    const testIndex = userHistory.findIndex(h => h.id === testId);
    if (testIndex === -1) return false;
    
    const currentTags = userHistory[testIndex].tags || [];
    userHistory[testIndex].tags = [...new Set([...currentTags, ...tags])];
    userHistory[testIndex].updatedAt = new Date().toISOString();
    
    histories[userId] = userHistory;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(histories));
    
    return true;
  }

  // Delete test result
  deleteTestResult(userId: string, testId: string): boolean {
    const histories = this.getAllHistories();
    const userHistory = histories[userId] || [];
    
    const filteredHistory = userHistory.filter(h => h.id !== testId);
    if (filteredHistory.length === userHistory.length) return false;
    
    histories[userId] = filteredHistory;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(histories));
    
    // Update stats
    this.recalculateUserStats(userId);
    
    return true;
  }

  // Get user statistics
  getUserStats(userId: string): TestStats {
    const stats = this.getAllStats();
    return stats[userId] || this.getDefaultStats();
  }

  // Get category performance
  getCategoryPerformance(userId: string, category: string): Array<UserTestHistory> {
    const history = this.getUserTestHistory(userId);
    return history.filter(h => h.testResult.category === category)
                 .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  // Get improvement trend
  getImprovementTrend(userId: string, testName?: string): Array<{date: string, score: number}> {
    const history = this.getUserTestHistory(userId);
    let filtered = history;
    
    if (testName) {
      filtered = history.filter(h => h.testResult.testName === testName);
    }
    
    return filtered
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      .map(h => ({
        date: h.createdAt,
        score: h.testResult.percentage
      }));
  }

  // Export test history
  exportTestHistory(userId: string): string {
    const history = this.getUserTestHistory(userId);
    const stats = this.getUserStats(userId);
    
    const exportData = {
      userId,
      exportDate: new Date().toISOString(),
      testHistory: history,
      statistics: stats
    };
    
    return JSON.stringify(exportData, null, 2);
  }

  // Import test history
  importTestHistory(userId: string, data: string): boolean {
    try {
      const importData = JSON.parse(data);
      
      if (!importData.testHistory || !Array.isArray(importData.testHistory)) {
        return false;
      }
      
      const histories = this.getAllHistories();
      histories[userId] = importData.testHistory;
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(histories));
      
      // Recalculate stats
      this.recalculateUserStats(userId);
      
      return true;
    } catch (error) {
      console.error('Import failed:', error);
      return false;
    }
  }

  // Get recommendations based on history
  getRecommendations(userId: string): Array<{
    type: 'improvement' | 'practice' | 'new';
    message: string;
    testSuggestion?: string;
    priority: 'high' | 'medium' | 'low';
  }> {
    const history = this.getUserTestHistory(userId);
    const stats = this.getUserStats(userId);
    const recommendations = [];

    // Analyze weak categories
    const weakCategories = stats.categoryStats
      .filter(cat => cat.averageScore < 70)
      .sort((a, b) => a.averageScore - b.averageScore);

    for (const category of weakCategories.slice(0, 2)) {
      recommendations.push({
        type: 'improvement' as const,
        message: `Focus on improving your ${category.category} skills (current average: ${category.averageScore}%)`,
        testSuggestion: category.category,
        priority: 'high' as const
      });
    }

    // Check for practice gaps
    const lastTestDate = new Date(Math.max(...history.map(h => new Date(h.createdAt).getTime())));
    const daysSinceLastTest = Math.floor((Date.now() - lastTestDate.getTime()) / (1000 * 60 * 60 * 24));

    if (daysSinceLastTest > 7) {
      recommendations.push({
        type: 'practice' as const,
        message: `It's been ${daysSinceLastTest} days since your last test. Regular practice helps maintain skills.`,
        priority: 'medium' as const
      });
    }

    // Suggest new test types
    const completedCategories = [...new Set(history.map(h => h.testResult.category))];
    const allCategories = ['personality', 'iq', 'education', 'reasoning', 'ssb', 'memory', 'aptitude'];
    const untriedCategories = allCategories.filter(cat => !completedCategories.includes(cat));

    if (untriedCategories.length > 0) {
      recommendations.push({
        type: 'new' as const,
        message: `Explore new test categories: ${untriedCategories.slice(0, 2).join(', ')}`,
        priority: 'low' as const
      });
    }

    return recommendations;
  }

  // Private helper methods
  private getAllHistories(): Record<string, UserTestHistory[]> {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  }

  private getAllStats(): Record<string, TestStats> {
    const stored = localStorage.getItem(this.STATS_KEY);
    return stored ? JSON.parse(stored) : {};
  }

  private updateUserStats(userId: string, testResult: TestResult): void {
    const stats = this.getAllStats();
    const userStats = stats[userId] || this.getDefaultStats();
    
    // Update basic stats
    userStats.totalTestsTaken++;
    
    const allHistory = this.getUserTestHistory(userId);
    const scores = allHistory.map(h => h.testResult.percentage);
    userStats.averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    userStats.bestScore = Math.max(...scores);
    userStats.totalTimeSpent += testResult.timeSpent;
    
    // Update category stats
    const categoryIndex = userStats.categoryStats.findIndex(cat => cat.category === testResult.category);
    if (categoryIndex === -1) {
      userStats.categoryStats.push({
        category: testResult.category,
        testsCount: 1,
        averageScore: testResult.percentage,
        bestScore: testResult.percentage,
        improvement: 0
      });
    } else {
      const categoryHistory = allHistory.filter(h => h.testResult.category === testResult.category);
      const categoryScores = categoryHistory.map(h => h.testResult.percentage);
      
      userStats.categoryStats[categoryIndex].testsCount = categoryHistory.length;
      userStats.categoryStats[categoryIndex].averageScore = 
        categoryScores.reduce((sum, score) => sum + score, 0) / categoryScores.length;
      userStats.categoryStats[categoryIndex].bestScore = Math.max(...categoryScores);
      
      if (categoryHistory.length > 1) {
        const firstScore = categoryScores[0];
        const lastScore = categoryScores[categoryScores.length - 1];
        userStats.categoryStats[categoryIndex].improvement = lastScore - firstScore;
      }
    }
    
    // Update improvement trend
    userStats.improvementTrend.push({
      date: new Date().toISOString(),
      score: testResult.percentage,
      testName: testResult.testName
    });
    
    // Keep only last 10 entries for trend
    if (userStats.improvementTrend.length > 10) {
      userStats.improvementTrend = userStats.improvementTrend.slice(-10);
    }
    
    // Update streak
    this.updateStreak(userStats);
    
    // Update achievements
    this.checkAchievements(userStats, testResult);
    
    stats[userId] = userStats;
    localStorage.setItem(this.STATS_KEY, JSON.stringify(stats));
  }

  private recalculateUserStats(userId: string): void {
    const history = this.getUserTestHistory(userId);
    const stats = this.getAllStats();
    
    // Reset stats
    stats[userId] = this.getDefaultStats();
    
    // Recalculate from history
    for (const historyItem of history) {
      this.updateUserStats(userId, historyItem.testResult);
    }
  }

  private getDefaultStats(): TestStats {
    return {
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
    };
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private getRetakeCount(userId: string, testName: string): number {
    const history = this.getUserTestHistory(userId);
    return history.filter(h => h.testResult.testName === testName).length;
  }

  private generateAutoTags(testResult: TestResult): string[] {
    const tags = [];
    
    if (testResult.percentage >= 90) tags.push('Excellent');
    else if (testResult.percentage >= 80) tags.push('Good');
    else if (testResult.percentage >= 70) tags.push('Average');
    else tags.push('Needs Improvement');
    
    if (testResult.isPassed) tags.push('Passed');
    
    tags.push(testResult.difficulty);
    tags.push(testResult.category);
    
    return tags;
  }

  private updateStreak(stats: TestStats): void {
    const today = new Date().toDateString();
    const lastTestDate = stats.streak.lastTestDate ? new Date(stats.streak.lastTestDate).toDateString() : '';
    
    if (lastTestDate === today) {
      // Same day, don't update streak
      return;
    }
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (lastTestDate === yesterday.toDateString()) {
      // Consecutive day
      stats.streak.current++;
    } else if (lastTestDate !== '') {
      // Streak broken
      stats.streak.current = 1;
    } else {
      // First test
      stats.streak.current = 1;
    }
    
    stats.streak.longest = Math.max(stats.streak.longest, stats.streak.current);
    stats.streak.lastTestDate = new Date().toISOString();
  }

  private checkAchievements(stats: TestStats, testResult: TestResult): void {
    const achievements = [
      {
        id: 'first_test',
        name: 'First Steps',
        description: 'Complete your first test',
        icon: '🎯',
        category: 'milestone',
        condition: () => stats.totalTestsTaken === 1
      },
      {
        id: 'perfect_score',
        name: 'Perfect Score',
        description: 'Achieve 100% on any test',
        icon: '💯',
        category: 'performance',
        condition: () => testResult.percentage === 100
      },
      {
        id: 'streak_7',
        name: 'Week Warrior',
        description: 'Maintain a 7-day testing streak',
        icon: '🔥',
        category: 'consistency',
        condition: () => stats.streak.current >= 7
      },
      {
        id: 'category_master',
        name: 'Category Master',
        description: 'Complete tests in 5 different categories',
        icon: '🏆',
        category: 'exploration',
        condition: () => stats.categoryStats.length >= 5
      }
    ];

    for (const achievement of achievements) {
      const alreadyUnlocked = stats.achievements.some(a => a.id === achievement.id);
      if (!alreadyUnlocked && achievement.condition()) {
        stats.achievements.push({
          ...achievement,
          unlockedAt: new Date().toISOString()
        });
      }
    }
  }
}

export const testHistoryService = new TestHistoryService();