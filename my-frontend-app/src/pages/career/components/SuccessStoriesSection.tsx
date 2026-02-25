import { Quote, MapPin, DollarSign, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';


import { successStories } from '../../../data/careerData';

const SuccessStoriesSection: React.FC = () => {
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
                        Success Stories
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Real people, real results. See how our guidance has transformed careers.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {successStories.map((story, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 relative group"
                        >
                            <div className="absolute top-6 right-8 text-blue-200 group-hover:text-blue-300 transition-colors">
                                <Quote className="h-12 w-12 transform rotate-180" />
                            </div>

                            <div className="flex items-center space-x-4 mb-6">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-md">
                                    {story.image}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{story.name}</h3>
                                    <p className="text-blue-600 text-sm font-medium">{story.role}</p>
                                </div>
                            </div>

                            <div className="flex text-yellow-500 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-current" />
                                ))}
                            </div>

                            <p className="text-gray-600 mb-6 italic leading-relaxed">
                                "{story.content}"
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-200 text-sm text-gray-500">
                                <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    {story.location}
                                </div>
                                <div className="flex items-center text-green-600 font-medium">
                                    <DollarSign className="h-4 w-4 mr-1" />
                                    {story.salary}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SuccessStoriesSection;
