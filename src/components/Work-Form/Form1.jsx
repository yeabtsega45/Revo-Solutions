/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function WorkForm() {
  const [data, setData] = useState({
    client: "",
    description: "",
    image: "",
    categories: [],
    tags: "",
    introImage: "",
    largeImages: [],
    smallImages: [],
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [introImagePreview, setIntroImagePreview] = useState(null);
  const [smallImagesPreview, setSmallImagesPreview] = useState([]);
  const [largeImagesPreview, setLargeImagesPreview] = useState([]);

  const router = useRouter();
  const { id } = router.query;
  // const token = localStorage.getItem("token");

  useEffect(() => {
    if (id) {
      axios
        .get("/work/get/" + id)
        .then((res) => {
          console.log(id);

          setData({
            ...data,
            client: res.data.client,
            description: res.data.description,
            categories: res.data.categories,
            tags: res.data.tags,
            // Keep the file inputs empty but store URLs separately
            image: "",
            introImage: "",
            largeImages: [],
            smallImages: [],
          });

          console.log(res.data);

          // Set preview images from the fetched URLs
          setImagePreview(res.data.image);
          setIntroImagePreview(res.data.introImage);
          setSmallImagesPreview(res.data.smallImages || []);
          setLargeImagesPreview(res.data.largeImages || []);
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Work ID is undefined");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleFileChange = (e, type) => {
    const files = e.target.files;
    if (!files || !files.length) return;

    if (type === "smallImages" || type === "largeImages") {
      const newFiles = Array.from(files);
      setData((prevData) => ({
        ...prevData,
        [type]: [...newFiles], // Replace existing files
      }));

      const previewUrls = newFiles.map((file) => URL.createObjectURL(file));

      if (type === "smallImages") {
        setSmallImagesPreview(previewUrls); // Replace existing previews
      } else {
        setLargeImagesPreview(previewUrls); // Replace existing previews
      }
    } else {
      const file = files[0];
      setData((prevData) => ({ ...prevData, [type]: file }));
      const previewUrl = URL.createObjectURL(file);
      if (type === "image") {
        setImagePreview(previewUrl);
      } else if (type === "introImage") {
        setIntroImagePreview(previewUrl);
      }
    }
  };

  const handleCategoryChange = (categoryItem, isChecked) => {
    setData((prevData) => ({
      ...prevData,
      categories: isChecked
        ? [...prevData.categories, categoryItem]
        : prevData.categories.filter((item) => item !== categoryItem),
    }));
  };

  // Update a work by id
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(data);
    const formdata = new FormData();
    formdata.append("client", data.client);
    formdata.append("description", data.description);
    formdata.append("tags", data.tags);

    // Only append new files if they were selected
    if (data.image) formdata.append("image", data.image);
    if (data.introImage) formdata.append("introImage", data.introImage);

    data.categories.forEach((cat) => formdata.append("categories", cat));
    data.smallImages.forEach((img) => formdata.append("smallImages", img));
    data.largeImages.forEach((img) => formdata.append("largeImages", img));

    // Console log formdata as an object
    const formDataObject = Object.fromEntries(formdata.entries());
    console.log(formDataObject);

    axios
      .post("/work/edit", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        router.push("/admin");
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="work-form">
      <h2 className="title">Edit Work</h2>
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
                  src={`http://localhost:5000/images/${imagePreview}`}
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
                value={data.client}
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
                value={data.description}
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
                src={`http://localhost:5000/images/${introImagePreview}`}
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
                        checked={data.categories.includes(categoryItem)}
                        onChange={(e) =>
                          handleCategoryChange(categoryItem, e.target.checked)
                        }
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
                value={data.tags}
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
                multiple
                onChange={(e) => handleFileChange(e, "smallImages")}
              />
              {smallImagesPreview && smallImagesPreview.length > 0 && (
                <div className="preview-container">
                  {smallImagesPreview.map((src, index) => (
                    <img
                      key={index}
                      src={`http://localhost:5000/images/${src}`}
                      alt={`Small Preview ${index}`}
                      className="preview-image-multi"
                    />
                  ))}
                </div>
              )}
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
              multiple
              onChange={(e) => handleFileChange(e, "largeImages")}
            />
            {largeImagesPreview && largeImagesPreview.length > 0 && (
              <div className="preview-container">
                {largeImagesPreview.map((src, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5000/images/${src}`}
                    alt={`Large Preview ${index}`}
                    className="preview-image-multi"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="button-container">
          <button type="submit" className="button">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default WorkForm;
