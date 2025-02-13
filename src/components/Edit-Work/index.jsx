/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import initIsotope from "../../common/initIsotope";
import { works } from "@/src/data/works";

const EditWork = () => {
  React.useEffect(() => {
    setTimeout(() => {
      if (window.Isotope) initIsotope();
    }, 1000);
  }, []);
  return (
    <>
      <section className="works filter-img three-col section-padding">
        <div className="container">
          <div className="row gallery">
            {works.map((work, index) => (
              <Link href={`/admin/${work.id}`} key={index} passHref>
                <div className={`col-lg-4 col-md-6 items ${work.category}`}>
                  <div className="item">
                    <div className="img">
                      <img src={work.imgSrc} alt={work.title} />
                    </div>
                    <div className="cont">
                      <h5>{work.title}</h5>
                      {work.tags.map((tag, index) => (
                        <span key={index}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default EditWork;
