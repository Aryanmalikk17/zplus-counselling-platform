import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Zap } from 'lucide-react';
import { careerTools } from '../../../data/careerData';

const CareerToolsSection: React.FC = () => {
    return (
        <section className="py-20 bg-gradient-to-br from-indigo-900 to-purple-900 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 text-purple-200 mb-6 border border-white/20">
                        <Zap className="w-4 h-4 mr-2" />
                        Premium Tools
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                        Power Your Career Growth
                    </h2>
                    <p className="text-xl text-purple-100 max-w-3xl mx-auto">
                        Leverage our AI-powered tools to accelerate your professional development.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {careerTools.map((tool, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:bg-white/15 transition-all group"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                                    <tool.icon className="h-8 w-8 text-white" />
                                </div>
                                {tool.popular && (
                                    <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
                                        POPULAR
                                    </span>
                                )}
                                {tool.new && (
                                    <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                        NEW
                                    </span>
                                )}
                            </div>

                            <h3 className="text-2xl font-bold mb-3">{tool.name}</h3>
                            <p className="text-purple-200 mb-6">{tool.description}</p>

                            <div className="space-y-3 mb-8">
                                {tool.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center text-sm text-purple-100">
                                        <CheckCircle className="h-4 w-4 text-green-400 mr-3" />
                                        {feature}
                                    </div>
                                ))}
                            </div>

                            <button className="w-full py-3 bg-white text-purple-900 rounded-xl font-bold hover:bg-gray-100 transition-colors flex items-center justify-center">
                                {tool.action}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CareerToolsSection;
