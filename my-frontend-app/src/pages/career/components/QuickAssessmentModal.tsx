import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle, Brain, Target, Briefcase } from 'lucide-react';
import { assessmentQuestions } from '../../../data/careerData';

interface QuickAssessmentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const QuickAssessmentModal: React.FC<QuickAssessmentModalProps> = ({ isOpen, onClose }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [showResult, setShowResult] = useState(false);

    const handleAnswer = (answer: string) => {
        const newAnswers = [...answers, answer];
        setAnswers(newAnswers);
        if (currentQuestion < assessmentQuestions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            setShowResult(true);
        }
    };

    const resetAssessment = () => {
        setCurrentQuestion(0);
        setAnswers([]);
        setShowResult(false);
        onClose();
    };

    const getCareerRecommendations = () => {
        const answerCounts: Record<string, number> = {};
        answers.forEach((answer, index) => {
            const category = assessmentQuestions[index].categories[assessmentQuestions[index].options.indexOf(answer)];
            answerCounts[category] = (answerCounts[category] || 0) + 1;
        });

        const topCategories = Object.entries(answerCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 3)
            .map(([category]) => category);

        const careerMapping: Record<string, string[]> = {
            analytical: ['Data Scientist', 'Software Engineer', 'Research Analyst'],
            creative: ['UX Designer', 'Content Strategist', 'Art Director'],
            service: ['Healthcare Administrator', 'Counselor', 'Teacher'],
            leadership: ['Product Manager', 'Project Manager', 'Team Lead'],
            impact: ['Social Entrepreneur', 'Environmental Scientist', 'Policy Advisor'],
            financial: ['Investment Banker', 'Financial Analyst', 'Corporate Lawyer'],
            growth: ['Management Consultant', 'Business Analyst', 'Start-up Founder'],
            recognition: ['Sales Director', 'Brand Manager', 'Public Relations Specialist'],
            written: ['Technical Writer', 'Journalist', 'Copywriter'],
            interpersonal: ['HR Manager', 'Sales Representative', 'Life Coach'],
            public: ['Motivational Speaker', 'Corporate Trainer', 'Politician'],
            visual: ['Graphic Designer', 'Architect', 'Film Editor'],
            traditional: ['Accountant', 'Civil Servant', 'Bank Manager'],
            flexible: ['Freelance Consultant', 'Digital Nomad', 'Real Estate Agent'],
            project: ['Event Manager', 'Construction Manager', 'Systems Analyst'],
            varied: ['Emergency Responder', 'Travel Guide', 'Event Coordinator'],
            teamwork: ['Scrum Master', 'Operations Manager', 'Marketing Coordinator'],
            independence: ['Software Developer', 'Writer', 'Lab Researcher'],
            pace: ['Stock Trader', 'ER Doctor', 'Chef'],
            structure: ['Librarian', 'Data Entry Specialist', 'Compliance Officer']
        };

        const recommendations = topCategories.flatMap(cat => careerMapping[cat] || []);
        return [...new Set(recommendations)].slice(0, 5);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={(e) => {
                    if (e.target === e.currentTarget) onClose();
                }}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 flex justify-between items-center text-white">
                        <h2 className="text-2xl font-bold flex items-center">
                            <Brain className="mr-2 h-6 w-6" />
                            Quick Career Assessment
                        </h2>
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="p-8">
                        {!showResult ? (
                            <>
                                <div className="mb-8">
                                    <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
                                        <span>Question {currentQuestion + 1} of {assessmentQuestions.length}</span>
                                        <span>{Math.round(((currentQuestion + 1) / assessmentQuestions.length) * 100)}% Complete</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${((currentQuestion + 1) / assessmentQuestions.length) * 100}%` }}
                                        />
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                    {assessmentQuestions[currentQuestion].question}
                                </h3>

                                <div className="space-y-3">
                                    {assessmentQuestions[currentQuestion].options.map((option, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleAnswer(option)}
                                            className="w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 flex items-center justify-between group"
                                        >
                                            <span className="text-lg text-gray-700 font-medium group-hover:text-blue-700">
                                                {option}
                                            </span>
                                            <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all" />
                                        </button>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="text-center">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Target className="h-10 w-10 text-green-600" />
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-4">Assessment Complete!</h3>
                                <p className="text-gray-600 mb-8 text-lg">
                                    Based on your responses, here are your recommended career paths:
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                    {getCareerRecommendations().map((career, index) => (
                                        <div
                                            key={index}
                                            className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100 flex items-center"
                                        >
                                            <Briefcase className="h-5 w-5 text-blue-600 mr-3" />
                                            <span className="font-semibold text-gray-900">{career}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex gap-4 justify-center">
                                    <button onClick={resetAssessment} className="btn-secondary">
                                        Close
                                    </button>
                                    <button className="btn-primary">
                                        Get Detailed Analysis
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default QuickAssessmentModal;
