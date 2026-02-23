import React from 'react';
import { motion } from 'framer-motion';
import { features } from '../../../data/homeData';

const GeneralFeaturesSection: React.FC = () => {
    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                            Why Choose ZPlus Counselling?
                        </h2>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            We combine scientific assessment methods with actionable insights to help you make the right decisions for your future.
                        </p>

                        <div className="grid grid-cols-1 gap-8">
                            {features.map((feature, index) => (
                                <div key={index} className="flex">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-indigo-100 text-indigo-600">
                                            <feature.icon className="h-6 w-6" />
                                        </div>
                                    </div>
                                    <div className="ml-6">
                                        <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                                        <p className="mt-2 text-gray-600 leading-relaxed">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80"
                                alt="Counseling Session"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-transparent flex items-end p-8">
                                <div className="text-white">
                                    <p className="text-2xl font-bold mb-2">"The best investment you can make is in yourself."</p>
                                    <p className="text-indigo-200">Start your journey today</p>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-400 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob" />
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default GeneralFeaturesSection;
