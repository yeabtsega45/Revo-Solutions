import React from "react";
import MainLayout from "../layouts/main";
import WorkWithoutFilter from "../components/Work-Without-Filter";
import IntroWithVertical2 from "../components/Intro-with-vertical2";
import AboutUs5 from "../components/About-Us5";
import Process2 from "../components/Process2";
import LightLayout from "../layouts/light";
// import Services5 from "../components/Services5";
import { useTheme } from "../contexts/ThemeContext";

const Home = () => {
  React.useEffect(() => {
    document.querySelector("body").classList.add("index3", "index4");
  });

  const { isDarkMode } = useTheme();

  const Layout = isDarkMode ? MainLayout : LightLayout;

  return (
    <Layout>
      <IntroWithVertical2 />
      <AboutUs5 />
      {/* <Services5 /> */}
      <Process2 />
      <WorkWithoutFilter />
    </Layout>
  );
};

export default Home;
