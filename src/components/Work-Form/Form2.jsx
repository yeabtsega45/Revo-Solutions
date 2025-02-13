import axios from "axios";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";

function WorkForm2() {
  const [data, setData] = useState({
    client: "",
    description: "",
    image: "",
  });
  //   const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("client", data.client);
    formdata.append("description", data.description);
    formdata.append("image", data.image);
    axios
      .post("/work/create", formdata)
      .then((res) => {
        // navigate("/work/add");
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="work-form">
      <h2 className="title">Create Work</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-fields">
          <div className="form-group">
            <input
              type="file"
              className="input-file"
              name="image"
              onChange={(e) => setData({ ...data, image: e.target.files[0] })}
            />
          </div>
          <div>
            <div className="form-group">
              <label className="label">Client</label>
              <input
                type="text"
                className="input"
                name="client"
                placeholder="Client Name"
                autoComplete="off"
                onChange={(e) => setData({ ...data, client: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="label">Description</label>
              <textarea
                className="textarea"
                name="description"
                placeholder="Add a description"
                autoComplete="off"
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <div className="button-container">
          <button type="submit" className="button">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default WorkForm2;
