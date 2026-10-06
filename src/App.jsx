import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Enquiry from "./pages/Enquiry";
import Quality from "./pages/Quality";
import ExportInfo from "./pages/ExportInfo";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminEnquiries from "./pages/AdminEnquiries";
import AdminQuotations from "./pages/AdminQuotations";

import NotFound from "./pages/NotFound";


function App() {

    return (

        <>

            {/* Common Navbar */}
            <Navbar />


            {/* Website Pages */}
            <Routes>

                {/* Public Pages */}
                <Route path="/" element={<Home />} />

                <Route path="/products" element={<Products />} />

                <Route path="/products/:id" element={<ProductDetails />} />

                <Route path="/enquiry" element={<Enquiry />} />

                <Route path="/quality" element={<Quality />} />

                <Route path="/export-info" element={<ExportInfo />} />

                <Route path="/about" element={<About />} />

                <Route path="/contact" element={<Contact />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />


                {/* User Dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />


                {/* Admin Dashboard */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />


                {/* Admin Products */}
                <Route
                    path="/admin/products"
                    element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                            <AdminProducts />
                        </ProtectedRoute>
                    }
                />


                {/* Admin Enquiries */}
                <Route
                    path="/admin/enquiries"
                    element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                            <AdminEnquiries />
                        </ProtectedRoute>
                    }
                />


                {/* Admin Quotations */}
                <Route
                    path="/admin/quotations"
                    element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                            <AdminQuotations />
                        </ProtectedRoute>
                    }
                />


                {/* 404 Page */}
                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>


            {/* Common Footer */}
            <Footer />

        </>

    );
}

export default App;