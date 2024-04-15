import React, { useState, useEffect } from "react";

const ProductModal = ({ isOpen, onClose, onSubmit, product }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState(0);
  const [sizes, setSizes] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [hoverImageFile, setHoverImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [hoverImagePreview, setHoverImagePreview] = useState(null);

  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setPrice(product.price || "");
      setDiscount(product.discount || 0);
      setSizes(product.sizes || []);
      setImagePreview(product.image || null);
      setHoverImagePreview(product.hoverImage || null);
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: product.id,
      name,
      price,
      discount,
      sizes,
      image: imagePreview,
      hoverImage: hoverImagePreview,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleHoverImageChange = (e) => {
    const file = e.target.files[0];
    setHoverImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setHoverImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className={`modal ${
        isOpen ? "block" : "hidden"
      } fixed inset-0 overflow-y-auto z-50`}
    >
      <div className="modal-overlay absolute inset-0 bg-black opacity-50"></div>

      <div className="modal-container fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md p-8 z-50 grid grid-cols-2 gap-8">
        <div className="col-span-1">
          <div className="flex justify-between mb-4">
            <h2 className="text-lg font-bold">
              {product ? "Update Product" : "Add Product"}
            </h2>
            <button
              className="text-gray-500 hover:text-gray-800"
              onClick={onClose}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <form id="productForm" onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  placeholder="Product Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Price</label>
              <div className="control">
                <input
                  type="number"
                  className="input"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Discount (%)</label>
              <div className="control">
                <input
                  type="number"
                  className="input"
                  placeholder="Discount"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Available Sizes</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  placeholder="Available Sizes"
                  value={sizes.join(",")}
                  onChange={(e) => setSizes(e.target.value.split(","))}
                />
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <button type="submit" className="button is-primary">
                {product ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
        <div className="col-span-1">
          <div className="field">
            <label className="label">Image</label>
            <div className="control">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Product Image Preview"
                className="mt-2 w-40"
              />
            )}
          </div>
          <div className="field">
            <label className="label">Hover Image</label>
            <div className="control">
              <input
                type="file"
                accept="image/*"
                onChange={handleHoverImageChange}
              />
            </div>
            {hoverImagePreview && (
              <img
                src={hoverImagePreview}
                alt="Product Hover Image Preview"
                className="mt-2 w-40"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
