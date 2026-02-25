import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';



interface CTASectionProps {
    onStartAssessment: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onStartAssessment }) => {
    return (
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
            <div className="max-w-4xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                        Ready to Shape Your Future?
                    </h2>
                    <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                        Join over 50,000 students and professionals who have found their path with ZPlus Counselling.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={onStartAssessment}
                            className="btn-secondary bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 text-lg"
                        >
                            Start Free Selection
                        </button>
                        <button className="btn-primary border-2 border-white bg-transparent hover:bg-white/10 px-8 py-4 text-lg">
                            Talk to Counselor
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTASection;
