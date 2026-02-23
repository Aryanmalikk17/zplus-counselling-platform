import React, { Suspense } from 'react';
import Loading from '../../components/common/Loading';

// Eager load Hero
import HomeHero from './components/HomeHero';

// Lazy load other sections
const PlatformStats = React.lazy(() => import('./components/PlatformStats'));
const ComprehensiveFeatures = React.lazy(() => import('./components/ComprehensiveFeatures'));
const PopularTestsSection = React.lazy(() => import('./components/PopularTestsSection'));
const SuccessMetricsSection = React.lazy(() => import('./components/SuccessMetricsSection'));
const ExpertServicesSection = React.lazy(() => import('./components/ExpertServicesSection'));
const GeneralFeaturesSection = React.lazy(() => import('./components/GeneralFeaturesSection'));
const TestimonialsSection = React.lazy(() => import('./components/TestimonialsSection'));
const HomeCTASection = React.lazy(() => import('./components/HomeCTASection'));

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <HomeHero />

      <Suspense fallback={<div className="h-64 flex items-center justify-center"><Loading /></div>}>
        <PlatformStats />
        <ComprehensiveFeatures />
        <PopularTestsSection />
        <SuccessMetricsSection />
        <ExpertServicesSection />
        <GeneralFeaturesSection />
        <TestimonialsSection />
        <HomeCTASection />
      </Suspense>
    </div>
  );
};

export default HomePage;