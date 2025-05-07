import Layout from "../../components/layout/Layout";

const GamesPage = () => {
  return (
    <Layout>
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 primary-text">Games</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Explore our collection of cyberpunk, sci-fi, and futuristic games. From action-packed adventures to strategic simulations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Placeholder game cards */}
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-slate-700 hover:border-accent transition-colors">
            <div className="h-48 bg-slate-700 animate-pulse"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Game Title {item}</h3>
              <p className="text-gray-400 mb-4">
                A futuristic game with amazing graphics and immersive gameplay.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-accent font-bold">$59.99</span>
                <button className="btn-primary text-sm py-1 px-3">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default GamesPage;
