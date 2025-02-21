import React from "react";
import Link from "next/link";
import LoadingScreen from "../Loading-Screen/loading-screen";

const ProjectIntro = ({ selectedWork }) => {
  if (!selectedWork) {
    return <LoadingScreen />;
  }

  return (
    <section className="intro-section section-padding">
      <div className="container">
        <div className="row">
          {selectedWork.description && (
            <>
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
            </>
          )}

          {selectedWork.client && (
            <div className="col-lg-3">
              <div className="item mt-30">
                <h6>Client</h6>
                <p>
                  <Link href="#">{selectedWork.client}</Link>
                </p>
              </div>
            </div>
          )}

          {selectedWork.category.length > 0 && (
            <div className="col-lg-3">
              <div className="item mt-30">
                <h6>Categories</h6>
                <p>
                  {selectedWork.category.map((cat, index) => (
                    <React.Fragment key={index}>
                      <Link href="#">{cat}</Link>
                      {index < selectedWork.category.length - 1 ? ", " : ""}
                    </React.Fragment>
                  ))}
                </p>
              </div>
            </div>
          )}

          {selectedWork.tags && (
            <div className="col-lg-3">
              <div className="item mt-30">
                <h6>Tags</h6>
                <p>
                  <Link href="#">{selectedWork.tags}</Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectIntro;
