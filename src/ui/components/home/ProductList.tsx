import { useDispatch } from "react-redux";
import { Link } from "react-router";
import { Product } from "../../../types/product.ts";
import { addItem } from "../../../store/slices/cart-slice.ts";
import { useGetProductsQuery } from "../../../store/api";

const ProductList = () => {
  const dispatch = useDispatch();
  const { data: products, error, isLoading } = useGetProductsQuery();

  const handleAddToCart = (product: Product) => {
    dispatch(addItem(product));
  };

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-center neon-text">Featured Games</h2>

      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-pulse flex space-x-4">
            <div className="h-12 w-12 rounded-full bg-primary-600"></div>
            <div className="space-y-4 flex-1">
              <div className="h-4 bg-primary-600 rounded w-3/4"></div>
              <div className="h-4 bg-primary-600 rounded"></div>
              <div className="h-4 bg-primary-600 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-accent-900/20 border border-accent-600 text-accent-200 px-4 py-3 rounded relative my-6"
             role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">Failed to load products. Please try again later.</span>
        </div>
      )}

      {products && !isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="card card-hover overflow-hidden flex flex-col transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Placeholder image - in a real app, you'd use product.imageUrl */}
              <Link to={`/product/${product.id}`} className="group">
                <div className="h-48 bg-gradient-to-br from-primary-900 to-background-800 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="text-4xl font-bold text-purple-400 opacity-50 group-hover:opacity-70 transition-opacity">GAME</span>
                  </div>
                  {product.stock < 5 && product.stock > 0 && (
                    <span className="absolute top-2 right-2 bg-accent text-white text-xs px-2 py-1 rounded">
                      Low Stock
                    </span>
                  )}
                  {product.stock === 0 && (
                    <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                      Out of Stock
                    </span>
                  )}
                </div>
              </Link>

              <div className="p-5 flex-grow flex flex-col">
                <Link to={`/product/${product.id}`} className="group">
                  <h3
                    className="text-xl font-bold mb-2 text-white group-hover:text-purple-400 transition-colors">{product.name}</h3>
                </Link>
                <p className="text-gray-400 mb-4 flex-grow">{product.description}</p>

                <div className="flex justify-between items-center mt-auto">
                  <span className="text-xl font-bold text-purple-400">${product.price}</span>

                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                    className={`px-3 py-1 rounded-md transition-all ${
                      product.stock === 0
                        ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                        : "bg-primary hover:bg-primary-700 text-white"
                    }`}
                  >
                    {product.stock === 0 ? "Sold Out" : "Add to Cart"}
                  </button>
                </div>

                {product.steamLink && (
                  <a
                    href={product.steamLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neon-400 text-sm mt-3 inline-flex items-center hover:text-neon-300 transition-colors"
                  >
                    View on Steam
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {products && products.length === 0 && !isLoading && !error && (
        <div className="text-center py-16">
          <p className="text-xl text-gray-400">No products available at the moment.</p>
          <p className="text-gray-500 mt-2">Please check back later for our latest games.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
