import React from 'react';

import { features } from '../../../data/homeData';

const GeneralFeaturesSection: React.FC = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-50 rounded-full mix-blend-multiply filter blur-[120px] opacity-60 pointer-events-none" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
                            Why Choose ZPlus Counselling?
                        </h2>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed font-medium">
                            We combine scientific assessment methods with actionable insights to help you make the right decisions for your future.
                        </p>

                        <div className="grid grid-cols-1 gap-6">
                            {features.map((feature, index) => (
                                <div key={index} className="flex p-6 rounded-3xl bg-white/60 backdrop-blur-md border border-gray-100 shadow-sm hover:shadow-elevated-low transition-all duration-300">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-accent-50 text-accent-600 shadow-sm">
                                            <feature.icon className="h-6 w-6" />
                                        </div>
                                    </div>
                                    <div className="ml-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                                        <p className="text-gray-600 leading-relaxed font-medium">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, x: 30 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative rounded-[2.5rem] overflow-hidden shadow-elevated-medium border-4 border-white">
                            <img
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80"
                                alt="Counseling Session"
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent flex items-end p-10">
                                <div className="text-white">
                                    <p className="text-3xl font-bold mb-3 leading-snug">"The best investment you can make is in yourself."</p>
                                    <p className="text-accent-200 font-medium text-lg flex items-center">
                                        Start your journey today <span className="ml-2">→</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse-slow" />
                        <div className="absolute -top-10 -left-10 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse-slow animation-delay-2000" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default GeneralFeaturesSection;
