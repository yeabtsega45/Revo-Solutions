/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateWorkForm() {
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

  const handleFileChange = (e, type) => {
    const files = e.target.files;
    if (!files || !files.length) return;

    if (type === "smallImages" || type === "largeImages") {
      const newFiles = Array.from(files);
      setData((prevData) => ({
        ...prevData,
        [type]: [...prevData[type], ...newFiles], // Append new images
      }));

      const previewUrls = newFiles.map((file) => URL.createObjectURL(file));

      if (type === "smallImages") {
        setSmallImagesPreview((prevPreviews) => [
          ...prevPreviews,
          ...previewUrls,
        ]);
      } else {
        setLargeImagesPreview((prevPreviews) => [
          ...prevPreviews,
          ...previewUrls,
        ]);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(data);
    const formdata = new FormData();
    formdata.append("client", data.client);
    formdata.append("description", data.description);
    formdata.append("image", data.image);
    formdata.append("tags", data.tags);
    formdata.append("introImage", data.introImage);

    data.categories.forEach((cat) => formdata.append("categories", cat));
    data.smallImages.forEach((img) => formdata.append("smallImages", img));
    data.largeImages.forEach((img) => formdata.append("largeImages", img));

    // Console log formdata as an object
    const formDataObject = Object.fromEntries(formdata.entries());
    console.log(formDataObject);

    axios
      .post("/work/create", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.success(`Creating "${data.client}"!`, {
          onClose: () => {
            // Delay the reload to allow user to see the message
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          },
        });
        router.push("/admin");
        console.log(res);
      })
      .catch((err) => {
        toast.error(`Work creation failed. "${err.message}" Please try again.`);
        console.log(err);
      });
  };

  return (
    <div className="work-form">
      <ToastContainer />
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
                        checked={data.categories.includes(categoryItem)}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setData((prevData) => ({
                            ...prevData,
                            categories: isChecked
                              ? [...prevData.categories, categoryItem]
                              : prevData.categories.filter(
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
                multiple
                onChange={(e) => handleFileChange(e, "smallImages")}
              />
              {smallImagesPreview && smallImagesPreview.length > 0 && (
                <div className="preview-container">
                  {smallImagesPreview.map((src, index) => (
                    <img
                      key={index}
                      src={src}
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
                    src={src}
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
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateWorkForm;
