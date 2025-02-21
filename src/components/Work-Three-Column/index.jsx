/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import initIsotope from "../../common/initIsotope";
import { works } from "@/src/data/works";

const WorkThreeColumn = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredWorks, setFilteredWorks] = useState(works);
  const [activeFilter, setActiveFilter] = useState("*");
  const itemsPerPage = 6;

  useEffect(() => {
    setTimeout(() => {
      if (window.Isotope) initIsotope();
    }, 1000);
  }, []);

  useEffect(() => {
    if (activeFilter === "*") {
      setFilteredWorks(works);
    } else {
      setFilteredWorks(works.filter((work) => work.category === activeFilter));
    }
    setCurrentPage(1);
  }, [activeFilter]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Get work items for the current page
  const currentItems = filteredWorks.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(filteredWorks.length / itemsPerPage);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);

    // Scroll to the gallery section smoothly
    setTimeout(() => {
      document
        .querySelector(".gallery")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      <section className="works filter-img three-col section-padding">
        <div className="container">
          <div className="filtering text-center mb-30">
            <div className="filter">
              <span
                data-filter="*"
                className="active"
                onClick={() => handleFilterClick("*")}
              >
                All
              </span>
              <span
                data-filter=".digital"
                onClick={() => handleFilterClick("digital")}
              >
                Digital Marketing
              </span>
              <span
                data-filter=".branding"
                onClick={() => handleFilterClick("branding")}
              >
                Branding
              </span>
              <span
                data-filter=".websites"
                onClick={() => handleFilterClick("websites")}
              >
                Websites
              </span>
              <span
                data-filter=".ticket"
                onClick={() => handleFilterClick("ticket")}
              >
                Ticket System
              </span>
            </div>
          </div>

          <div className="row gallery">
            {currentItems.map((work) => (
              <Link href={`/work/${work.id}`} key={work.id} passHref>
                <div className={`col-lg-4 col-md-6 items ${work.category}`}>
                  <div className="item">
                    <div className="img">
                      <img src={work.imgSrc} alt={work.client} />
                    </div>
                    <div className="cont">
                      <h5>{work.client}</h5>
                      {work.category.map((tag, index) => (
                        <span key={index}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              {currentPage > 1 && (
                <span
                  className={currentPage === 1 ? "disabled" : ""}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <i className="fas fa-angle-left"></i>
                </span>
              )}

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <span
                    key={number}
                    className={currentPage === number ? "active" : ""}
                    onClick={() => handlePageChange(number)}
                  >
                    {number}
                  </span>
                )
              )}

              {currentPage < totalPages && (
                <span
                  className={currentPage === totalPages ? "disabled" : ""}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  <i className="fas fa-angle-right"></i>
                </span>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default WorkThreeColumn;
