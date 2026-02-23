import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Star } from 'lucide-react';
import { cognitiveTests } from '../../../data/psychologyData';

interface PsychologyTestListProps {
    onSelectTest: (testId: string) => void;
    selectedCategory: string;
}

const PsychologyTestList: React.FC<PsychologyTestListProps> = ({ onSelectTest, selectedCategory }) => {
    const filteredTests = selectedCategory === 'All'
        ? cognitiveTests
        : cognitiveTests.filter(test => test.category === selectedCategory);

    const getColorClasses = (color: string) => {
        const colors = {
            purple: 'bg-purple-100 text-purple-600',
            blue: 'bg-blue-100 text-blue-600',
            green: 'bg-green-100 text-green-600',
            yellow: 'bg-yellow-100 text-yellow-600',
            pink: 'bg-pink-100 text-pink-600',
            orange: 'bg-orange-100 text-orange-600',
            indigo: 'bg-indigo-100 text-indigo-600',
            teal: 'bg-teal-100 text-teal-600',
            cyan: 'bg-cyan-100 text-cyan-600',
            rose: 'bg-rose-100 text-rose-600',
            amber: 'bg-amber-100 text-amber-600'
        };
        return colors[color as keyof typeof colors] || colors.blue;
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map((test, index) => (
                <motion.div
                    key={test.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
                >
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${getColorClasses(test.color)} transition-transform group-hover:scale-110 duration-300`}>
                                <test.icon className="h-6 w-6" />
                            </div>
                            {test.popular && (
                                <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-2 py-1 rounded-full flex items-center">
                                    <Star className="w-3 h-3 mr-1 fill-current" />
                                    Popular
                                </span>
                            )}
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {test.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {test.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {test.areas.slice(0, 3).map((area, idx) => (
                                <span key={idx} className="text-xs bg-gray-50 text-gray-500 px-2 py-1 rounded-md border border-gray-100">
                                    {area}
                                </span>
                            ))}
                            {test.areas.length > 3 && (
                                <span className="text-xs bg-gray-50 text-gray-500 px-2 py-1 rounded-md border border-gray-100">
                                    +{test.areas.length - 3}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-50">
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1.5" />
                                {test.duration}
                            </div>
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${test.difficulty === 'Beginner' ? 'bg-green-50 text-green-600' :
                                    test.difficulty === 'Intermediate' ? 'bg-yellow-50 text-yellow-600' :
                                        'bg-red-50 text-red-600'
                                }`}>
                                {test.difficulty}
                            </span>
                        </div>
                    </div>

                    <div className="bg-gray-50 px-6 py-3 flex justify-between items-center group-hover:bg-blue-50 transition-colors">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            {test.type}
                        </span>
                        <button
                            onClick={() => onSelectTest(test.id)}
                            className="text-blue-600 font-medium text-sm flex items-center hover:text-blue-700 transition-colors"
                        >
                            Start Test <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default PsychologyTestList;
