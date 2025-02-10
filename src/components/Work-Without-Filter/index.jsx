/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import initIsotope from "../../common/initIsotope";
import { workData } from "@/src/data/works";

const WorkWithoutFilter = ({ vis }) => {
  React.useEffect(() => {
    setTimeout(() => {
      if (window.Isotope) initIsotope();
    }, 1000);
  }, []);

  return (
    <>
      <section className="works section-padding">
        <div className="container">
          <div className="row gallery">
            <div className="col-md-6 items mt-0">
              <div className="main-header mb-0">
                <h3>Works.</h3>
              </div>
            </div>
            {workData.slice(0, 5).map((work, index) => (
              <div className="col-md-6 items" key={index}>
                <div className="item">
                  <div className="img">
                    <img src={work.img} alt={work.title} />
                  </div>
                  <div className={`cont ${vis ? "vis" : ""}`}>
                    {work.category.map((cat, i) => (
                      <span key={i}>{cat}</span>
                    ))}
                    <h5>
                      <Link href={work.link}>{work.title}</Link>
                    </h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default WorkWithoutFilter;
