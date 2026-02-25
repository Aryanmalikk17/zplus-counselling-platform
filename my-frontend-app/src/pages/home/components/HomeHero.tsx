import { Brain, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';


import { Link } from 'react-router-dom';

const HomeHero: React.FC = () => {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-transparent min-h-[90vh] flex items-center">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl mx-auto bg-white/40 backdrop-blur-xl border border-white/60 shadow-elevated-low rounded-[2rem] p-8 md:p-16 relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />

                    <span className="relative inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-white border border-accent-100 text-accent-700 mb-8 shadow-sm">
                        <Sparkles className="w-4 h-4 mr-2 text-accent-500" />
                        AI-Powered Life Guidance
                    </span>

                    <h1 className="relative text-5xl lg:text-7xl font-extrabold text-gray-900 mb-8 tracking-tight font-sans leading-tight">
                        Unlock Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-purple-600">True Potential</span>
                        <br className="hidden md:block" /> Discover Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-accent-400">Best Self</span>
                    </h1>

                    <p className="relative text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
                        Comprehensive psychological assessments, career guidance, and personalized counseling
                        to help you navigate life's biggest decisions with confidence.
                    </p>

                    <div className="relative flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link
                            to="/tests"
                            className="btn-primary text-lg px-8 py-4 flex items-center animate-pulse-slow group"
                        >
                            <Brain className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                            Start Assessment
                        </Link>
                        <Link
                            to="/career"
                            className="btn-secondary text-lg px-8 py-4 flex items-center group"
                        >
                            Explore Careers
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HomeHero;
