import { Trophy, Target, Clock, CheckCircle, XCircle, AlertCircle, Download, Share2, RefreshCw, BookOpen, Star, TrendingUp, Award, FileText, Camera, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar
} from 'recharts';

import { TestResult } from '../../types/testTypes';

interface TestResultDashboardProps {
  result: TestResult;
  onRetakeTest: () => void;
  onBackToTests: () => void;
}

const TestResultDashboard: React.FC<TestResultDashboardProps> = ({
  result,
  onRetakeTest,
  onBackToTests
}) => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [downloadType, setDownloadType] = useState<'report' | 'dashboard' | null>(null);

  const COLORS = {
    correct: '#10B981',
    incorrect: '#EF4444',
    unanswered: '#6B7280',
    primary: '#3B82F6',
    secondary: '#8B5CF6',
    accent: '#F59E0B'
  };

  const performanceData = [
    { name: 'Correct', value: result.correctAnswers, color: COLORS.correct },
    { name: 'Incorrect', value: result.incorrectAnswers, color: COLORS.incorrect },
    { name: 'Unanswered', value: result.unanswered, color: COLORS.unanswered }
  ];

  const categoryData = result.categoryResults.map(cat => ({
    category: cat.category.replace(/([A-Z])/g, ' $1').trim(),
    percentage: cat.percentage,
    correct: cat.correctAnswers,
    incorrect: cat.incorrectAnswers,
    total: cat.totalQuestions
  }));

  const getGradeColor = (grade: string) => {
    const gradeColors = {
      'A+': 'text-green-600 bg-green-100',
      'A': 'text-green-600 bg-green-100',
      'B+': 'text-blue-600 bg-blue-100',
      'B': 'text-blue-600 bg-blue-100',
      'C+': 'text-yellow-600 bg-yellow-100',
      'C': 'text-yellow-600 bg-yellow-100',
      'D': 'text-orange-600 bg-orange-100',
      'F': 'text-red-600 bg-red-100'
    };
    return gradeColors[grade as keyof typeof gradeColors] || 'text-gray-600 bg-gray-100';
  };

  const getPerformanceLevel = () => {
    if (result.percentage >= 90) return { level: 'Excellent', color: 'text-green-600', icon: Trophy };
    if (result.percentage >= 80) return { level: 'Very Good', color: 'text-blue-600', icon: Award };
    if (result.percentage >= 70) return { level: 'Good', color: 'text-yellow-600', icon: Star };
    if (result.percentage >= 60) return { level: 'Average', color: 'text-orange-600', icon: Target };
    return { level: 'Needs Improvement', color: 'text-red-600', icon: AlertCircle };
  };

  const performance = getPerformanceLevel();

  const averageTimePerQuestion = result.timeSpent / result.totalQuestions;
  const timeEfficiency = averageTimePerQuestion < 60 ? 'Excellent' :
    averageTimePerQuestion < 120 ? 'Good' : 'Needs Improvement';

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleDownloadReport = async () => {
    setIsGeneratingPDF(true);
    setDownloadType('report');

    try {
      const { PDFReportService } = await import('../../services/pdfReportService');
      await PDFReportService.generatePDFReport(result);
    } catch (error) {
      console.error('Error generating PDF report:', error);
      alert('Failed to generate PDF report. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
      setDownloadType(null);
    }
  };

  const handleDownloadDashboard = async () => {
    setIsGeneratingPDF(true);
    setDownloadType('dashboard');

    try {
      const { PDFReportService } = await import('../../services/pdfReportService');
      await PDFReportService.generateDashboardScreenshot(result);
    } catch (error) {
      console.error('Error generating dashboard PDF:', error);
      alert('Failed to generate dashboard PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
      setDownloadType(null);
    }
  };

  const handleShareResults = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${result.testName} Results`,
          text: `I scored ${result.percentage}% on the ${result.testName}! Check out my detailed results.`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    const shareText = `I just completed the ${result.testName} and scored ${result.percentage}%! 
Grade: ${result.grade} | ${result.correctAnswers}/${result.totalQuestions} correct answers
Check out Z+ Counselling for comprehensive psychological assessments.`;

    navigator.clipboard.writeText(shareText).then(() => {
      alert('Results copied to clipboard!');
    }).catch(() => {
      alert('Unable to copy to clipboard');
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8" id="test-result-dashboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center ${result.isPassed ? 'bg-green-100' : 'bg-red-100'}`}>
                <performance.icon className={`h-10 w-10 ${performance.color}`} />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {result.testName} - Results
            </h1>
            <p className="text-gray-600 mb-4">
              Completed on {result.completedAt.toLocaleDateString()} at {result.completedAt.toLocaleTimeString()}
            </p>

            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className={`px-6 py-3 rounded-full font-bold text-2xl ${getGradeColor(result.grade)}`}>
                Grade: {result.grade}
              </div>
              <div className={`px-4 py-2 rounded-full text-sm font-medium ${result.isPassed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {result.isPassed ? 'PASSED' : 'FAILED'}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-lg p-4 shadow-sm border">
                <div className="text-2xl font-bold text-blue-600">{result.percentage.toFixed(1)}%</div>
                <div className="text-sm text-gray-500">Overall Score</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border">
                <div className="text-2xl font-bold text-green-600">{result.correctAnswers}</div>
                <div className="text-sm text-gray-500">Correct Answers</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border">
                <div className="text-2xl font-bold text-red-600">{result.incorrectAnswers}</div>
                <div className="text-sm text-gray-500">Incorrect Answers</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border">
                <div className="text-2xl font-bold text-purple-600">{formatTime(result.timeSpent)}</div>
                <div className="text-sm text-gray-500">Time Taken</div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Performance Pie Chart */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Answer Distribution
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={performanceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value, percent }) => `${name}: ${value} (${((percent || 0) * 100).toFixed(0)}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {performanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Category Performance Bar Chart */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <BarChart className="h-5 w-5 mr-2" />
                Category Performance
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="category"
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      fontSize={12}
                    />
                    <YAxis />
                    <Tooltip
                      formatter={(value, name) => [
                        `${value}${name === 'percentage' ? '%' : ''}`,
                        name === 'percentage' ? 'Score' : name
                      ]}
                    />
                    <Bar dataKey="percentage" fill={COLORS.primary} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Strengths */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Strengths
              </h3>
              <ul className="space-y-2">
                {result.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Areas for Improvement */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-xl font-semibold text-red-700 mb-4 flex items-center">
                <XCircle className="h-5 w-5 mr-2" />
                Areas for Improvement
              </h3>
              <ul className="space-y-2">
                {result.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Recommendations
              </h3>
              <ul className="space-y-2">
                {result.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Category Details Table */}
          <div className="bg-white rounded-lg p-6 shadow-sm border mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Detailed Category Analysis
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Questions
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Correct
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Incorrect
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {result.categoryResults.map((category, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {category.category.replace(/([A-Z])/g, ' $1').trim()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {category.totalQuestions}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {category.correctAnswers}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          {category.incorrectAnswers}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${category.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {category.percentage.toFixed(1)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatTime(category.timeSpent)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onRetakeTest}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Retake Test
            </button>

            <button
              onClick={onBackToTests}
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              <BookOpen className="h-5 w-5 mr-2" />
              Back to Tests
            </button>

            {/* Download Report Button */}
            <button
              onClick={handleDownloadReport}
              disabled={isGeneratingPDF && downloadType === 'report'}
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGeneratingPDF && downloadType === 'report' ? (
                <Loader className="h-5 w-5 mr-2 animate-spin" />
              ) : (
                <Download className="h-5 w-5 mr-2" />
              )}
              Download Report
            </button>

            {/* Download Dashboard Button */}
            <button
              onClick={handleDownloadDashboard}
              disabled={isGeneratingPDF && downloadType === 'dashboard'}
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGeneratingPDF && downloadType === 'dashboard' ? (
                <Loader className="h-5 w-5 mr-2 animate-spin" />
              ) : (
                <Camera className="h-5 w-5 mr-2" />
              )}
              Dashboard PDF
            </button>

            <button
              onClick={handleShareResults}
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              <Share2 className="h-5 w-5 mr-2" />
              Share Results
            </button>
          </div>

          {/* PDF Generation Status */}
          {isGeneratingPDF && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center justify-center"
            >
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center">
                <Loader className="h-5 w-5 text-blue-600 animate-spin mr-3" />
                <span className="text-blue-800 font-medium">
                  {downloadType === 'dashboard'
                    ? 'Generating dashboard PDF...'
                    : 'Generating detailed report PDF...'}
                </span>
              </div>
            </motion.div>
          )}

          {/* Download Options Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-lg p-6">
              <div className="text-center">
                <FileText className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Download Options
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
                  <div className="bg-white rounded-lg p-4 border">
                    <div className="flex items-center mb-2">
                      <Download className="h-5 w-5 text-blue-500 mr-2" />
                      <h4 className="font-semibold text-gray-900">Detailed Report</h4>
                    </div>
                    <p>Comprehensive PDF report with all analysis, insights, and recommendations</p>
                    <ul className="mt-2 text-xs text-gray-500 list-disc list-inside">
                      <li>Performance overview with grades</li>
                      <li>Category analysis table</li>
                      <li>Strengths and weaknesses</li>
                      <li>Detailed answer review</li>
                      <li>Professional formatting</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4 border">
                    <div className="flex items-center mb-2">
                      <Camera className="h-5 w-5 text-green-500 mr-2" />
                      <h4 className="font-semibold text-gray-900">Dashboard PDF</h4>
                    </div>
                    <p>Visual snapshot of your dashboard with charts and quick stats</p>
                    <ul className="mt-2 text-xs text-gray-500 list-disc list-inside">
                      <li>Complete dashboard view</li>
                      <li>Interactive charts captured</li>
                      <li>Visual performance summary</li>
                      <li>Easy to share format</li>
                      <li>High-quality image</li>
                    </ul>
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

export default TestResultDashboard;