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
          first: "Digital Management is a visual art,",
          second: "and the solutions speak for themeselves.",
        }}
        // title = "text",
        content="With the proper strategic orientation that is guided by our clients’ vision, we combine our supreme digital expertise with our ability to come up with out-of-the box solutions to produce genuine, lasting results."
      />
      <WorkThreeColumn />
    </MainLayout>
  );
};

export default Work2;
