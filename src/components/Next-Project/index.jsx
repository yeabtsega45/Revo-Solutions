import React from "react";
import Split from "../Split";
import Link from "next/link";
import { workData } from "@/src/data/works";

const NextProject = ({ selectedWork }) => {
  if (!selectedWork) return null;

  const currentIndex = workData.findIndex(
    (work) => work.id === selectedWork.id
  );
  const nextIndex = (currentIndex + 1) % workData.length; // Loops back to the first project if at the end
  const nextWork = workData[nextIndex];

  return (
    <section className="call-action nogif next">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="content text-center">
              <Link href={`/work2/${nextWork.id}`}>
                <a>
                  <Split>
                    <h6
                      className="wow txt words chars splitting"
                      data-splitting
                    >
                      Next Project
                    </h6>
                  </Split>

                  <Split>
                    <h2
                      className="wow txt words chars splitting"
                      data-splitting
                    >
                      <b>{nextWork.title}</b>
                    </h2>
                  </Split>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className="nxt-img bg-img"
        data-background="img/portfolio/project1/bg.jpg"
        // style={{ backgroundImage: `url(${nextWork.img})` }}
      ></div>
    </section>
  );
};

export default NextProject;
