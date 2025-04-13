import { useParams, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useGetProductQuery } from "../../store/api";
import { addItem } from "../../store/slices/cartSlice";
import Layout from "../../components/layout/Layout";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productId = id ? parseInt(id, 10) : 0;
  const { data: product, error, isLoading } = useGetProductQuery(productId);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addItem(product));
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        {/* Back button */}
        <button
          onClick={handleGoBack}
          className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Games
        </button>

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
          <div className="bg-accent-900/20 border border-accent-600 text-accent-200 px-4 py-3 rounded relative my-6" role="alert">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">Failed to load product details. Please try again later.</span>
          </div>
        )}

        {product && !isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="h-96 bg-gradient-to-br from-primary-900 to-slate-800 rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl font-bold text-purple-400 opacity-50">GAME</span>
              </div>
              {product.stock < 5 && product.stock > 0 && (
                <span className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                  Low Stock
                </span>
              )}
              {product.stock === 0 && (
                <span className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Product Details */}
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>

              <div className="flex items-center mb-6">
                <span className="text-3xl font-bold text-purple-400 mr-4">${product.price}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  product.stock > 0 ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"
                }`}>
                  {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
                </span>
              </div>

              <div className="prose prose-invert prose-violet max-w-none mb-8">
                <p className="text-gray-300 text-lg">{product.description}</p>

                {/* Additional details would go here in a real app */}
                <div className="mt-6 space-y-4">
                  <div className="flex items-start">
                    <div className="bg-slate-800 p-2 rounded-full mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-lg">System Requirements</h3>
                      <p className="text-gray-400">High-end gaming PC recommended for optimal experience.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-slate-800 p-2 rounded-full mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-lg">Average Playtime</h3>
                      <p className="text-gray-400">40+ hours of immersive gameplay.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`btn-primary flex-1 py-3 flex items-center justify-center ${
                    product.stock === 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </button>

                {product.steamLink && (
                  <a
                    href={product.steamLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline flex-1 py-3 flex items-center justify-center"
                  >
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm-6 9c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5zm12 0c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5z" />
                    </svg>
                    View on Steam
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
