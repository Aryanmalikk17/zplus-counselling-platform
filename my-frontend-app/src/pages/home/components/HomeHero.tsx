import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomeHero: React.FC = () => {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />
            <div className="absolute top-20 right-0 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 mb-8 border border-indigo-200">
                        <Sparkles className="w-4 h-4 mr-2" />
                        AI-Powered Life Guidance
                    </span>
                    <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-8 tracking-tight">
                        Unlock Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">True Potential</span>
                        <br />
                        Discover Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Best Self</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Comprehensive psychological assessments, career guidance, and personalized counseling
                        to help you navigate life's biggest decisions with confidence.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            to="/tests"
                            className="btn-primary text-lg px-8 py-4 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center"
                        >
                            <Brain className="mr-2 h-5 w-5" />
                            Start Assessment
                        </Link>
                        <Link
                            to="/career"
                            className="btn-secondary text-lg px-8 py-4 bg-white hover:bg-gray-50 flex items-center"
                        >
                            Explore Careers
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HomeHero;
