import { ArrowRight, Clock, Users, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';


import { popularTests } from '../../../data/homeData';

const PopularTestsSection: React.FC = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
                >
                    <div className="max-w-2xl">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Most Popular Assessments
                        </h2>
                        <p className="text-xl text-gray-600">
                            Join thousands of others who have discovered their strengths with our top-rated tests.
                        </p>
                    </div>
                    <button className="flex items-center text-indigo-600 font-bold hover:text-indigo-700 transition-colors whitespace-nowrap">
                        View All Tests <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {popularTests.map((test, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group"
                        >
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-indigo-50 rounded-xl group-hover:bg-indigo-100 transition-colors">
                                        <test.icon className="h-8 w-8 text-indigo-600" />
                                    </div>
                                    <div className="flex items-center bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm font-bold">
                                        <Star className="h-3 w-3 mr-1 fill-current" />
                                        {test.rating}
                                    </div>
                                </div>

                                <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">
                                    {test.category}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{test.title}</h3>
                                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                                    {test.description}
                                </p>

                                <div className="flex items-center justify-between text-sm text-gray-500 pt-6 border-t border-gray-50">
                                    <div className="flex items-center">
                                        <Clock className="h-4 w-4 mr-1.5" />
                                        {test.time}
                                    </div>
                                    <div className="flex items-center">
                                        <Users className="h-4 w-4 mr-1.5" />
                                        {test.users}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 px-8 py-4 flex justify-between items-center group-hover:bg-indigo-50 transition-colors">
                                <span className="font-medium text-gray-900">Start Now</span>
                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:translate-x-2 transition-transform">
                                    <ArrowRight className="h-4 w-4 text-indigo-600" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularTestsSection;
