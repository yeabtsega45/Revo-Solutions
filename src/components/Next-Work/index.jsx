import React from "react";
import Split from "../Split";
import Link from "next/link";
import { works } from "@/src/data/works";

const NextWork = ({ selectedWork }) => {
  if (!selectedWork) return null;

  const currentIndex = works.findIndex((work) => work.id === selectedWork.id);
  const nextIndex = (currentIndex + 1) % works.length; // Loops back to the first project if at the end
  const nextWork = works[nextIndex];

  return (
    <section className="call-action nogif next">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="content text-center">
              <Link href={`/work/${nextWork.id}`}>
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
                      <b>{nextWork.client}</b>
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
        style={{ backgroundImage: `url(${nextWork.introImage})` }}
      ></div>
    </section>
  );
};

export default NextWork;
