import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';


import { testimonials } from '../../../data/homeData';

const TestimonialsSection: React.FC = () => {
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
                        Trusted by Thousands
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Read what our users have to say about their experience with ZPlus Counselling.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-indigo-50 rounded-2xl p-8 relative"
                        >
                            <Quote className="h-10 w-10 text-indigo-200 mb-6" />
                            <p className="text-gray-700 font-medium mb-6 leading-relaxed">
                                "{testimonial.content}"
                            </p>

                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm mr-4">
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                                    <p className="text-indigo-600 text-sm">{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
