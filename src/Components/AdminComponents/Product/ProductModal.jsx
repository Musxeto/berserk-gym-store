import React, { useState, useEffect } from "react";
import { updateProduct, addProduct } from "../../../firebase";
import { storage } from "../../../firebase";
import { ClipLoader } from "react-spinners";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { showFailureToast } from "../../../App";

const categories = [
  "creatine",
  "leggings",
  "belts",
  "preworkout",
  "proteinpowder",
  "shorts",
  "tanktops",
  "tshirt",
  "wraps",
];

const ProductModal = ({ isOpen, onClose, onSubmit, product }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState(0);
  const [sizes, setSizes] = useState([]);
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [hoverImageFile, setHoverImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [hoverImagePreview, setHoverImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [hoverImageLoading, setHoverImageLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setPrice(product.price || "");
      setDiscount(product.discount || 0);
      setSizes(product.sizes ? product.sizes.split(",") : []);
      setCategory(product.category || "");
      setImagePreview(product.image || null);
      setHoverImagePreview(product.hoverImage || null);
    }
  }, [product]);

  const uploadImageToStorage = async (file) => {
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = imagePreview;
      let hoverImageUrl = hoverImagePreview;

      if (imageFile) {
        imageUrl = await uploadImageToStorage(imageFile);
      }
      if (hoverImageFile) {
        hoverImageUrl = await uploadImageToStorage(hoverImageFile);
      }

      const productData = {
        name,
        price,
        discount,
        sizes: sizes.join(","),
        category,
        image: imageUrl,
        hoverImage: hoverImageUrl,
      };

      if (product) {
        await updateProduct(product.id, productData);
      } else {
        await addProduct(productData);
      }

      if (onSubmit) {
        onSubmit({
          id: product ? product.id : null,
          ...productData,
        });
      }

      // Reset form fields and state
      setName("");
      setPrice("");
      setDiscount(0);
      setSizes([]);
      setCategory("");
      setImagePreview(null);
      setHoverImagePreview(null);
    } catch (error) {
      console.error("Failed to save product:", error);
      showFailureToast("Failed to Upddate, Try Reloading the Page");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImageLoading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setImageLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleHoverImageChange = (e) => {
    const file = e.target.files[0];
    setHoverImageFile(file);
    setHoverImageLoading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setHoverImagePreview(reader.result);
      setHoverImageLoading(false);
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
      <div
        className="modal-container fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md p-8 z-50 custom-scrollbar"
        style={{
          maxWidth: "95%",
          maxHeight: "90%",
          height: "fit-content",
          overflowY: "auto",
        }}
      >
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
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
            </div>
            <div>
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
              <div className="field">
                <label className="label">Category</label>
                <div className="control">
                  <select
                    className="input"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="field mt-4">
            <label className="label">Image</label>
            <div className="control">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            {/* Image preview with loading placeholder */}
            {imagePreview && (
              <div className="mt-2">
                {imageLoading ? (
                  <ClipLoader color={"#000"} loading={imageLoading} size={35} />
                ) : (
                  <img
                    src={imagePreview}
                    alt="Product Image Preview"
                    className="w-40"
                  />
                )}
              </div>
            )}
            {/* Loading placeholder when image is not yet loaded */}
            {!imagePreview && imageLoading && (
              <div className="mt-2">
                <div className="w-40 h-40 bg-gray-200 animate-pulse"></div>
              </div>
            )}
          </div>
          <div className="field mt-4">
            <label className="label">Hover Image</label>
            <div className="control">
              <input
                type="file"
                accept="image/*"
                onChange={handleHoverImageChange}
              />
            </div>
            {/* Hover image preview with loading placeholder */}
            {hoverImagePreview && (
              <div className="mt-2">
                {hoverImageLoading ? (
                  <ClipLoader
                    color={"#000"}
                    loading={hoverImageLoading}
                    size={35}
                  />
                ) : (
                  <img
                    src={hoverImagePreview}
                    alt="Product Hover Image Preview"
                    className="w-40"
                  />
                )}
              </div>
            )}
            {/* Loading placeholder when hover image is not yet loaded */}
            {!hoverImagePreview && hoverImageLoading && (
              <div className="mt-2">
                <div className="w-40 h-40 bg-gray-200 animate-pulse"></div>
              </div>
            )}
          </div>
          {/* Other form fields... */}
          {/* Submit button with loading spinner */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="button mr-2 bg-black text-white px-3 py-1 rounded-md hover:bg-gray-800 disabled:bg-gray-700"
              disabled={loading}
            >
              {product ? "Update" : "Add"}
            </button>
            {loading && (
              <ClipLoader color={"#000"} loading={loading} size={35} />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
