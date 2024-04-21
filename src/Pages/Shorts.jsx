import React from "react";
import Layout from "../Components/Layout/Layout";

const Shorts = () => {
  // // Sample data for shorts products
  // const shortsProducts = [
  //   {
  //     image: "/product2_hover.jpg",
  //     hoverImage: "/product2.jpg",
  //     name: "Berserk White  Shorts ",
  //     sizes: ["S", "M", "L", "XL"],
  //     price: "34.99",
  //     discount: 5,
  //   },
  //   {
  //     image: "/product1_hover.jpg",
  //     hoverImage: "/product1.jpg",
  //     name: "Berserk Black Shorts ",
  //     sizes: ["S", "M", "L", "XL"],
  //     price: "39.99",
  //     discount: 10,
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
          const shortsProducts = productsData.filter(
            (product) => product.category === "shorts"
          );
          // Format sizes for each product in the array
          const formattedProducts = shortsProducts.map((product) => ({
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
        pageTitle="Shorts Products"
        pageDescription="Browse our collection of shorts products."
        products={products}
        loading={isLoading}
      />
    </div>
  );
};

export default Shorts;
