import React, { useState } from "react";

const WorkForm = () => {
  const [formData, setFormData] = useState({
    image: "",
    category: "",
    client: "",
    tags: "",
    description: "",
    images: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="form-container">
      <h2>Add Work Data</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter categories (comma separated)"
          />
        </div>
        <div className="form-group">
          <label htmlFor="client">Client</label>
          <input
            type="text"
            id="client"
            name="client"
            value={formData.client}
            onChange={handleChange}
            placeholder="Enter client name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Enter tags (comma separated)"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Enter description"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="images">Images</label>
          <input
            type="text"
            id="images"
            name="images"
            value={formData.images}
            onChange={handleChange}
            placeholder="Enter image URLs (comma separated)"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default WorkForm;
