import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { signUp, selectAuthError, selectAuthLoading, clearError } from "../../store/slices/authSlice";
import Layout from "../../components/layout/Layout";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectAuthError);
  const isLoading = useSelector(selectAuthLoading);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setFormError(null);
    dispatch(clearError());

    // Validate form
    if (!email || !password || !confirmPassword || !username) {
      setFormError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setFormError("Password must be at least 8 characters long");
      return;
    }

    try {
      const resultAction = await dispatch(signUp({ email, password, username }));
      if (signUp.fulfilled.match(resultAction)) {
        navigate("/");
      }
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto my-12">
        <div className="card p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold primary-text mb-2">Create Account</h1>
            <p className="text-gray-400">Join the Zynapse community</p>
          </div>

          {(error || formError) && (
            <div className="bg-accent-900/20 border border-accent-600 text-accent-200 px-4 py-3 rounded relative mb-6" role="alert">
              <span className="block sm:inline">{formError || error}</span>
              <button
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
                onClick={() => {
                  setFormError(null);
                  dispatch(clearError());
                }}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="username" className="block text-gray-300 mb-2">Username</label>
              <input
                type="text"
                id="username"
                className="input w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="input w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-300 mb-2">Password</label>
              <input
                type="password"
                id="password"
                className="input w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                minLength={8}
              />
              <p className="text-gray-500 text-xs mt-1">Must be at least 8 characters long</p>
            </div>

            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-gray-300 mb-2">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="input w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              className={`btn-primary w-full ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : "Create Account"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-400 hover:text-purple-300">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
