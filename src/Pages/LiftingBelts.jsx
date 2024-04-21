import React from "react";
import Layout from "../Components/Layout/Layout";

const LiftingBelts = () => {
  // Sample data for lifting belts products
  // const liftingBeltsProducts = [
  //   {
  //     id: 1,
  //     name: "Berserk Black Leather Lifting Belt",
  //     price: 39.99,
  //     discount: 0,
  //     image: "/black_lifting_belt.jpg",
  //     hoverImage: "/black_lifting_belt_hover.jpg",
  //     sizes: ["S", "M", "L", "XL"],
  //   },
  //   {
  //     id: 2,
  //     name: "White Lifting Belt",
  //     price: 29.99,
  //     discount: 50,
  //     image: "/white_lifting_belt.jpg",
  //     hoverImage: "/white_lifting_belt_hover.jpg",
  //     sizes: ["S", "M", "L", "XL"],
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
          const beltsProducts = productsData.filter(
            (product) => product.category === "belts"
          );
          // Format sizes for each product in the array
          const formattedProducts = beltsProducts.map((product) => ({
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
        pageTitle="Lifting Belts Products"
        pageDescription="Browse our collection of belts products."
        products={products}
        loading={isLoading}
      />
    </div>
  );
};

export default LiftingBelts;
