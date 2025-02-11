import React from "react";
import Link from "next/link";

const ProjectIntro = ({ selectedWork }) => {
  if (!selectedWork) {
    return <p>Loading...</p>;
  }

  return (
    <section className="intro-section section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-4">
            <div className="htit">
              <h4>introduction</h4>
            </div>
          </div>
          <div className="col-lg-8 offset-lg-1 col-md-8 mb-30">
            <div className="text">
              <p>{selectedWork.description}</p>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="item mt-30">
              <h6>Client</h6>
              <p>
                <Link href="#">{selectedWork.client}</Link>
              </p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="item mt-30">
              <h6>Date</h6>
              <p>{selectedWork.date}</p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="item mt-30">
              <h6>Categories</h6>
              <p>
                {selectedWork.category.map((cat, index) => (
                  <React.Fragment key={index}>
                    <Link href="#">{cat}</Link>
                    {index < selectedWork.category.length - 1 && ", "}
                  </React.Fragment>
                ))}
              </p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="item mt-30">
              <h6>Tags</h6>
              <p>
                {selectedWork.tags.map((tag, index) => (
                  <React.Fragment key={index}>
                    <Link href="#">{tag}</Link>
                    {index < selectedWork.tags.length - 1 && ", "}
                  </React.Fragment>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectIntro;
