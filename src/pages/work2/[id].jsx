/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import MainLayout from "../../layouts/main";
import PageHeader from "../../components/Page-header";
import ProjectIntro from "../../components/Project-Intro";
import NextProject from "../../components/Next-Project";
// import ProjectVideo from "../../components/Project-Video";
import { useRouter } from "next/router";
import { workData } from "@/src/data/works";
import PlaceholderImage from "../../components/Project-Video/placeholderImage";
import LoadingScreen from "@/src/components/Loading-Screen/loading-screen";

const ProjectDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    document.querySelector("body").classList.add("index3");
  }, []);

  const selectedWork = workData.find((work) => work.id.toString() === id);

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
          { id: 3, name: "project details", url: "/work2/" + selectedWork.id },
        ]}
        image="/assets/img/portfolio/project1/bg.jpg"
      />
      <ProjectIntro selectedWork={selectedWork} />
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
      <PlaceholderImage />

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

export default ProjectDetails;
