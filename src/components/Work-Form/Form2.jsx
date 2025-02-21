/* eslint-disable @next/next/no-img-element */
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
    introImage: "",
    largeImages: [],
    smallImages: [],
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [introImagePreview, setIntroImagePreview] = useState(null);

  //   const navigate = useNavigate();

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setData((prevData) => ({ ...prevData, [type]: file }));
      const previewUrl = URL.createObjectURL(file);
      if (type === "image") {
        setImagePreview(previewUrl);
      } else if (type === "introImage") {
        setIntroImagePreview(previewUrl);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(data);
    const formdata = new FormData();
    formdata.append("client", data.client);
    formdata.append("description", data.description);
    formdata.append("image", data.image);
    formdata.append("category", data.category);
    formdata.append("tags", data.tags);
    formdata.append("introImage", data.introImage);
    formdata.append("largeImages", data.largeImages);
    formdata.append("smallImages", data.smallImages);
    axios
      .post("/work/create", formdata)
      .then((res) => {
        // navigate("/admin");
        // console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="work-form">
      <h2 className="title">Create Work</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-fields">
          <div className="form-group">
            <label className="label">Image (800x637)</label>
            <div className="input-wrapper">
              <input
                type="file"
                className="input-file"
                name="image"
                onChange={(e) => handleFileChange(e, "image")}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="preview-image"
                />
              )}
            </div>
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

        <div className="form-group">
          <label className="label">Intro Image (1920x1153)</label>
          <div className="large-wrapper">
            <input
              type="file"
              className="large-file"
              name="introImage"
              onChange={(e) => handleFileChange(e, "introImage")}
            />
            {introImagePreview && (
              <img
                src={introImagePreview}
                alt="Preview"
                className="preview-image"
              />
            )}
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
            <label className="label">8 Small Images (1920x853)</label>
            <div className="input-wrapper">
              <input
                type="file"
                className="input-file"
                name="smallImages"
                onChange={(e) =>
                  setData({ ...data, smallImages: e.target.files[0] })
                }
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="label">2 Large Images (1918x647)</label>
          <div className="large-wrapper">
            <input
              type="file"
              className="large-file"
              name="largeImages"
              onChange={(e) =>
                setData({ ...data, largeImages: e.target.files[0] })
              }
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
