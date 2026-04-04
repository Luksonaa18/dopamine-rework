import Content from "./components/content/Content";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Hero from "./components/hero/page";

export default function Home() {
  return (
    <>
      <Header />
      <Hero/>
      <Content />
      <Footer />
    </>
  );
}
