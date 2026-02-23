import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Share2, Download, RefreshCw, ChevronRight } from 'lucide-react';
import { TestResult } from '../../../types/testTypes';

interface PsychologyTestResultProps {
    result: TestResult;
    onRetake: () => void;
    onBack: () => void;
}

const PsychologyTestResult: React.FC<PsychologyTestResultProps> = ({ result, onRetake, onBack }) => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-3xl shadow-xl overflow-hidden"
                >
                    {/* Header / Score Banner */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                            className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm shadow-inner"
                        >
                            <Brain className="w-16 h-16 text-white" />
                        </motion.div>

                        <h1 className="text-3xl font-bold mb-2">Assessment Complete!</h1>
                        <p className="text-indigo-100 mb-8 max-w-lg mx-auto">
                            You've successfully completed the cognitive assessment. Here's a detailed breakdown of your performance.
                        </p>

                        <div className="flex justify-center gap-6">
                            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm min-w-[120px]">
                                <div className="text-3xl font-bold text-white mb-1">{Math.round(result.score)}%</div>
                                <div className="text-xs text-indigo-200 uppercase tracking-wider font-semibold">Total Score</div>
                            </div>
                            {result.percentile && (
                                <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm min-w-[120px]">
                                    <div className="text-3xl font-bold text-white mb-1">{result.percentile}th</div>
                                    <div className="text-xs text-indigo-200 uppercase tracking-wider font-semibold">Percentile</div>
                                </div>
                            )}
                            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm min-w-[120px]">
                                <div className="text-3xl font-bold text-white mb-1">{result.timeSpent}m</div>
                                <div className="text-xs text-indigo-200 uppercase tracking-wider font-semibold">Time Taken</div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        {/* Category Breakdown */}
                        <div className="mb-10">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                                <span className="w-2 h-6 bg-indigo-500 rounded-full mr-3"></span>
                                Performance by Category
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {result.categoryResults.map((cat, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                        className="bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-indigo-100 transition-colors"
                                    >
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="font-semibold text-gray-700 capitalize">{cat.category}</span>
                                            <span className={`font-bold ${cat.percentage >= 80 ? 'text-green-600' :
                                                    cat.percentage >= 60 ? 'text-blue-600' :
                                                        'text-orange-600'
                                                }`}>
                                                {Math.round(cat.percentage)}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${cat.percentage}%` }}
                                                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                                                className={`h-full rounded-full ${cat.percentage >= 80 ? 'bg-gradient-to-r from-green-400 to-green-500' :
                                                        cat.percentage >= 60 ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                                                            'bg-gradient-to-r from-orange-400 to-red-500'
                                                    }`}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Recommendations */}
                        <div className="mb-10">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                                <span className="w-2 h-6 bg-purple-500 rounded-full mr-3"></span>
                                Key Insights & Recommendations
                            </h3>
                            <div className="space-y-4">
                                {result.recommendations.map((rec, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 + index * 0.1 }}
                                        className="flex items-start p-4 bg-purple-50 rounded-xl text-purple-900"
                                    >
                                        <ChevronRight className="w-5 h-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0" />
                                        <p className="leading-relaxed">{rec}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center border-t border-gray-100 pt-8">
                            <button
                                onClick={onRetake}
                                className="flex items-center justify-center px-6 py-3 border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                            >
                                <RefreshCw className="w-5 h-5 mr-2" />
                                Retake Assessment
                            </button>
                            <button className="flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200">
                                <Download className="w-5 h-5 mr-2" />
                                Download Report
                            </button>
                            <button className="flex items-center justify-center px-6 py-3 border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                                <Share2 className="w-5 h-5 mr-2" />
                                Share Results
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PsychologyTestResult;
