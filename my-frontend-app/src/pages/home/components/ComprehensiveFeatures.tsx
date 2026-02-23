import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { comprehensiveFeatures } from '../../../data/homeData';

const ComprehensiveFeatures: React.FC = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Everything You Need to Succeed
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        A complete ecosystem of tools and resources designed to help you achieve your personal and professional goals.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {comprehensiveFeatures.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group"
                        >
                            <div className="flex items-start space-x-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                                    <feature.icon className="h-8 w-8 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                    <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>

                                    <div className="grid grid-cols-2 gap-3 mb-6">
                                        {feature.features.map((item, idx) => (
                                            <div key={idx} className="flex items-center text-sm text-gray-500 font-medium">
                                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                                {item}
                                            </div>
                                        ))}
                                    </div>

                                    <button className="flex items-center text-indigo-600 font-semibold group-hover:text-indigo-700 transition-colors">
                                        Learn More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ComprehensiveFeatures;
