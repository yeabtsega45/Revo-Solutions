/* eslint-disable @next/next/no-img-element */
import React from "react";
import MainLayout from "../../layouts/main";
import WorkHeader from "../../components/Work-header";
import WorkThreeColumn from "../../components/Work-Three-Column";

const Work2 = () => {
  React.useEffect(() => {
    document.querySelector("body").classList.add("index3");
  }, []);
  return (
    <MainLayout>
      <WorkHeader
        center
        title={{
          first: "Discover how we can help ",
          second: "your business thrive!",
        }}
        // title = "text",
        content="With expert in web development, branding, 360˚ Marketing, and video production, we
create tailored solutions that elevate your brand and drive results. Explore our work and
see how we can help you achieve your goals!"
      />
      <WorkThreeColumn />
    </MainLayout>
  );
};

export default Work2;
