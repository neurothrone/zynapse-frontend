import { useEffect, useState } from "react";
import { Product } from "../../../types/product.ts";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]); // State to store products
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState<string | null>(null); // State for error handling

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Use the local API URL from .env
        const response = await fetch(`${import.meta.env.VITE_API_URL_LOCAL}/products`);
        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }
        const data: Product[] = await response.json();
        setProducts(data); // Update the products state
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message); // Safely capture error message if `err` is an `Error`
        } else {
          setError("An unknown error occurred."); // Handle unknown errors gracefully
        }

      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">Product List</h1>
      {loading && <p className="text-xl">Loading products...</p>}
      {error && <p className="text-red-500 text-xl">{error}</p>}
      {!loading && !error && (
        <ul className="space-y-4">
          {products.map((product) => (
            <li
              key={product.id}
              className="border p-4 rounded-lg shadow-lg flex flex-col items-start"
            >
              <h2 className="text-2xl font-semibold">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="font-bold text-lg text-green-500">{product.price} kr</p>
              <p>Stock: {product.stock}</p>
              {product.steamLink && (
                <a
                  href={product.steamLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 mt-2 underline"
                >
                  Steam Product Link
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
