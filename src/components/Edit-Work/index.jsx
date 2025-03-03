/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import LoadingScreen from "../Loading-Screen/loading-screen";
import ErrorScreen from "../Error-Screen/error-screen";

const EditWork = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //get all works
  useEffect(() => {
    setLoading(true);
    axios
      .get("/work/get/all")
      .then((res) => {
        setData(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  }, []);

  // delete work
  const handleDelete = (id) => {
    axios
      .delete(
        "/work/delete/" + id
        //   , {
        //   headers: {
        //     Authorization: "Bearer " + token,
        //   },
        // }
      )
      .then((res) => {
        window.location.reload(true);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.error);
      });
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error} />;
  }

  return (
    <>
      <section className="works filter-img three-col section-padding">
        <div className="container">
          <h2 className="title">Edit Works</h2>
          <div className="row gallery">
            {data.map((work, index) => (
              <div key={index} className="col-lg-4 col-md-6 items">
                <Link href={`/admin/edit/${work.id}`} passHref>
                  <div className="item">
                    <div className="img">
                      <img
                        src={`http://localhost:5000/images/${
                          work.image || "/assets/img/works/col/1.jpg"
                        }`}
                        alt={work.client}
                        onError={(e) => {
                          e.target.src = "/assets/img/works/col/1.jpg"; // Fallback image
                        }}
                      />
                    </div>
                    <div className="cont">
                      <h5>{work.client}</h5>
                      {work.categories.map((tag, index) => (
                        <span key={index}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </Link>
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
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default EditWork;
