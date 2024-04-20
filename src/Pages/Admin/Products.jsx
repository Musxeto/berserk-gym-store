import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/AdminComponents/Layout/Sidebar/Sidebar";
import { ClipLoader } from "react-spinners";
import ProductList from "../../Components/AdminComponents/Product/ProductsList";
import ProductModal from "../../Components/AdminComponents/Product/ProductModal";
import Header from "../../Components/AdminComponents/Layout/Header/Header";
import ConfirmationModal from "../../Components/AdminComponents/Product/ConfirmationModal";
import { showFailureToast, showSuccessToast } from "../../App";
import { fetchProducts, updateProduct, deleteProduct } from "../../firebase";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false);
        showFailureToast("Failed to fetch products. Please try again.");
      }
    };
    fetchData();
  }, []);

  const handleAddProduct = (newProduct) => {
    try {
      setProducts([...products, { id: products.length + 1, ...newProduct }]);
      setIsAddModalOpen(false);
      showSuccessToast("Product added successfully!");
    } catch (error) {
      showFailureToast("Failed to add product. Please try again.");
    }
  };

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      if (!updatedProduct) {
        console.error("Invalid product data:", updatedProduct);
        return;
      }

      const updatedProductData = await updateProduct(
        updatedProduct.id,
        updatedProduct
      );
      const updatedProducts = products.map((product) =>
        product.id === updatedProductData.id ? updatedProductData : product
      );
      setProducts(updatedProducts);
      setIsUpdateModalOpen(false);
    } catch (error) {
      showFailureToast("Failed to update product. Please try again.");
      console.error("Failed to update product:", error);
    }
  };

  const handleDeleteConfirmation = (productId) => {
    setSelectedProductId(productId);
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteProduct(selectedProductId);
      setProducts(
        products.filter((product) => product.id !== selectedProductId)
      );
      showSuccessToast("Product deleted successfully!");
      setIsConfirmationModalOpen(false);
    } catch (error) {
      showFailureToast("Failed to delete product. Please try again.");
      console.error("Failed to delete product:", error);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmationModalOpen(false);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-2 md:ml-56 p-6">
        <div className="max-w-screen-lg mx-auto">
          <Header
            pageTitle={"Products"}
            pageDescription={"Manage all your site's products here"}
          />
          <hr />
          <br />
          <div className="flex justify-center">
            <button
              className="button mr-2 bg-black text-white px-3 py-1 rounded-md hover:bg-gray-900"
              onClick={() => setIsAddModalOpen(true)}
            >
              Add Product
            </button>
          </div>

          <ProductModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onSubmit={handleAddProduct}
          />

          {isLoading ? (
            <div className="flex justify-center mt-8">
              <ClipLoader color={"#000"} loading={isLoading} size={35} />
            </div>
          ) : (
            <ProductList
              products={products}
              onDelete={handleDeleteConfirmation}
              onUpdate={(product) => {
                setSelectedProduct(product);
                setIsUpdateModalOpen(true);
              }}
            />
          )}

          {selectedProduct && (
            <ProductModal
              isOpen={isUpdateModalOpen}
              onClose={() => setIsUpdateModalOpen(false)}
              onSubmit={handleUpdateProduct}
              product={selectedProduct}
            />
          )}

          <ConfirmationModal
            isOpen={isConfirmationModalOpen}
            onCancel={handleCancelDelete}
            onConfirm={handleConfirmDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
