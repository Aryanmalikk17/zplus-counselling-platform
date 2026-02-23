import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomeCTASection: React.FC = () => {
    return (
        <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />

            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl lg:text-5xl font-bold mb-8">
                        Start Your Journey of Self-Discovery
                    </h2>
                    <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Take the first step towards understanding yourself better and achieving your full potential.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="btn-secondary bg-white text-indigo-600 hover:bg-gray-50 px-8 py-4 text-lg shadow-lg">
                            Get Started for Free
                        </button>
                        <Link
                            to="/contact"
                            className="btn-primary border-2 border-white bg-transparent hover:bg-white/10 px-8 py-4 text-lg flex items-center justify-center"
                        >
                            Contact Support
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HomeCTASection;
