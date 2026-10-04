import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Kemuri from './components/Kemuri.jsx';
import SmokedSalt from './components/SmokedSalt.jsx';
import Menu from './components/Menu.jsx';
import TodaysMenu from './components/TodaysMenu.jsx';
import Order from './components/Order.jsx';
import FreshGrilled from './components/FreshGrilled.jsx';
import Access from './components/Access.jsx';
import Faq from './components/Faq.jsx';
import InstagramSection from './components/InstagramSection.jsx';
import Contact from './components/Contact.jsx';
import StickyCta from './components/StickyCta.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <a className="skip" href="#main">本文へスキップ</a>
      <Header />
      <main id="main">
        <Hero />
        <Kemuri />
        <SmokedSalt />
        <Menu />
        <TodaysMenu />
        <Order />
        <FreshGrilled />
        <Access />
        <Faq />
        <InstagramSection />
        <Contact />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
