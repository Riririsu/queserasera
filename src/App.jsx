import { Header, PhoneBar, Footer } from './components/Chrome.jsx';
import { Hero, About, Shinagaki, HowTo, Store, Closing } from './components/Sections.jsx';

export default function App() {
  return (
    <>
      <a className="skip" href="#main">本文へスキップ</a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Shinagaki />
        <HowTo />
        <Store />
        <Closing />
      </main>
      <Footer />
      <PhoneBar />
    </>
  );
}
