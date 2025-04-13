import ProductList from "../components/home/ProductList.tsx";
import Layout from "../../components/layout/Layout";

const HomePage = () => {
  return (
    <Layout>
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 primary-text">Welcome to Zynapse</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Your portal to the future of gaming. Explore our collection of cyberpunk, sci-fi, and futuristic games.
        </p>
      </div>
      <ProductList />
    </Layout>
  );
};

export default HomePage;
