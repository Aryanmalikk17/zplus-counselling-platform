import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, DollarSign } from 'lucide-react';
import { careerPaths } from '../../../data/careerData';

const PopularCareerPathsSection: React.FC = () => {
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
                        Trending Career Paths
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Explore high-growth career opportunities and their future potential.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {careerPaths.map((path, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                                    <path.icon className="h-8 w-8 text-blue-600" />
                                </div>
                                <span className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm font-medium">
                                    <TrendingUp className="h-4 w-4 mr-1" />
                                    {path.growth} Growth
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-4">{path.name}</h3>

                            <div className="space-y-3 mb-6">
                                {path.roles.slice(0, 3).map((role, idx) => (
                                    <div key={idx} className="flex items-center text-gray-600 text-sm bg-gray-50 px-3 py-2 rounded-lg">
                                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                                        {role}
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <div className="flex items-center text-gray-500 text-sm">
                                    <DollarSign className="h-4 w-4 mr-1" />
                                    Avg. {path.salary}
                                </div>
                                <button className="text-blue-600 font-medium hover:text-blue-700 flex items-center text-sm">
                                    View Details <ArrowRight className="ml-1 h-3 w-3" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularCareerPathsSection;
