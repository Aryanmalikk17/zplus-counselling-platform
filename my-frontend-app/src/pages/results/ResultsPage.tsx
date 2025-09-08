import React from 'react';
import { motion } from 'framer-motion';
import { Award, Share, Download, ArrowLeft, BarChart3 } from 'lucide-react';

const ResultsPage: React.FC = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Test Results
            </h1>
            <p className="text-xl text-gray-600">
              Your personality insights and detailed analysis
            </p>
          </div>

          {/* Results Coming Soon Card */}
          <div className="card text-center max-w-2xl mx-auto">
            <div className="mb-8">
              <div className="mx-auto w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                <BarChart3 className="h-10 w-10 text-primary-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Results Dashboard Coming Soon!
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                We're building a comprehensive results dashboard that will show your personality 
                insights, detailed analysis, and personalized recommendations.
              </p>
              
              <div className="bg-primary-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Your results will include:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Award className="h-4 w-4 text-primary-500 mr-2" />
                    Detailed personality type
                  </div>
                  <div className="flex items-center">
                    <BarChart3 className="h-4 w-4 text-primary-500 mr-2" />
                    Visual charts & graphs
                  </div>
                  <div className="flex items-center">
                    <Share className="h-4 w-4 text-primary-500 mr-2" />
                    Shareable reports
                  </div>
                  <div className="flex items-center">
                    <Download className="h-4 w-4 text-primary-500 mr-2" />
                    PDF downloads
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.history.back()}
                className="btn-secondary"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </button>
              <button className="btn-primary" disabled>
                Results Coming Soon
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultsPage;