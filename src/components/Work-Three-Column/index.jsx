/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import initIsotope from "../../common/initIsotope";

const WorkThreeColumn = () => {
  React.useEffect(() => {
    setTimeout(() => {
      if (window.Isotope) initIsotope();
    }, 1000);
  }, []);
  return (
    <>
      <section className="works filter-img three-col section-padding">
        <div className="container">
          <div className="filtering text-center mb-30">
            <div className="filter">
              <span data-filter="*" className="active">
                All
              </span>
              <span data-filter=".digital">Digital Marketing</span>
              <span data-filter=".branding">Branding</span>
              <span data-filter=".websites">Websites</span>
              <span data-filter=".ticket">Ticket System</span>
            </div>
          </div>
          <div className="row gallery">
            <div className="col-lg-4 col-md-6 items branding">
              <div className="item">
                <div className="img">
                  <img src="/assets/img/works/col/2.jpg" alt="" />
                </div>
                <div className="cont">
                  <h5>
                    <Link href="/project-details">Modern Townhouse</Link>
                  </h5>
                  <span>Architecture</span>
                  <span>Modern</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 items websites digital">
              <div className="item">
                <div className="img">
                  <img src="/assets/img/works/col/1.jpg" alt="" />
                </div>
                <div className="cont">
                  <h5>
                    <Link href="/project-details">Modern Townhouse</Link>
                  </h5>
                  <span>Architecture</span>
                  <span>Modern</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 items digital">
              <div className="item">
                <div className="img">
                  <img src="/assets/img/works/col/5.jpg" alt="" />
                </div>
                <div className="cont">
                  <h5>
                    <Link href="/project-details">Modern Townhouse</Link>
                  </h5>
                  <span>Architecture</span>
                  <span>Modern</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 items websites">
              <div className="item">
                <div className="img">
                  <img src="/assets/img/works/col/3.jpg" alt="" />
                </div>
                <div className="cont">
                  <h5>
                    <Link href="/project-details">Modern Townhouse</Link>
                  </h5>
                  <span>Architecture</span>
                  <span>Modern</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 items branding">
              <div className="item">
                <div className="img">
                  <img src="/assets/img/works/col/4.jpg" alt="" />
                </div>
                <div className="cont">
                  <h5>
                    <Link href="/project-details">Modern Townhouse</Link>
                  </h5>
                  <span>Architecture</span>
                  <span>Modern</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 items websites">
              <div className="item">
                <div className="img">
                  <img src="/assets/img/works/col/6.jpg" alt="" />
                </div>
                <div className="cont">
                  <h5>
                    <Link href="/project-details">Modern Townhouse</Link>
                  </h5>
                  <span>Architecture</span>
                  <span>Modern</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 items websites digital">
              <div className="item">
                <div className="img">
                  <img src="/assets/img/works/col/1.jpg" alt="" />
                </div>
                <div className="cont">
                  <h5>
                    <Link href="/project-details">Modern Townhouse</Link>
                  </h5>
                  <span>Architecture</span>
                  <span>Modern</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 items digital">
              <div className="item">
                <div className="img">
                  <img src="/assets/img/works/col/5.jpg" alt="" />
                </div>
                <div className="cont">
                  <h5>
                    <Link href="/project-details">Modern Townhouse</Link>
                  </h5>
                  <span>Architecture</span>
                  <span>Modern</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 items websites">
              <div className="item">
                <div className="img">
                  <img src="/assets/img/works/col/3.jpg" alt="" />
                </div>
                <div className="cont">
                  <h5>
                    <Link href="/project-details">Modern Townhouse</Link>
                  </h5>
                  <span>Architecture</span>
                  <span>Modern</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pagination blog-pg section-padding">
            <span className="active">
              <Link href="#">1</Link>
            </span>
            <span>
              <Link href="#">2</Link>
            </span>
            <span>
              <Link href="#">
                <a>
                  <i className="fas fa-angle-right"></i>
                </a>
              </Link>
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default WorkThreeColumn;
