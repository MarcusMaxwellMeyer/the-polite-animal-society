import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import ShopCategories from './components/ShopCategories';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const bgUrl = `${import.meta.env.BASE_URL}bg-meadow.png`;

  return (
    <>
      {/* Faded background image */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage: `url('${bgUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          opacity: 0.05,
        }}
      />
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, #FFF8F0 0%, transparent 15%, transparent 85%, #FFF8F0 100%)',
        }}
      />

      <Navbar />
      <main>
        <Hero />
        <Gallery />
        <ShopCategories />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
