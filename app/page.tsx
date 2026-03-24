import HeroCarousel from './components/HeroCarousel';
import FeaturedCollections from './components/FeaturedCollections';
import LookbookSection from './components/LookbookSection';
import ProductShowcase from './components/ProductShowcase';
import CustomerReviews from './components/CustomerReviews';
import FeatureBanner from './components/FeatureBanner';
import NewsletterSection from './components/NewsletterSection';
import SaleCountdownBar from './components/SaleCountdownBar';

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <SaleCountdownBar />
      <HeroCarousel />
      <FeaturedCollections />
      <LookbookSection />
      <ProductShowcase />
      <FeatureBanner />
      <CustomerReviews />
      <NewsletterSection />
    </main>
  );
}
