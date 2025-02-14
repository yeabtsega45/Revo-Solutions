/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import MainLayout from "../../layouts/main";
import PageHeader from "../../components/Page-header";
import ProjectIntro from "../../components/Project-Intro";
import NextProject from "../../components/Next-Project";
// import ProjectVideo from "../../components/Project-Video";
import { useRouter } from "next/router";
import { works } from "@/src/data/works";
import PlaceholderImage from "../../components/Project-Video/placeholderImage";
import LoadingScreen from "@/src/components/Loading-Screen/loading-screen";

const SingleWork = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    document.querySelector("body").classList.add("index3");
  }, []);

  const selectedWork = works.find((work) => work.id.toString() === id);

  if (!selectedWork) {
    return <LoadingScreen />;
  }

  return (
    <MainLayout>
      <PageHeader
        title={selectedWork.title}
        fullPath={[
          { id: 1, name: "home", url: "/" },
          { id: 2, name: "work", url: "/work2" },
          { id: 3, name: "project details", url: "/work/" + selectedWork.id },
        ]}
        image={selectedWork.introImage}
      />
      <ProjectIntro selectedWork={selectedWork} />

      <PlaceholderImage image={selectedWork.largeImages[0].src} />

      <section className="projdtal">
        <div className="justified-gallery">
          <div className="row">
            <a href="#" className="col-lg-4 col-xl-3 col-md-12">
              <img alt="" src="/assets/img/portfolio/project1/1.jpg" />
            </a>
            <a href="#" className="col-lg-4 col-xl-3 col-md-6">
              <img alt="" src="/assets/img/portfolio/project1/2.jpg" />
            </a>
            <a href="#" className="col-lg-4 col-xl-3 col-md-6">
              <img alt="" src="/assets/img/portfolio/project1/6.jpg" />
            </a>
            <a href="#" className="col-lg-4 col-xl-3 col-md-12">
              <img alt="" src="/assets/img/portfolio/project1/3.jpg" />
            </a>
          </div>
        </div>
      </section>

      {/* <ProjectVideo /> */}
      <PlaceholderImage image={selectedWork.largeImages[1].src} />

      <section className="projdtal">
        <div className="justified-gallery">
          <a href="#" className="col-lg-4 col-xl-3 col-md-6">
            <img alt="" src="/assets/img/portfolio/project1/8.jpg" />
          </a>
          <a href="#" className="col-lg-4 col-xl-3 col-md-6">
            <img alt="" src="/assets/img/portfolio/project1/9.jpg" />
          </a>
        </div>
      </section>

      <NextProject selectedWork={selectedWork} />
    </MainLayout>
  );
};

export default SingleWork;
