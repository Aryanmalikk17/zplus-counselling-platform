import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { comprehensiveFeatures } from '../../../data/homeData';

const ComprehensiveFeatures: React.FC = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-purple-50 rounded-full mix-blend-multiply filter blur-[120px] opacity-60 pointer-events-none" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        Everything You Need to Succeed
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
                        A complete ecosystem of tools and resources designed to help you achieve your personal and professional goals.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 auto-rows-fr">
                    {comprehensiveFeatures.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white/60 backdrop-blur-md border border-gray-100 rounded-3xl p-8 lg:p-10 shadow-sm hover:shadow-elevated-medium transition-all duration-300 group flex flex-col h-full relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none group-hover:scale-110 transform">
                                <feature.icon className="w-48 h-48" />
                            </div>

                            <div className="flex items-start mb-8 relative z-10">
                                <div className="w-16 h-16 bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 border border-accent-200">
                                    <feature.icon className="h-8 w-8 text-accent-600" />
                                </div>
                            </div>

                            <div className="flex-1 relative z-10">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">{feature.title}</h3>
                                <p className="text-gray-600 mb-8 leading-relaxed font-medium">{feature.description}</p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                    {feature.features.map((item, idx) => (
                                        <div key={idx} className="flex items-center text-sm text-gray-700 font-medium">
                                            <CheckCircle className="h-5 w-5 text-accent-500 mr-3 flex-shrink-0 group-hover:text-accent-600 transition-colors" />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-auto relative z-10">
                                <button className="inline-flex items-center text-accent-600 font-bold group-hover:text-accent-700 transition-colors">
                                    Learn More <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1.5 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ComprehensiveFeatures;
