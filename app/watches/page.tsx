
import WatchesHero from './WatchesHero';
import WatchesGrid from './WatchesGrid';
import WatchesBrands from './WatchesBrands';
import Footer from '../components/Footer';

export default function WatchesPage() {
  return (
    <div className="min-h-screen bg-white">
      <WatchesHero />
      <WatchesGrid />
      <WatchesBrands />
      <Footer />
    </div>
  );
}
