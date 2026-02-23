import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { expertServices } from '../../../data/homeData';

const ExpertServicesSection: React.FC = () => {
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
                        Expert Services
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Professional guidance tailored to your specific needs.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {expertServices.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-gray-50 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 relative border border-gray-100 hover:border-indigo-100"
                        >
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md mb-6 text-indigo-600">
                                <service.icon className="h-8 w-8" />
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                            <p className="text-gray-600 mb-6">{service.description}</p>

                            <div className="text-3xl font-bold text-indigo-600 mb-6">{service.price}</div>

                            <div className="space-y-4 mb-8">
                                {service.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center text-gray-700">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                        {feature}
                                    </div>
                                ))}
                            </div>

                            <button className="w-full py-4 bg-white border-2 border-indigo-600 text-indigo-600 rounded-xl font-bold hover:bg-indigo-600 hover:text-white transition-all duration-300 flex items-center justify-center">
                                Book Now <ArrowRight className="ml-2 h-4 w-4" />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExpertServicesSection;
