import React from 'react';
import HeroSection from './sections/hero-section';
import FeaturesSection from './sections/features-section';
import Header from './components/header';
import Footer from './components/footer';

const Page = () => {
  return (
    <main>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </main>
  );
};

export default Page;

