import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';


import { Link } from 'react-router-dom';

const HomeCTASection: React.FC = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-accent-500 to-accent-600 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-elevated-medium"
                >
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white mix-blend-overlay filter blur-[100px] opacity-30 rounded-full transform translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-900 mix-blend-multiply filter blur-[100px] opacity-30 rounded-full transform -translate-x-1/2 translate-y-1/2 pointer-events-none" />

                    <h2 className="text-4xl lg:text-5xl font-extrabold mb-8 text-white tracking-tight relative z-10">
                        Start Your Journey of Self-Discovery
                    </h2>
                    <p className="text-xl text-accent-50 mb-10 max-w-2xl mx-auto leading-relaxed relative z-10 font-medium">
                        Take the first step towards understanding yourself better and achieving your full potential.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                        <button className="btn-secondary bg-white text-accent-700 border-transparent hover:bg-gray-50 hover:text-accent-800 px-8 py-4 text-lg shadow-lg hover:shadow-xl group">
                            Get Started for Free
                        </button>
                        <Link
                            to="/contact"
                            className="bg-white/10 text-white font-semibold px-8 py-4 rounded-full border border-white/30 hover:bg-white/20 hover:border-white/50 text-lg flex items-center justify-center transition-all duration-300 backdrop-blur-sm group"
                        >
                            Contact Support
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HomeCTASection;
