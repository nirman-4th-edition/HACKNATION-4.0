import About from "../About/About";
import Features from "../Features/Features";
import Footer from "../Footer/Footer";
import Carousel from "../Carousel/Carousel";
import Sponsors from "../Sponsors/Sponsors";

export default function LandingPage() {
  return (
    <>
      <Carousel />
      <About />
      <Features />
      <Sponsors />
      <Footer />
    </>
  );
}
