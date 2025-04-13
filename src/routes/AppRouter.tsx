import { useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router";
import { createRoutesFromElements, Route } from "react-router";
import { selectIsAuthenticated } from "../store/slices/auth-slice.ts";
import AuthProvider from "../components/auth/AuthProvider";
import HomePage from "../ui/pages/HomePage.tsx";
import LoginPage from "../ui/pages/LoginPage.tsx";
import RegisterPage from "../ui/pages/RegisterPage.tsx";
import ProductDetailPage from "../ui/pages/ProductDetailPage.tsx";
import GamesPage from "../ui/pages/GamesPage.tsx";
import EventsPage from "../ui/pages/EventsPage.tsx";

// RequireAuth component for protected routes
export const RequireAuth = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

// Root layout component that includes AuthProvider
const RootLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

// Define routes using createRoutesFromElements
const routes = createRoutesFromElements(
  <Route element={<RootLayout />}>
    {/* Public routes */}
    <Route path="/" element={<HomePage />} />
    <Route path="/games" element={<GamesPage />} />
    <Route path="/events" element={<EventsPage />} />
    <Route path="/product/:id" element={<ProductDetailPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />

    {/* Protected routes */}
    <Route element={<RequireAuth />}>
      {/* Add protected routes here */}
      {/* Example: <Route path="/dashboard" element={<DashboardPage />} /> */}
      {/* Example: <Route path="/checkout" element={<CheckoutPage />} /> */}
    </Route>

    {/* Catch-all route */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Route>
);

// Create router
const router = createBrowserRouter(routes);

const AppRouter = () => {
  return (
    <RouterProvider router={router} />
  );
}

export default AppRouter;
