'use client';
import Navbar from "./components/user_components/navbar";
import Map from "./components/user_components/map";
import Footer from "./components/user_components/footer";
import Mobile_Dock from "./components/user_components/mobile_dock";
import Place_Section from "./sections/place_section";

export default function Home() {
  return (
   <>
  
   <Navbar />
    <Map />
    <Place_Section />
   <Footer />
   <Mobile_Dock />  
   </>
  );
}
