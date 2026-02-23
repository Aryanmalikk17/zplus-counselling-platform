import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare } from 'lucide-react';
import { expertCounselors } from '../../../data/careerData';

const ExpertCounselorsSection: React.FC = () => {
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
                        Meet Our Experts
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Get guidance from industry veterans with proven track records.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {expertCounselors.map((counselor, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative"
                        >
                            <div className="absolute inset-0 bg-blue-600 rounded-2xl transform rotate-2 group-hover:rotate-1 transition-transform opacity-10" />
                            <div className="bg-white border border-gray-100 rounded-2xl p-6 relative shadow-lg group-hover:shadow-xl transition-all">
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-4xl">
                                        {counselor.image}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">{counselor.name}</h3>
                                        <div className="flex items-center text-yellow-500 text-sm font-medium">
                                            <Star className="h-4 w-4 fill-current mr-1" />
                                            {counselor.rating} ({counselor.sessions}+ sessions)
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Specialization</p>
                                        <p className="font-medium text-gray-900">{counselor.specialization}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Experience</p>
                                        <p className="font-medium text-gray-900">{counselor.experience}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Languages</p>
                                        <div className="flex flex-wrap gap-2">
                                            {counselor.languages.map((lang, idx) => (
                                                <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                                    {lang}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full btn-secondary flex items-center justify-center">
                                    <MessageSquare className="h-4 w-4 mr-2" />
                                    Book Session
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExpertCounselorsSection;
