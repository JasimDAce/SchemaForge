import { BackgroundBeamsWithCollisionDemo } from "@/components/BackgroundBeamsWithCollision";
import { BackgroundGradientDemo } from "@/components/BackgroundGradient";
import Footer from "@/components/Footer";
import Headline from "@/components/Headline";
import { HeroParallaxDemo } from "@/components/Hero";
import { Movingborder } from "@/components/Movingborder";
import Name from "@/components/Name";
import Navbar  from "@/components/Navbar";




export default function Home() {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen max-w-screen overflow-hidden  bg-black flex justify-center items-center flex-col gap-10 pt-14">
      <Name/>
      <Headline/>
      <Movingborder/>
      <HeroParallaxDemo/>
    </div>
    <div className="bg-gray-900 flex flex-row justify-center items-end h-screen">
      
      <BackgroundGradientDemo/>
    </div>
      <BackgroundBeamsWithCollisionDemo/>
 
    </>
    
  );
}
