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
              <Link href={`/work2/${work.id}`} key={index} passHref>
                <div className="col-md-6 items">
                  <div className="item">
                    <div className="img">
                      <img src={work.img} alt={work.title} />
                    </div>
                    <div className={`cont ${vis ? "vis" : ""}`}>
                      {work.category.map((cat, i) => (
                        <span key={i}>{cat}</span>
                      ))}
                      <h5>{work.title}</h5>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="buttonContainer">
            <Link href="/work2" passHref>
              <button className="seeMoreButton">See More</button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default WorkWithoutFilter;
