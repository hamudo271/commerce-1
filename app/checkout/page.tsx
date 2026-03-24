
import CheckoutHero from './CheckoutHero';
import CheckoutForm from './CheckoutForm';
import Footer from '../components/Footer';

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-white">
      <CheckoutHero />
      <CheckoutForm />
      <Footer />
    </div>
  );
}
