import React, { useState } from "react";
import Sidebar from "../../Components/AdminComponents/Layout/Sidebar/Sidebar";
import AddProductForm from "../../Components/AdminComponents/Product/AddProductForm";
import ProductList from "../../Components/AdminComponents/Product/ProductsList";
import ProductModal from "../../Components/AdminComponents/Product/ProductModal";

const Products = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      image: "/bag_hover.webp",
      hoverImage: "/bag.webp",
      name: "Gym Accessory",
      sizes: ["One Size"],
      price: "14.99",
      discount: 0,
    },
    {
      id: 2,
      name: "Creatine Monohydrate Powder",
      price: 19.99,
      discount: 10,
      image: "/creatine.webp",
      hoverImage: "/creatine.webp",
      sizes: ["500g"],
    },
    {
      id: 3,
      name: "Creatine Capsules",
      price: 10.99,
      discount: 0,
      image: "/creatine_caps.webp",
      hoverImage: "/creatine_caps.webp",
      sizes: ["90 Capsules"],
    },
    {
      id: 4,
      name: "Berserk Black Leather Lifting Belt",
      price: 39.99,
      discount: 0,
      image: "/black_lifting_belt.jpg",
      hoverImage: "/black_lifting_belt_hover.jpg",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 5,
      name: "White Lifting Belt",
      price: 29.99,
      discount: 50,
      image: "/white_lifting_belt.jpg",
      hoverImage: "/white_lifting_belt_hover.jpg",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 6,
      name: "Pre-Workout Powder",
      price: 29.99,
      discount: 0,
      image: "/preworkout_powder.jpg",
      hoverImage: "/preworkout_powder_hover.jpg",
      sizes: ["500g"],
    },
    {
      id: 7,
      name: "Pre-Workout Drink",
      price: 19.99,
      discount: 10,
      image: "/preworkout_drink.jpg",
      hoverImage: "/preworkout_drink_hover.jpg",
      sizes: ["12 FL OZ"],
    },
    {
      id: 8,
      image: "/protienpowder.jpg",
      hoverImage: "/protienpowder_hover.jpg",
      name: "Protein Powder",
      sizes: ["1kg"],
      price: "49.99",
      discount: 20,
    },
    {
      id: 9,
      image: "/product2_hover.jpg",
      hoverImage: "/product2.jpg",
      name: "Berserk White  Shorts ",
      sizes: ["S", "M", "L", "XL"],
      price: "34.99",
      discount: 5,
    },
    {
      id: 10,
      image: "/product1_hover.jpg",
      hoverImage: "/product1.jpg",
      name: "Berserk Black Shorts ",
      sizes: ["S", "M", "L", "XL"],
      price: "39.99",
      discount: 10,
    },
    {
      id: 11,
      image: "/tanktop1.jpg",
      hoverImage: "/tanktop1_hover.jpg",
      name: "Gym Tanktop",
      sizes: ["S", "M", "L", "XL"],
      price: "27.99",
      discount: 0,
    },
    {
      id: 12,
      name: "Heavy Duty Wrist Wraps",
      price: 9.99,
      discount: 0,
      image: "/wristbands.jpg",
      hoverImage: "/wristbands.jpg",
      sizes: ["One Size"],
    },
    {
      id: 13,
      name: "Compression Leggings",
      price: 24.99,
      discount: 0,
      image: "/compression_leggings.jpg",
      hoverImage: "/compression_leggings_hover.jpg",
      sizes: ["XS", "S", "M", "L", "XL"],
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // State for update product modal
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, { id: products.length + 1, ...newProduct }]);
    setIsAddModalOpen(false);
  };

  const handleUpdateProduct = (updatedProduct) => {
    const updatedProducts = products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(updatedProducts);
    setIsUpdateModalOpen(false);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-2 md:ml-56 p-6">
        <div className="max-w-screen-lg mx-auto">
          <h2 className="text-2xl font-bold mb-4">Products</h2>
          <button
            className="button is-primary"
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Product
          </button>
          <ProductModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onSubmit={handleAddProduct}
          />
          <ProductList
            products={products}
            onDelete={handleDeleteProduct}
            onUpdate={(product) => {
              setSelectedProduct(product);
              setIsUpdateModalOpen(true);
            }}
          />
          {selectedProduct && (
            <ProductModal
              isOpen={isUpdateModalOpen}
              onClose={() => setIsUpdateModalOpen(false)}
              onSubmit={handleUpdateProduct}
              product={selectedProduct}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
