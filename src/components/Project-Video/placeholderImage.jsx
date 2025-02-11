import React from "react";

const PlaceholderImage = () => {
  return (
    <section>
      <div className="container-fluid">
        <div
          className="video-wrapper section-padding bg-img parallaxie valign"
          style={{
            backgroundImage: "url(/assets/img/portfolio/project1/vid.jpg)",
          }}
          data-overlay-dark="4"
        ></div>
      </div>
    </section>
  );
};

export default PlaceholderImage;
