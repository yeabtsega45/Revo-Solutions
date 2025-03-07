/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingScreen from "../Loading-Screen/loading-screen";
import ErrorScreen from "../Error-Screen/error-screen";

function EditWorkForm() {
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [imagePreview, setImagePreview] = useState(null);
  const [introImagePreview, setIntroImagePreview] = useState(null);
  const [smallImagesPreview, setSmallImagesPreview] = useState([]);
  const [largeImagesPreview, setLargeImagesPreview] = useState([]);

  // Add these states to track existing images
  const [existingSmallImages, setExistingSmallImages] = useState([]);
  const [existingLargeImages, setExistingLargeImages] = useState([]);

  // Add new state to track images to delete
  const [smallImagesToDelete, setSmallImagesToDelete] = useState([]);
  const [largeImagesToDelete, setLargeImagesToDelete] = useState([]);

  const [activeSmallImage, setActiveSmallImage] = useState(0);
  const [activeLargeImage, setActiveLargeImage] = useState(0);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      setLoading(true);
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

          // Store existing image filenames
          setExistingSmallImages(res.data.smallImages || []);
          setExistingLargeImages(res.data.largeImages || []);

          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setError(err.message);
        });
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
        [type]: [...prevData[type]], // Keep existing files
      }));

      const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file));

      if (type === "smallImages") {
        setSmallImagesPreview((prev) => {
          // Preserve existing image URLs and add new preview URLs
          return [...prev, ...newPreviewUrls];
        });
        setData((prevData) => ({
          ...prevData,
          smallImages: [...prevData.smallImages, ...newFiles], // Append new files
        }));
      } else {
        setLargeImagesPreview((prev) => {
          return [...prev, ...newPreviewUrls];
        });
        setData((prevData) => ({
          ...prevData,
          largeImages: [...prevData.largeImages, ...newFiles], // Append new files
        }));
      }
    } else {
      const file = files[0];
      setData((prevData) => ({ ...prevData, [type]: file }));
      const previewUrl = URL.createObjectURL(file);

      // For single image uploads, directly set the new preview
      if (type === "image") {
        setImagePreview(previewUrl);
      } else if (type === "introImage") {
        setIntroImagePreview(previewUrl);
      }
    }
  };

  const renderPreviewImage = (src, className) => {
    if (!src) return null;

    // If it's a URL object (new file upload)
    if (src.startsWith("blob:")) {
      return <img src={src} alt="preview" className={className} />;
    }
    // If it's an existing image from the server
    return (
      <img
        src={`http://localhost:5000/images/${src}`}
        alt="preview"
        className={className}
      />
    );
  };

  const handleCategoryChange = (categoryItem, isChecked) => {
    setData((prevData) => ({
      ...prevData,
      categories: isChecked
        ? [...prevData.categories, categoryItem]
        : prevData.categories.filter((item) => item !== categoryItem),
    }));
  };

  // Reorder small and large images
  const handleImageReorder = (fromIndex, toIndex, imageType) => {
    if (toIndex < 0) return; // Prevent moving before first position

    if (imageType === "smallImages") {
      // Don't allow moving beyond array bounds
      if (toIndex >= smallImagesPreview.length) return;

      // Reorder preview images
      const updatedPreviews = [...smallImagesPreview];
      const [movedPreview] = updatedPreviews.splice(fromIndex, 1);
      updatedPreviews.splice(toIndex, 0, movedPreview);
      setSmallImagesPreview(updatedPreviews);

      // Reorder actual image files
      const updatedFiles = [...data.smallImages];
      const [movedFile] = updatedFiles.splice(fromIndex, 1);
      updatedFiles.splice(toIndex, 0, movedFile);
      setData((prev) => ({
        ...prev,
        smallImages: updatedFiles,
      }));

      // Update active image index if needed
      if (fromIndex === activeSmallImage) {
        setActiveSmallImage(toIndex);
      } else if (
        (fromIndex < activeSmallImage && toIndex >= activeSmallImage) ||
        (fromIndex > activeSmallImage && toIndex <= activeSmallImage)
      ) {
        setActiveSmallImage(activeSmallImage);
      }
    } else if (imageType === "largeImages") {
      // Don't allow moving beyond array bounds
      if (toIndex >= largeImagesPreview.length) return;

      // Reorder preview images
      const updatedPreviews = [...largeImagesPreview];
      const [movedPreview] = updatedPreviews.splice(fromIndex, 1);
      updatedPreviews.splice(toIndex, 0, movedPreview);
      setLargeImagesPreview(updatedPreviews);

      // Reorder actual image files
      const updatedFiles = [...data.largeImages];
      const [movedFile] = updatedFiles.splice(fromIndex, 1);
      updatedFiles.splice(toIndex, 0, movedFile);
      setData((prev) => ({
        ...prev,
        largeImages: updatedFiles,
      }));

      // Update active image index if needed
      if (fromIndex === activeLargeImage) {
        setActiveLargeImage(toIndex);
      } else if (
        (fromIndex < activeLargeImage && toIndex >= activeLargeImage) ||
        (fromIndex > activeLargeImage && toIndex <= activeLargeImage)
      ) {
        setActiveLargeImage(activeLargeImage);
      }
    }
  };

  // Delete a small or large image
  const handleDeleteImage = (index, type) => {
    if (type === "smallImages") {
      // If the image is an existing one (from the server), add it to deletion list
      if (!smallImagesPreview[index].startsWith("blob:")) {
        setSmallImagesToDelete((prev) => [...prev, smallImagesPreview[index]]);
      }

      const updatedSmallImagesPreview = smallImagesPreview.filter(
        (_, i) => i !== index
      );
      setSmallImagesPreview(updatedSmallImagesPreview);

      const updatedSmallImages = data.smallImages.filter((_, i) => i !== index);
      setData((prevData) => ({
        ...prevData,
        smallImages: updatedSmallImages,
      }));

      if (activeSmallImage === index) {
        setActiveSmallImage(0);
      } else if (activeSmallImage > index) {
        setActiveSmallImage(activeSmallImage - 1);
      }
    } else if (type === "largeImages") {
      // If the image is an existing one (from the server), add it to deletion list
      if (!largeImagesPreview[index].startsWith("blob:")) {
        setLargeImagesToDelete((prev) => [...prev, largeImagesPreview[index]]);
      }

      const updatedLargeImagesPreview = largeImagesPreview.filter(
        (_, i) => i !== index
      );
      setLargeImagesPreview(updatedLargeImagesPreview);

      const updatedLargeImages = data.largeImages.filter((_, i) => i !== index);
      setData((prevData) => ({
        ...prevData,
        largeImages: updatedLargeImages,
      }));

      if (activeLargeImage === index) {
        setActiveLargeImage(0);
      } else if (activeLargeImage > index) {
        setActiveLargeImage(activeLargeImage - 1);
      }
    }
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

    // For existing images, send both filename and order
    smallImagesPreview.forEach((filename, index) => {
      if (filename.startsWith("blob:")) {
        // This is a new file
        formdata.append("smallImages", data.smallImages[index]);
        formdata.append("smallImagesOrder", index.toString());
      } else {
        // This is an existing file
        formdata.append("existingSmallImages", filename);
        formdata.append("existingSmallImagesOrder", index.toString());
      }
    });

    largeImagesPreview.forEach((filename, index) => {
      if (filename.startsWith("blob:")) {
        // This is a new file
        formdata.append("largeImages", data.largeImages[index]);
        formdata.append("largeImagesOrder", index.toString());
      } else {
        // This is an existing file
        formdata.append("existingLargeImages", filename);
        formdata.append("existingLargeImagesOrder", index.toString());
      }
    });

    // Append images to delete
    smallImagesToDelete.forEach((filename) => {
      formdata.append("smallImagesToDelete", filename);
    });

    largeImagesToDelete.forEach((filename) => {
      formdata.append("largeImagesToDelete", filename);
    });

    // Console log formdata as an object
    const formDataObject = Object.fromEntries(formdata.entries());
    console.log(formDataObject);

    axios
      .put("/work/update/" + id, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        toast.success(`Updating "${data.client}"!`, {
          onClose: () => {
            setTimeout(() => {
              router.push("/admin");
            });
          },
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Error updating work: "${err.message}". Please try again.`);
      });
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error} />;
  }

  return (
    <div className="work-form">
      <ToastContainer />
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
              {imagePreview &&
                renderPreviewImage(imagePreview, "preview-image")}
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
            {introImagePreview &&
              renderPreviewImage(introImagePreview, "preview-image")}
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
          <label className="label-multi">8 Small Images (1920x853)</label>
          <div>
            <input
              type="file"
              name="smallImages"
              multiple
              onChange={(e) => handleFileChange(e, "smallImages")}
            />

            {smallImagesPreview && smallImagesPreview.length > 0 && (
              <>
                <div className="preview-main-container">
                  {renderPreviewImage(
                    smallImagesPreview[activeSmallImage],
                    "preview-main-image"
                  )}

                  <div className="edit-buttons">
                    <button
                      type="button"
                      onClick={() =>
                        handleImageReorder(
                          activeSmallImage,
                          activeSmallImage - 1,
                          "smallImages"
                        )
                      }
                    >
                      ◄
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleImageReorder(
                          activeSmallImage,
                          activeSmallImage + 1,
                          "smallImages"
                        )
                      }
                    >
                      ►
                    </button>
                  </div>

                  <div className="delete-button">
                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteImage(activeSmallImage, "smallImages")
                      }
                    >
                      🗑
                    </button>
                  </div>
                </div>

                <div className="preview-container">
                  {smallImagesPreview.map((src, index) => (
                    <img
                      key={index}
                      src={
                        src.startsWith("blob:")
                          ? src
                          : `http://localhost:5000/images/${src}`
                      }
                      alt={`Small Preview ${index}`}
                      className={
                        activeSmallImage === index
                          ? "preview-image-multi active-image"
                          : "preview-image-multi"
                      }
                      onClick={() => setActiveSmallImage(index)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="form-group">
          <label className="label-multi">2 Large Images (1918x647)</label>
          <div>
            <input
              type="file"
              name="largeImages"
              multiple
              onChange={(e) => handleFileChange(e, "largeImages")}
            />

            {largeImagesPreview && largeImagesPreview.length > 0 && (
              <>
                <div className="preview-main-container">
                  {renderPreviewImage(
                    largeImagesPreview[activeLargeImage],
                    "preview-main-image"
                  )}

                  <div className="edit-buttons">
                    <button
                      type="button"
                      onClick={() =>
                        handleImageReorder(
                          activeLargeImage,
                          activeLargeImage - 1,
                          "largeImages"
                        )
                      }
                    >
                      ◄
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleImageReorder(
                          activeLargeImage,
                          activeLargeImage + 1,
                          "largeImages"
                        )
                      }
                    >
                      ►
                    </button>
                  </div>

                  <div className="delete-button">
                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteImage(activeLargeImage, "largeImages")
                      }
                    >
                      🗑
                    </button>
                  </div>
                </div>

                <div className="preview-container">
                  {largeImagesPreview.map((src, index) => (
                    <img
                      key={index}
                      src={
                        src.startsWith("blob:")
                          ? src
                          : `http://localhost:5000/images/${src}`
                      }
                      alt={`Large Preview ${index}`}
                      className={
                        activeLargeImage === index
                          ? "preview-image-multi active-image"
                          : "preview-image-multi"
                      }
                      onClick={() => setActiveLargeImage(index)}
                    />
                  ))}
                </div>
              </>
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

export default EditWorkForm;
