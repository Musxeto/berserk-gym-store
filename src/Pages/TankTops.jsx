import React from "react";
import Layout from "../Components/Layout/Layout";

const TankTops = () => {
  // Sample data for tank tops products
  // const tankTopsProducts = [
  //   {
  //     image: "/tanktop1.jpg",
  //     hoverImage: "/tanktop1_hover.jpg",
  //     name: "Gym Tanktop",
  //     sizes: ["S", "M", "L", "XL"],
  //     price: "27.99",
  //     discount: 0,
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
          const tanktopsProducts = productsData.filter(
            (product) => product.category === "tanktops"
          );
          // Format sizes for each product in the array
          const formattedProducts = tanktopsProducts.map((product) => ({
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
        pageTitle="Tank Tops Products"
        pageDescription="Browse our collection of tanktops products."
        products={products}
        loading={isLoading}
      />
    </div>
  );
};

export default TankTops;
