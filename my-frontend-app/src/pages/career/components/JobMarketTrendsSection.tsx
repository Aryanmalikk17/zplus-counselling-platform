import { motion } from 'framer-motion';
import React from 'react';

import { jobMarketTrends } from '../../../data/careerData';

const JobMarketTrendsSection: React.FC = () => {
    return (
        <section className="py-20 bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                        Future Job Market Trends
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Stay ahead of the curve with insights into emerging industries and roles.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {jobMarketTrends.map((trend, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-750 transition-colors border border-gray-700 hover:border-blue-500/30"
                        >
                            <div className={`w-14 h-14 rounded-xl bg-${trend.color}-500/20 flex items-center justify-center mb-6`}>
                                <trend.icon className={`h-7 w-7 text-${trend.color}-400`} />
                            </div>

                            <div className={`text-4xl font-bold text-${trend.color}-400 mb-2`}>
                                {trend.trend}
                            </div>

                            <h3 className="text-xl font-bold text-white mb-3">{trend.title}</h3>
                            <p className="text-gray-400 leading-relaxed">
                                {trend.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default JobMarketTrendsSection;
