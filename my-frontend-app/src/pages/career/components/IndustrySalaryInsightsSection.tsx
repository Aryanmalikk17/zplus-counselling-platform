import React from 'react';
import { motion } from 'framer-motion';
import { industrySalaryData } from '../../../data/careerData';

const IndustrySalaryInsightsSection: React.FC = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Salary Insights by Industry
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Make informed decisions with real-time salary data across major sectors.
                    </p>
                </motion.div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="p-4 font-semibold text-gray-900">Industry</th>
                                <th className="p-4 font-semibold text-gray-900">Entry Level</th>
                                <th className="p-4 font-semibold text-gray-900">Mid Level</th>
                                <th className="p-4 font-semibold text-gray-900">Senior Level</th>
                                <th className="p-4 font-semibold text-gray-900">Top Locations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {industrySalaryData.map((data, index) => (
                                <motion.tr
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors"
                                >
                                    <td className="p-4 font-medium text-gray-900">{data.industry}</td>
                                    <td className="p-4 text-gray-600">{data.entry}</td>
                                    <td className="p-4 text-gray-600 font-medium">{data.mid}</td>
                                    <td className="p-4 text-blue-600 font-bold">{data.senior}</td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            {data.locations.slice(0, 2).map((loc, idx) => (
                                                <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                                                    {loc}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default IndustrySalaryInsightsSection;
