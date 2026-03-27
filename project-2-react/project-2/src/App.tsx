import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Nutrition from "./components/Nutrition";
import Programs from "./components/Programs";
import Results from "./components/Result";

export default function App() {
  return (
    <div className="font-sans">
      <Navbar />
      <Hero />
      <Programs />
      <Nutrition />
      <Results />
      <Contact />
      <Footer />
    </div>
  );
}
