import { Award, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';


import { TestResult } from '../../../../types/testTypes';

interface EducationTestResultProps {
    result: TestResult;
    onRetake: () => void;
    onBack: () => void;
}

const EducationTestResult: React.FC<EducationTestResultProps> = ({ result, onRetake, onBack }) => {
    return (
        <div className="min-h-screen py-12 bg-transparent">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden text-center p-8 border border-gray-100">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Award className="h-12 w-12 text-green-600" />
                        </div>

                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            Educational Assessment Complete!
                        </h1>

                        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 mb-8 inline-block w-full max-w-md">
                            <div className="text-5xl font-bold text-green-600 mb-2">
                                {Math.round(result.score)}%
                            </div>
                            <p className="text-gray-600 font-medium uppercase tracking-wide text-sm">Overall Score</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            {result.categoryResults.map((category) => (
                                <div key={category.category} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                                    <div className="text-lg font-semibold text-gray-900 capitalize mb-1">
                                        {category.category.replace(/([A-Z])/g, ' $1').trim()}
                                    </div>
                                    <div className="text-xl font-bold text-blue-600">
                                        {Math.round(category.percentage)}%
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-left mb-8 bg-blue-50 p-6 rounded-xl border border-blue-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                                Educational Insights
                            </h3>
                            <ul className="space-y-3">
                                {result.recommendations.map((rec, index) => (
                                    <li key={index} className="flex items-start">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                                        <span className="text-gray-700 leading-relaxed">{rec}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button onClick={onRetake} className="btn-secondary px-8 py-3">
                                Take Another Test
                            </button>
                            <button onClick={onBack} className="btn-primary px-8 py-3">
                                Back to Tests
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default EducationTestResult;
