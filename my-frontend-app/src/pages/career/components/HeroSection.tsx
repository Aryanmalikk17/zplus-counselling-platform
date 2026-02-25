import React from 'react';

import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroSectionProps {
    onStartAssessment: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onStartAssessment }) => {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
            <div className="absolute top-20 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-8 border border-blue-200">
                        <Sparkles className="w-4 h-4 mr-2" />
                        AI-Powered Career Guidance
                    </span>
                    <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-8 tracking-tight">
                        Design Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Future</span>
                        <br />
                        Define Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Success</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Navigate your professional journey with confidence. Get personalized career paths,
                        expert mentorship, and data-driven insights to help you make informed decisions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button
                            onClick={onStartAssessment}
                            className="btn-primary text-lg px-8 py-4 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                        >
                            Take Quick Assessment
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </button>
                        <button className="btn-secondary text-lg px-8 py-4 bg-white hover:bg-gray-50">
                            Browse Career Paths
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
