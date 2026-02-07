import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import ShopCategories from './components/ShopCategories';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <>
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
