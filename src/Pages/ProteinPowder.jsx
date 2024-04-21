import React from "react";
import Layout from "../Components/Layout/Layout";

const ProteinPowder = () => {
  // // Sample data for protein powder products
  // const proteinPowderProducts = [
  //   {
  //     image: "/protienpowder.jpg",
  //     hoverImage: "/protienpowder_hover.jpg",
  //     name: "Protein Powder",
  //     sizes: ["1kg"],
  //     price: "49.99",
  //     discount: 20,
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
          const protienProducts = productsData.filter(
            (product) => product.category === "protien"
          );
          // Format sizes for each product in the array
          const formattedProducts = protienProducts.map((product) => ({
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
        pageTitle="Protien Powder Products"
        pageDescription="Browse our collection of Protien Powder products."
        products={products}
        loading={isLoading}
      />
    </div>
  );
};

export default ProteinPowder;
