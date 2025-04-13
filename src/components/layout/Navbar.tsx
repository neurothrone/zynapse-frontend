import { Link } from "react-router";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { selectIsAuthenticated, selectUser, signOut } from "../../store/slices/auth-slice.ts";
import { selectCartItemCount, toggleCart } from "../../store/slices/cart-slice.ts";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);
  const cartItemCount = useAppSelector(selectCartItemCount);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = () => {
    dispatch(signOut());
  };

  const handleCartToggle = () => {
    dispatch(toggleCart());
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-slate-800 border-b border-slate-700 py-4 px-6 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold primary-text">ZYNAPSE</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-300 hover:text-white transition-colors">
            Home
          </Link>
          <Link to="/games" className="text-gray-300 hover:text-white transition-colors">
            Games
          </Link>
          <Link to="/events" className="text-gray-300 hover:text-white transition-colors">
            Events
          </Link>
        </div>

        {/* Auth & Cart */}
        <div className="flex items-center space-x-6">
          {/* Cart Button */}
          <button
            onClick={handleCartToggle}
            className="relative p-2 text-gray-300 hover:text-white transition-colors"
            aria-label="Shopping Cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
            {cartItemCount > 0 && (
              <span
                className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Auth Buttons */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                {user?.username || "Dashboard"}
              </Link>
              <button
                onClick={handleSignOut}
                className="btn-outline text-sm py-1 px-3"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                Sign In
              </Link>
              <Link to="/register" className="btn-primary text-sm py-1 px-3">
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu Button (hidden on desktop) */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-300 hover:text-white"
            aria-label="Toggle mobile menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (only visible when open) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link
              to="/"
              className="text-gray-300 hover:text-white transition-colors py-2"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/games"
              className="text-gray-300 hover:text-white transition-colors py-2"
              onClick={toggleMobileMenu}
            >
              Games
            </Link>
            <Link
              to="/events"
              className="text-gray-300 hover:text-white transition-colors py-2"
              onClick={toggleMobileMenu}
            >
              Events
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
