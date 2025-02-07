import React from "react";
import Link from "next/link";

const Services5 = () => {
  return (
    <section className="services-col section-padding">
      <div className="container">
        <div className="main-header text-center">
          <h3>Best Features.</h3>
          <div className="tex-bg">Services</div>
        </div>
        <div className="row bord-box wow fadeInUp">
          <div className="col-lg-3 col-md-6 item-bx">
            <span className="icon flaticon-home"></span>
            <h6 className="mb-20">Websites</h6>
            <p>
              High-quality Web Design and Development Services in the digital
              age.
            </p>
            <Link href="/about">
              <a className="more mt-30">Read More</a>
            </Link>
          </div>

          <div className="col-lg-3 col-md-6 item-bx">
            <span className="icon flaticon-kitchen-2"></span>
            <h6 className="mb-20">Branding</h6>
            <p>
              Helping your brand craft an authentic image, on a journey to
              authenticity
            </p>
            <Link href="/about">
              <a className="more mt-30">Read More</a>
            </Link>
          </div>

          <div className="col-lg-3 col-md-6 item-bx">
            <span className="icon flaticon-plan"></span>
            <h6 className="mb-20">Digital Marketing</h6>
            <p>
              Services including Digital Solutions, SEO Marketing, Creative
              Strategy.
            </p>
            <Link href="/about">
              <a className="more mt-30">Read More</a>
            </Link>
          </div>

          <div className="col-lg-3 col-md-6 item-bx">
            <span className="icon flaticon-renovation"></span>
            <h6 className="mb-20">Ticket System</h6>
            <p>
              Improve customer service, increase efficiency, and improve
              collaboration.
            </p>
            <Link href="/about">
              <a className="more mt-30">Read More</a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services5;
