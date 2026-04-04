import Content from "./components/content/Content";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Hero from "./components/hero/page";
export const navItems = [
  { name: "მთავარი", href: "/" },
  {
    name: "ჩვენ შესახებ",
    href: "https://www.tiktok.com/@dopamine.energy/video/7624523299577449749",
  },
  {
    name: "კონტაქტი",
    href: "https://www.instagram.com/dopamine.energy?igsh=MWY5aXhnZXphaHFkMg==",
  },
];
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
