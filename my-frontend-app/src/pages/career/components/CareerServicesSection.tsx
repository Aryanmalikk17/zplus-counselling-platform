import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { careerServices } from '../../../data/careerData';

const CareerServicesSection: React.FC = () => {
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
                        Comprehensive Career Services
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Everything you need to successfully navigate your career journey, from discovery to placement.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {careerServices.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="flex items-start space-x-6 group p-6 rounded-2xl hover:bg-gray-50 transition-colors duration-300"
                        >
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:rotate-3">
                                    <service.icon className="h-8 w-8 text-white" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                                <p className="text-gray-600 mb-4">{service.description}</p>

                                <div className="grid grid-cols-2 gap-2 mb-4">
                                    {service.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center text-sm text-gray-500">
                                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between mt-4">
                                    {service.price ? (
                                        <span className="text-lg font-bold text-blue-600">{service.price}</span>
                                    ) : (
                                        <span className="text-lg font-bold text-green-600">Free Initial Session</span>
                                    )}
                                    {service.link && (
                                        <Link to={service.link} className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                                            Learn More <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CareerServicesSection;
