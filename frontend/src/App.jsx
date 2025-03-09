import {Route, Routes, useLocation } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import DashboardLayout from "./pages/admin/DashboardLayout";
import Dashboard from "./pages/admin/Dashboard";
import Orders from "./pages/admin/Orders";
import Products from "./pages/admin/Products";
import Users from "./pages/admin/Users";
import Navbar from "./components/Navbar";
import AboutPage from "./pages/AboutPage";
import ShopPage from "./pages/ShopPage";
import ContactPage from "./pages/ContactPage";
import Profile from "./pages/Profile";
import Categories from "./pages/admin/Categories";
import UpdateCategory from "./pages/admin/UpdateCategory";

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin")

  return (
    <>
      
      {!isAdmin && <Navbar />}
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<Profile />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="products" element={<Products />} />
            <Route path="categories" element={<Categories />} />
            <Route path="categories/update/:slug" element={<UpdateCategory />} />
            <Route path="users" element={<Users />} />
          </Route>
          
        </Routes>
        <ToastContainer />
      
    </>
  );
}

export default App;
