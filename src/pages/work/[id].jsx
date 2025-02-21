/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import MainLayout from "../../layouts/main";
import PageHeader from "../../components/Page-header";
import ProjectIntro from "../../components/Project-Intro";
// import ProjectVideo from "../../components/Project-Video";
import { useRouter } from "next/router";
import { works } from "@/src/data/works";
import PlaceholderImage from "../../components/Project-Video/placeholderImage";
import LoadingScreen from "@/src/components/Loading-Screen/loading-screen";
import NextWork from "@/src/components/Next-Work";

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
      {selectedWork.client && (
        <PageHeader
          title={selectedWork.client}
          fullPath={[
            { id: 1, name: "home", url: "/" },
            { id: 2, name: "work", url: "/work2" },
            { id: 3, name: "work details", url: "/work/" + selectedWork.id },
          ]}
          image={selectedWork.introImage}
        />
      )}

      <ProjectIntro selectedWork={selectedWork} />

      {selectedWork.largeImages?.length >= 1 && (
        <PlaceholderImage image={selectedWork.largeImages[0].src} />
      )}

      {selectedWork.smallImages?.length >= 4 && (
        <section className="projdtal">
          <div className="justified-gallery">
            <a href="#" className="col-md-6">
              <img alt="" src={selectedWork.smallImages[0].src} />
            </a>
            <a href="#" className="col-md-6">
              <img alt="" src={selectedWork.smallImages[1].src} />
            </a>
          </div>
          <div className="justified-gallery">
            <a href="#" className="col-md-6">
              <img alt="" src={selectedWork.smallImages[2].src} />
            </a>
            <a href="#" className="col-md-6">
              <img alt="" src={selectedWork.smallImages[3].src} />
            </a>
          </div>
        </section>
      )}

      {/* <ProjectVideo /> */}

      {selectedWork.largeImages?.length >= 2 && (
        <PlaceholderImage image={selectedWork.largeImages[1].src} />
      )}

      {selectedWork.smallImages?.length >= 8 && (
        <section className="projdtal">
          <div className="justified-gallery">
            <a href="#" className="col-md-6">
              <img alt="" src={selectedWork.smallImages[4].src} />
            </a>
            <a href="#" className="col-md-6">
              <img alt="" src={selectedWork.smallImages[5].src} />
            </a>
          </div>
          <div className="justified-gallery">
            <a href="#" className="col-md-6">
              <img alt="" src={selectedWork.smallImages[6].src} />
            </a>
            <a href="#" className="col-md-6">
              <img alt="" src={selectedWork.smallImages[7].src} />
            </a>
          </div>
        </section>
      )}

      <NextWork selectedWork={selectedWork} />
    </MainLayout>
  );
};

export default SingleWork;
