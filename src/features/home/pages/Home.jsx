import React from "react";
import Hero from "../componats/hero/Hero";
import Categories from "../componats/Categories/Categories";
import WhyIdea from "../componats/whyIdea/WhyIdea";
import About from "../componats/about/About";
import SectionGame from "../componats/SectionGame/SectionGame";

const Home = () => {
  return (
    <>
      <Hero />
      <Categories />
      <WhyIdea />
      <About />
      <SectionGame />
    </>
  );
};

export default Home;
