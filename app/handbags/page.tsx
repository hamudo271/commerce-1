
import HandbagsHero from './HandbagsHero';
import HandbagsGrid from './HandbagsGrid';
import HandbagsBrands from './HandbagsBrands';
import Footer from '../components/Footer';

export default function HandbagsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HandbagsHero />
      <HandbagsGrid />
      <HandbagsBrands />
      <Footer />
    </div>
  );
}
