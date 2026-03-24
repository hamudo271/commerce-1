
import ContactHero from './ContactHero';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <ContactHero />
        <ContactForm />
        <ContactInfo />
      </main>
      <Footer />
    </>
  );
}
