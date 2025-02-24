/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { works } from "@/src/data/works";
import axios from "axios";

const EditWork = () => {
  // delete work
  const handleDelete = (id) => {
    axios
      .delete("/work/delete/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        window.location.reload(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <section className="works filter-img three-col section-padding">
        <div className="container">
          <h2 className="title">Edit Works</h2>
          <div className="row gallery">
            {works.map((work, index) => (
              <Link href={`/admin/edit/${work.id}`} key={index} passHref>
                <div className="col-lg-4 col-md-6 items">
                  <div className="item">
                    <div className="img">
                      <img src={work.imgSrc} alt={work.title} />
                    </div>
                    <div className="cont">
                      <h5>{work.title}</h5>
                      {work.category.map((tag, index) => (
                        <span key={index}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="buttons">
                    <Link href={`/admin/edit/` + work.id} passHref>
                      <button className="btn btn-sm me-2">edit</button>
                    </Link>
                    <button
                      onClick={() => handleDelete(work.id)}
                      className="btn btn-sm btn-danger"
                    >
                      delete
                    </button>
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
