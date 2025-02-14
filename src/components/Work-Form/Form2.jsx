import axios from "axios";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";

function WorkForm2() {
  const [data, setData] = useState({
    client: "",
    description: "",
    image: "",
    category: [],
    tags: "",
  });
  //   const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("client", data.client);
    formdata.append("description", data.description);
    formdata.append("image", data.image);
    formdata.append("category", data.category);
    formdata.append("tags", data.tags);
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
        <div className="form-fields">
          <div>
            <div className="form-group">
              <label className="label">Category</label>
              <div className="checkbox-group">
                {["Website", "Branding", "Digital Marketing"].map(
                  (categoryItem) => (
                    <label key={categoryItem} className="checkbox-label">
                      <input
                        type="checkbox"
                        className="checkbox"
                        value={categoryItem}
                        checked={data.category.includes(categoryItem)}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setData((prevData) => ({
                            ...prevData,
                            category: isChecked
                              ? [...prevData.category, categoryItem]
                              : prevData.category.filter(
                                  (item) => item !== categoryItem
                                ),
                          }));
                        }}
                      />
                      <span>{categoryItem}</span>
                    </label>
                  )
                )}
              </div>
            </div>
            <div className="form-group">
              <label className="label">Tags</label>
              <input
                type="text"
                className="input"
                name="tags"
                placeholder="write tags separated with comma"
                autoComplete="off"
                onChange={(e) => setData({ ...data, tags: e.target.value })}
              />
            </div>
          </div>
          <div className="form-group">
            <input
              type="file"
              className="input-file"
              name="image"
              onChange={(e) => setData({ ...data, image: e.target.files[0] })}
            />
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
