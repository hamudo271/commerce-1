
import SunglassesHero from './SunglassesHero';
import SunglassesGrid from './SunglassesGrid';
import SunglassesBrands from './SunglassesBrands';
import Footer from '../components/Footer';

export default function SunglassesPage() {
  return (
    <div className="bg-white">
      <SunglassesHero />
      <SunglassesGrid />
      <SunglassesBrands />
      <Footer />
    </div>
  );
}