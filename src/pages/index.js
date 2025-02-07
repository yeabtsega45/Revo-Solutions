import React from "react";
import MainLayout from "../layouts/main";
import WorkWithoutFilter from "../components/Work-Without-Filter";
import IntroWithVertical2 from "../components/Intro-with-vertical2";
import AboutUs5 from "../components/About-Us5";
import Services5 from "../components/Services5";

const Home = () => {
  React.useEffect(() => {
    document.querySelector("body").classList.add("index3", "index4");
  });
  return (
    <MainLayout>
      <IntroWithVertical2 />
      <AboutUs5 />
      <Services5 />
      <WorkWithoutFilter />
    </MainLayout>
  );
};

export default Home;
