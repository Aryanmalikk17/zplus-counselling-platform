import { motion } from 'framer-motion';
import React from 'react';

import { successMetrics } from '../../../data/homeData';

const SuccessMetricsSection: React.FC = () => {
    return (
        <section className="py-20 bg-gray-900 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center fixed" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                        Impact That Matters
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        We measure our success by the growth and achievements of our users.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {successMetrics.map((metric, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-colors group"
                        >
                            <div className={`w-14 h-14 rounded-xl bg-${metric.color}-500/20 flex items-center justify-center mb-6`}>
                                <metric.icon className={`h-7 w-7 text-${metric.color}-400`} />
                            </div>

                            <div className={`text-5xl font-bold text-${metric.color}-400 mb-2`}>
                                {metric.metric}
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2">{metric.title}</h3>
                            <p className="text-gray-300">
                                {metric.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SuccessMetricsSection;
