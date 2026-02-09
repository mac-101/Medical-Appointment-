import React from "react";
import Hero from "./Hero";
import Navbar from "./Navbar";
import Testimonials from "./Testimonials";
import Contact from "./Contact";
import HowItWorks from "./HowItWorks";
import Blog from "./Blog";
import Footer from "./Footer";

LandingPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Blog />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
};
export default LandingPage;
