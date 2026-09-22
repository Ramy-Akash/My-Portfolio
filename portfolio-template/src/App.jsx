import { SiteProvider } from "./SiteContext.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Services from "./components/Services.jsx";
import PortfolioGrid from "./components/PortfolioGrid.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Contact from "./components/Contact.jsx";

export default function App() {
  return (
    <SiteProvider>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <PortfolioGrid />
        <Testimonials />
      </main>
      <Contact />
    </SiteProvider>
  );
}
