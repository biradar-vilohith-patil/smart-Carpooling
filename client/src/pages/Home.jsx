import About from "@/sections/About"
import Features from "@/sections/Features"
import Hero from "@/sections/Hero"
import Testimonial from "@/sections/Testimonial"
import {Phonecall} from 'lucide-react';

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <About />
      <Testimonial />
      <a 
        href="tel:100" 
        className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg z-50"
        title="Emergency SOS"
      >
        <PhoneCall />
      </a>
     
    </>
  )
}

export default Home
