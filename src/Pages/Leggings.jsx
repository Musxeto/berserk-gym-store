import React from "react";
import Layout from "../Components/Layout/Layout";

const Leggings = () => {
  // const leggingsProducts = [
  //   {
  //     name: "Compression Leggings",
  //     price: 24.99,
  //     discount: 0,
  //     image: "/compression_leggings.jpg",
  //     hoverImage: "/compression_leggings_hover.jpg",
  //     sizes: ["XS", "S", "M", "L", "XL"],
  //   },
  // ];
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const productsData = await fetchProducts();
        if (Array.isArray(productsData)) {
          // Filter products based on category
          const leggingsProducts = productsData.filter(
            (product) => product.category === "leggings"
          );
          // Format sizes for each product in the array
          const formattedProducts = leggingsProducts.map((product) => ({
            ...product,
            sizes: product.sizes.split(",").map((size) => size.trim()),
          }));
          setProducts(formattedProducts);
        } else {
          console.error("Invalid products data:", productsData);
          // Handle invalid data
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Handle error
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Layout
        pageTitle="Leggings Products"
        pageDescription="Browse our collection of leggings products."
        products={products}
        loading={isLoading}
      />
    </div>
  );
};
export default Leggings;
