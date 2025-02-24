/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/main";
import PageHeader from "../../components/Page-header";
import ProjectIntro from "../../components/Project-Intro";
// import ProjectVideo from "../../components/Project-Video";
import { useRouter } from "next/router";
import { works } from "@/src/data/works";
import PlaceholderImage from "../../components/Project-Video/placeholderImage";
import LoadingScreen from "@/src/components/Loading-Screen/loading-screen";
import NextWork from "@/src/components/Next-Work";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const SingleWork = () => {
  const router = useRouter();
  const { id } = router.query;

  // Full Screen States
  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    document.querySelector("body").classList.add("index3");
  }, []);

  const selectedWork = works.find((work) => work.id.toString() === id);

  // Combine all images into one array for the lightbox
  const allImages = [
    ...(selectedWork?.largeImages || []),
    ...(selectedWork?.smallImages || []),
  ].map((img) => ({ src: img.src }));

  // Full Screen function
  const openLightbox = (index) => {
    setPhotoIndex(index);
    setOpen(true);
  };

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
        <PlaceholderImage
          image={selectedWork.largeImages[0].src}
          onClick={() => openLightbox(0)}
        />
      )}

      {selectedWork.smallImages?.length >= 4 && (
        <section className="projdtal">
          <div className="justified-gallery">
            {selectedWork.smallImages.slice(0, 4).map((img, index) => (
              <a
                key={index}
                className="col-md-6"
                onClick={() => openLightbox(index + 2)} // +2 because of large images
              >
                <img alt="" src={img.src} />
              </a>
            ))}
          </div>
        </section>
      )}

      {/* <ProjectVideo /> */}

      {selectedWork.largeImages?.length >= 2 && (
        <PlaceholderImage
          image={selectedWork.largeImages[1].src}
          onClick={() => openLightbox(1)}
        />
      )}

      {selectedWork.smallImages?.length >= 8 && (
        <section className="projdtal">
          <div className="justified-gallery">
            {selectedWork.smallImages.slice(4, 8).map((img, index) => (
              <a
                key={index + 4}
                className="col-md-6"
                onClick={() => openLightbox(index + 6)} // +6 because of previous images
              >
                <img alt="" src={img.src} />
              </a>
            ))}
          </div>
        </section>
      )}

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={photoIndex}
        slides={allImages}
      />

      <NextWork selectedWork={selectedWork} />
    </MainLayout>
  );
};

export default SingleWork;
