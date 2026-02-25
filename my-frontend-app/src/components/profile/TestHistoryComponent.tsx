import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-';
import {
  Clock,
  Calendar,
  Trophy,
  TrendingUp,
  TrendingDown,
  Eye,
  Edit,
  Trash2,
  Heart,
  Download,
  Search,
  Filter,
  Star,
  BookOpen,
  Tag,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  BarChart3
} from 'lucide-react';
import { testHistoryService, UserTestHistory } from '../../services/testHistoryService';
import { useAuth } from '../../context/AuthContext';

interface TestHistoryComponentProps {
  onViewResult?: (testId: string) => void;
}

export const TestHistoryComponent: React.FC<TestHistoryComponentProps> = ({
  onViewResult
}) => {
  const { user } = useAuth();
  const [testHistory, setTestHistory] = useState<UserTestHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'date' | 'score' | 'name'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);
  
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [notesText, setNotesText] = useState('');
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    minScore: '',
    maxScore: '',
    tags: [] as string[]
  });

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'personality', label: 'Personality Tests' },
    { value: 'iq', label: 'IQ Tests' },
    { value: 'education', label: 'Educational Tests' },
    { value: 'reasoning', label: 'Reasoning Tests' },
    { value: 'ssb', label: 'SSB Tests' },
    { value: 'memory', label: 'Memory Tests' },
    { value: 'aptitude', label: 'Aptitude Tests' }
  ];

  useEffect(() => {
    loadTestHistory();
  }, [user]);

  useEffect(() => {
    filterAndSortHistory();
  }, [searchQuery, selectedCategory, sortBy, sortOrder, filters]);

  const loadTestHistory = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      const history = testHistoryService.getUserTestHistory(user.id);
      setTestHistory(history);
    } catch (error) {
      console.error('Error loading test history:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortHistory = () => {
    if (!user?.id) return;

    let filtered = testHistoryService.searchTestHistory(
      user.id,
      searchQuery,
      {
        category: selectedCategory === 'all' ? undefined : selectedCategory,
        dateFrom: filters.dateFrom || undefined,
        dateTo: filters.dateTo || undefined,
        minScore: filters.minScore ? parseInt(filters.minScore) : undefined,
        maxScore: filters.maxScore ? parseInt(filters.maxScore) : undefined,
        tags: filters.tags.length > 0 ? filters.tags : undefined
      }
    );

    // Sort results
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'score':
          comparison = a.testResult.percentage - b.testResult.percentage;
          break;
        case 'name':
          comparison = a.testResult.testName.localeCompare(b.testResult.testName);
          break;
      }

      return sortOrder === 'desc' ? -comparison : comparison;
    });

    setTestHistory(filtered);
  };

  const handleToggleFavorite = async (testId: string) => {
    if (!user?.id) return;
    
    const success = testHistoryService.toggleFavorite(user.id, testId);
    if (success) {
      loadTestHistory();
    }
  };

  const handleDeleteTest = async (testId: string) => {
    if (!user?.id) return;
    
    if (window.confirm('Are you sure you want to delete this test result?')) {
      const success = testHistoryService.deleteTestResult(user.id, testId);
      if (success) {
        loadTestHistory();
      }
    }
  };

  const handleUpdateNotes = async (testId: string, notes: string) => {
    if (!user?.id) return;
    
    const success = testHistoryService.updateTestNotes(user.id, testId, notes);
    if (success) {
      setEditingNotes(null);
      loadTestHistory();
    }
  };

  const exportHistory = () => {
    if (!user?.id) return;
    
    const exportData = testHistoryService.exportTestHistory(user.id);
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `test-history-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    }
    return `${minutes}m ${secs}s`;
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
      case 'A': return 'text-green-600 bg-green-100';
      case 'B+':
      case 'B': return 'text-blue-600 bg-blue-100';
      case 'C+':
      case 'C': return 'text-yellow-600 bg-yellow-100';
      case 'D': return 'text-orange-600 bg-orange-100';
      default: return 'text-red-600 bg-red-100';
    }
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    if (percentage >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Search and Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Test History</h2>
          <p className="text-gray-600">View and manage your completed tests</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary flex items-center"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {showFilters ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
          </button>
          
          <button onClick={exportHistory} className="btn-secondary flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Search and Basic Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search tests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-10"
          />
        </div>
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="input"
        >
          {categories.map(category => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'date' | 'score' | 'name')}
          className="input"
        >
          <option value="date">Sort by Date</option>
          <option value="score">Sort by Score</option>
          <option value="name">Sort by Name</option>
        </select>
        
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
          className="input"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="card bg-gray-50"
          >
            <h3 className="text-lg font-semibold mb-4">Advanced Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                  className="input"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                  className="input"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Score (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={filters.minScore}
                  onChange={(e) => setFilters({ ...filters, minScore: e.target.value })}
                  className="input"
                  placeholder="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Score (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={filters.maxScore}
                  onChange={(e) => setFilters({ ...filters, maxScore: e.target.value })}
                  className="input"
                  placeholder="100"
                />
              </div>
            </div>
            
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setFilters({ dateFrom: '', dateTo: '', minScore: '', maxScore: '', tags: [] })}
                className="btn-secondary"
              >
                Clear Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Test History List */}
      {testHistory.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No test history found</h3>
          <p className="text-gray-600">
            {searchQuery || selectedCategory !== 'all' ? 
              'Try adjusting your search or filters.' : 
              'Take your first test to see results here.'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testHistory.map((historyItem) => (
            <motion.div
              key={historyItem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card hover:shadow-lg transition-shadow"
            >
              {/* Test Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {historyItem.testResult.testName}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(historyItem.createdAt)}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleFavorite(historyItem.id)}
                    className={`p-1 rounded-full transition-colors ${
                      historyItem.isFavorite 
                        ? 'text-red-500 hover:text-red-600' 
                        : 'text-gray-400 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${historyItem.isFavorite ? 'fill-current' : ''}`} />
                  </button>
                  
                  <div className="relative group">
                    <button className="p-1 rounded-full text-gray-400 hover:text-gray-600">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                    <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      <button
                        onClick={() => {
                          setEditingNotes(historyItem.id);
                          setNotesText(historyItem.notes || '');
                        }}
                        className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Notes
                      </button>
                      <button
                        onClick={() => handleDeleteTest(historyItem.id)}
                        className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Score and Grade */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`text-2xl font-bold ${getScoreColor(historyItem.testResult.percentage)}`}>
                    {historyItem.testResult.percentage}%
                  </div>
                  <div className={`px-2 py-1 rounded-full text-sm font-medium ${getGradeColor(historyItem.testResult.grade)}`}>
                    {historyItem.testResult.grade}
                  </div>
                </div>
                
                {historyItem.testResult.isPassed && (
                  <div className="flex items-center text-green-600">
                    <Trophy className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">Passed</span>
                  </div>
                )}
              </div>

              {/* Test Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-sm text-gray-500">Correct</div>
                  <div className="font-semibold text-green-600">{historyItem.testResult.correctAnswers}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500">Duration</div>
                  <div className="font-semibold text-gray-900">{formatDuration(historyItem.testResult.timeSpent)}</div>
                </div>
              </div>

              {/* Tags */}
              {historyItem.tags && historyItem.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {historyItem.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                  {historyItem.tags.length > 3 && (
                    <span className="text-xs text-gray-500">+{historyItem.tags.length - 3} more</span>
                  )}
                </div>
              )}

              {/* Notes */}
              {editingNotes === historyItem.id ? (
                <div className="mb-4">
                  <textarea
                    value={notesText}
                    onChange={(e) => setNotesText(e.target.value)}
                    placeholder="Add your notes..."
                    className="input resize-none"
                    rows={3}
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleUpdateNotes(historyItem.id, notesText)}
                      className="btn-primary text-xs py-1 px-3"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingNotes(null)}
                      className="btn-secondary text-xs py-1 px-3"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : historyItem.notes ? (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-700">{historyItem.notes}</div>
                </div>
              ) : null}

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => onViewResult?.(historyItem.id)}
                  className="btn-primary flex-1 flex items-center justify-center"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </button>
                <button className="btn-secondary flex items-center justify-center">
                  <BarChart3 className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};