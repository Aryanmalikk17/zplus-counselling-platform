import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import Loading from '../../components/common/Loading';

// Eager load Hero to prevent LCP delay
import HeroSection from './components/HeroSection';

// Lazy load other sections
const CareerServicesSection = React.lazy(() => import('./components/CareerServicesSection'));
const PopularCareerPathsSection = React.lazy(() => import('./components/PopularCareerPathsSection'));
const SuccessStoriesSection = React.lazy(() => import('./components/SuccessStoriesSection'));
const JobMarketTrendsSection = React.lazy(() => import('./components/JobMarketTrendsSection'));
const IndustrySalaryInsightsSection = React.lazy(() => import('./components/IndustrySalaryInsightsSection'));
const CareerToolsSection = React.lazy(() => import('./components/CareerToolsSection'));
const ExpertCounselorsSection = React.lazy(() => import('./components/ExpertCounselorsSection'));
const CTASection = React.lazy(() => import('./components/CTASection'));
const QuickAssessmentModal = React.lazy(() => import('./components/QuickAssessmentModal'));

const CareerPage: React.FC = () => {
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <HeroSection onStartAssessment={() => setIsAssessmentOpen(true)} />

      <Suspense fallback={<div className="h-96 flex items-center justify-center"><Loading /></div>}>
        <CareerServicesSection />
        <PopularCareerPathsSection />
        <SuccessStoriesSection />
        <JobMarketTrendsSection />
        <IndustrySalaryInsightsSection />
        <CareerToolsSection />
        <ExpertCounselorsSection />
        <CTASection onStartAssessment={() => setIsAssessmentOpen(true)} />
      </Suspense>

      <Suspense fallback={null}>
        <QuickAssessmentModal
          isOpen={isAssessmentOpen}
          onClose={() => setIsAssessmentOpen(false)}
        />
      </Suspense>
    </div>
  );
};

export default CareerPage;