import React from "react";

const PlaceholderImage = ({ image, onClick }) => {
  return (
    <section>
      <div className="container-fluid">
        <div
          className="video-wrapper section-padding bg-img bg-center parallaxie valign"
          style={{
            backgroundImage: `url(${
              !image ? "/assets/img/portfolio/project1/vid.jpg" : image
            })`,
          }}
          onClick={onClick}
        ></div>
      </div>
    </section>
  );
};

export default PlaceholderImage;
