import React from 'react';

import { ArrowRight } from 'lucide-react';
import { testDetails } from '../../../../data/educationData';

interface EducationTestListProps {
    onSelectTest: (testId: string) => void;
}

const EducationTestList: React.FC<EducationTestListProps> = ({ onSelectTest }) => {
    const getColorClasses = (color: string) => {
        const colors = {
            blue: 'bg-blue-100 text-blue-500 border-blue-200',
            green: 'bg-green-100 text-green-500 border-green-200',
            purple: 'bg-purple-100 text-purple-500 border-purple-200',
            red: 'bg-red-100 text-red-500 border-red-200',
            yellow: 'bg-yellow-100 text-yellow-500 border-yellow-200',
            pink: 'bg-pink-100 text-pink-500 border-pink-200',
            orange: 'bg-orange-100 text-orange-500 border-orange-200'
        };
        return colors[color as keyof typeof colors] || colors.blue;
    };

    const getDotColor = (color: string) => {
        const colors = {
            blue: 'bg-blue-400',
            green: 'bg-green-400',
            purple: 'bg-purple-400',
            red: 'bg-red-400',
            yellow: 'bg-yellow-400',
            pink: 'bg-pink-400',
            orange: 'bg-orange-400'
        };
        return colors[color as keyof typeof colors] || colors.blue;
    };

    const getIcon = (iconName: string) => {
        // Mapping string icon names if necessary, but here we can pass the component directly if data holds it
        // However, in extracted data, we might have stored connection to lucide icons. 
        // If data holds the component:
        return iconName;
    };

    // Since we extracted data, we need to ensure icons are handled correctly.
    // In `educationData.ts`, icons are imported from lucide-react. 
    // Let's assume standard import in data file.

    return (
        <>
            {/* Educational Levels */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Educational Levels</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testDetails.slice(0, 3).map((test, index) => (
                        <motion.div
                            key={test.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                        >
                            <div className="text-center mb-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${getColorClasses(test.color)}`}>
                                    <test.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">
                                    {test.name}
                                </h3>
                                <p className="text-gray-600 text-sm mb-2">
                                    {test.description}
                                </p>
                                <span className="text-xs text-blue-600 font-medium">{test.level}</span>
                            </div>

                            <div className="mb-4">
                                <div className="space-y-1">
                                    {test.areas.slice(0, 2).map((area) => (
                                        <div key={area} className="flex items-center text-gray-600 text-xs">
                                            <div className={`w-1 h-1 rounded-full mr-2 ${getDotColor(test.color)}`} />
                                            {area}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                                <span>⏱️ {test.duration}</span>
                                <span>📝 {test.questions}</span>
                            </div>

                            <button
                                onClick={() => onSelectTest(test.id)}
                                className="btn-primary w-full text-sm py-2 rounded-lg flex items-center justify-center"
                            >
                                Start Test
                                <ArrowRight className="ml-2 h-3 w-3" />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Academic Streams */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Academic Streams</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {testDetails.slice(3).map((test, index) => (
                        <motion.div
                            key={test.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                        >
                            <div className="text-center mb-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${getColorClasses(test.color)}`}>
                                    <test.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">
                                    {test.name}
                                </h3>
                                <p className="text-gray-600 text-sm mb-2">
                                    {test.description}
                                </p>
                                <span className="text-xs text-blue-600 font-medium">{test.level}</span>
                            </div>

                            <div className="mb-4">
                                <div className="space-y-1">
                                    {test.areas.slice(0, 2).map((area) => (
                                        <div key={area} className="flex items-center text-gray-600 text-xs">
                                            <div className={`w-1 h-1 rounded-full mr-2 ${getDotColor(test.color)}`} />
                                            {area}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                                <span>⏱️ {test.duration}</span>
                                <span>📝 {test.questions}</span>
                            </div>

                            <button
                                onClick={() => onSelectTest(test.id)}
                                className="btn-primary w-full text-sm py-2 rounded-lg flex items-center justify-center"
                            >
                                Start Test
                                <ArrowRight className="ml-2 h-3 w-3" />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default EducationTestList;
