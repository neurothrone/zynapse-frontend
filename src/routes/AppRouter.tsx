import { JSX } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { selectIsAuthenticated } from "../store/slices/authSlice";
import HomePage from "../ui/pages/HomePage.tsx";
import LoginPage from "../ui/pages/LoginPage.tsx";
import RegisterPage from "../ui/pages/RegisterPage.tsx";
import ProductDetailPage from "../ui/pages/ProductDetailPage.tsx";
import GamesPage from "../ui/pages/GamesPage.tsx";
import EventsPage from "../ui/pages/EventsPage.tsx";

// Protected route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace/>;
  }

  return children;
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage/>}/>
        <Route path="/games" element={<GamesPage/>}/>
        <Route path="/events" element={<EventsPage/>}/>
        <Route path="/product/:id" element={<ProductDetailPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>

        {/* Protected routes - will be implemented later */}
        {/*
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        */}

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
