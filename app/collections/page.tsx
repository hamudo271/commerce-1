import CollectionsHero from './CollectionsHero';
import CollectionsGrid from './CollectionsGrid';
import Footer from '../components/Footer';

export default function CollectionsPage() {
  return (
    <main className="min-h-screen">
      <CollectionsHero />
      <CollectionsGrid />
      <Footer />
    </main>
  );
}