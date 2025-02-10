/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import initIsotope from "../../common/initIsotope";
import { works } from "@/src/data/works";

const WorkThreeColumn = () => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      if (window.Isotope) initIsotope();
    }, 1000);
  }, []);

  const itemsPerPage = 6;

  // Calculate total pages
  const totalPages = Math.ceil(works.length / itemsPerPage);

  // Get work items for the current page
  const currentWorks = works.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);

      // Scroll to the gallery section smoothly
      setTimeout(() => {
        document
          .querySelector(".gallery")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };
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
            {currentWorks.map((item) => (
              <div
                key={item.id}
                className={`col-lg-4 col-md-6 items ${item.category}`}
              >
                <div className="item">
                  <div className="img">
                    <img src={item.imgSrc} alt={item.title} />
                  </div>
                  <div className="cont">
                    <h5>
                      <Link href="/project-details">{item.title}</Link>
                    </h5>
                    {item.tags.map((tag, index) => (
                      <span key={index}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <span
              className={currentPage === 1 ? "disabled" : ""}
              onClick={() => goToPage(currentPage - 1)}
            >
              <i className="fas fa-angle-left"></i>
            </span>
            {[...Array(totalPages)].map((_, index) => (
              <span
                key={index}
                className={currentPage === index + 1 ? "active" : ""}
                onClick={() => goToPage(index + 1)}
              >
                {index + 1}
              </span>
            ))}
            <span
              className={currentPage === totalPages ? "disabled" : ""}
              onClick={() => goToPage(currentPage + 1)}
            >
              <i className="fas fa-angle-right"></i>
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default WorkThreeColumn;
