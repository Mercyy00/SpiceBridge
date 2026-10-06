import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    getProducts,
    getEnquiries,
    getQuotations
} from "../services/api";

function AdminDashboard() {

    const [products, setProducts] = useState([]);
    const [enquiries, setEnquiries] = useState([]);
    const [quotations, setQuotations] = useState([]);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        async function loadAdminData() {

            try {

                const [
                    productData,
                    enquiryData,
                    quotationData
                ] = await Promise.all([
                    getProducts(),
                    getEnquiries(),
                    getQuotations()
                ]);


                setProducts(productData);
                setEnquiries(enquiryData);
                setQuotations(quotationData);

            } catch (error) {

                console.error(
                    "Admin dashboard error:",
                    error
                );

            } finally {

                setLoading(false);

            }

        }


        loadAdminData();

    }, []);


    return (
        <main className="bg-light min-vh-100 py-5">

            <div className="container">

                {/* HEADER */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5">

                    <div>

                        <p className="text-success fw-semibold mb-1">
                            ADMIN PANEL
                        </p>

                        <h1 className="fw-bold mb-2">
                            Admin Dashboard
                        </h1>

                        <p className="text-secondary mb-0">
                            Manage SpiceBridge products,
                            enquiries and quotations.
                        </p>

                    </div>

                    <div className="mt-3 mt-md-0">

                        <Link
                            to="/dashboard"
                            className="btn btn-outline-success"
                        >
                            <i className="bi bi-arrow-left me-2"></i>
                            My Dashboard
                        </Link>

                    </div>

                </div>


                {/* STAT CARDS */}
                <div className="row g-4 mb-5">

                    {/* PRODUCTS */}
                    <div className="col-md-4">

                        <div className="card border-0 shadow-sm rounded-4 h-100">

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between align-items-center">

                                    <div>

                                        <p className="text-secondary mb-1">
                                            Total Products
                                        </p>

                                        <h2 className="fw-bold mb-0">

                                            {loading
                                                ? "..."
                                                : products.length
                                            }

                                        </h2>

                                    </div>

                                    <div className="bg-success-subtle text-success rounded-3 p-3">

                                        <i className="bi bi-box-seam fs-3"></i>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* ENQUIRIES */}
                    <div className="col-md-4">

                        <div className="card border-0 shadow-sm rounded-4 h-100">

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between align-items-center">

                                    <div>

                                        <p className="text-secondary mb-1">
                                            Total Enquiries
                                        </p>

                                        <h2 className="fw-bold mb-0">

                                            {loading
                                                ? "..."
                                                : enquiries.length
                                            }

                                        </h2>

                                    </div>

                                    <div className="bg-warning-subtle text-warning rounded-3 p-3">

                                        <i className="bi bi-chat-left-text fs-3"></i>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* QUOTATIONS */}
                    <div className="col-md-4">

                        <div className="card border-0 shadow-sm rounded-4 h-100">

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between align-items-center">

                                    <div>

                                        <p className="text-secondary mb-1">
                                            Total Quotations
                                        </p>

                                        <h2 className="fw-bold mb-0">

                                            {loading
                                                ? "..."
                                                : quotations.length
                                            }

                                        </h2>

                                    </div>

                                    <div className="bg-info-subtle text-info rounded-3 p-3">

                                        <i className="bi bi-file-earmark-text fs-3"></i>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* MANAGEMENT */}
                <h4 className="fw-bold mb-4">
                    Management
                </h4>

                <div className="row g-4">

                    {/* PRODUCT MANAGEMENT */}
                    <div className="col-md-4">

                        <Link
                            to="/admin/products"
                            className="text-decoration-none"
                        >

                            <div className="card border-0 shadow-sm rounded-4 h-100">

                                <div className="card-body p-4">

                                    <div className="bg-success-subtle text-success rounded-3 p-3 d-inline-block">

                                        <i className="bi bi-box-seam fs-3"></i>

                                    </div>

                                    <h5 className="fw-bold text-dark mt-4">
                                        Manage Products
                                    </h5>

                                    <p className="text-secondary mb-0">
                                        Add, edit and delete products
                                        from the catalog.
                                    </p>

                                </div>

                            </div>

                        </Link>

                    </div>


                    {/* ENQUIRY MANAGEMENT */}
                    <div className="col-md-4">

                        <Link
                            to="/admin/enquiries"
                            className="text-decoration-none"
                        >

                            <div className="card border-0 shadow-sm rounded-4 h-100">

                                <div className="card-body p-4">

                                    <div className="bg-warning-subtle text-warning rounded-3 p-3 d-inline-block">

                                        <i className="bi bi-chat-left-text fs-3"></i>

                                    </div>

                                    <h5 className="fw-bold text-dark mt-4">
                                        Manage Enquiries
                                    </h5>

                                    <p className="text-secondary mb-0">
                                        View customer enquiries and
                                        update their status.
                                    </p>

                                </div>

                            </div>

                        </Link>

                    </div>


                    {/* QUOTATION MANAGEMENT */}
                    <div className="col-md-4">

                        <Link
                            to="/admin/quotations"
                            className="text-decoration-none"
                        >

                            <div className="card border-0 shadow-sm rounded-4 h-100">

                                <div className="card-body p-4">

                                    <div className="bg-info-subtle text-info rounded-3 p-3 d-inline-block">

                                        <i className="bi bi-file-earmark-text fs-3"></i>

                                    </div>

                                    <h5 className="fw-bold text-dark mt-4">
                                        Manage Quotations
                                    </h5>

                                    <p className="text-secondary mb-0">
                                        Create and manage quotation
                                        records for buyers.
                                    </p>

                                </div>

                            </div>

                        </Link>

                    </div>

                </div>


                {/* RECENT ENQUIRIES */}
                <section className="mt-5">

                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <h4 className="fw-bold mb-0">
                            Recent Enquiries
                        </h4>

                        <Link
                            to="/admin/enquiries"
                            className="btn btn-sm btn-outline-success"
                        >
                            View All
                        </Link>

                    </div>


                    <div className="card border-0 shadow-sm rounded-4">

                        <div className="card-body p-0">

                            {enquiries.length === 0 ? (

                                <div className="text-center py-5">

                                    <i className="bi bi-inbox fs-1 text-secondary"></i>

                                    <p className="text-secondary mt-3 mb-0">
                                        No enquiries available.
                                    </p>

                                </div>

                            ) : (

                                <div className="table-responsive">

                                    <table className="table table-hover align-middle mb-0">

                                        <thead className="table-light">

                                            <tr>

                                                <th className="px-4">
                                                    Customer
                                                </th>

                                                <th>
                                                    Product
                                                </th>

                                                <th>
                                                    Quantity
                                                </th>

                                                <th>
                                                    Status
                                                </th>

                                            </tr>

                                        </thead>

                                        <tbody>

                                            {enquiries
                                                .slice(-5)
                                                .reverse()
                                                .map((enquiry) => (

                                                    <tr key={enquiry.id}>

                                                        <td className="px-4">

                                                            <div className="fw-semibold">
                                                                {enquiry.name}
                                                            </div>

                                                            <small className="text-secondary">
                                                                {enquiry.email}
                                                            </small>

                                                        </td>

                                                        <td>
                                                            {enquiry.productName}
                                                        </td>

                                                        <td>
                                                            {enquiry.quantity}{" "}
                                                            {enquiry.unit}
                                                        </td>

                                                        <td>

                                                            <span className="badge bg-warning text-dark">
                                                                {enquiry.status}
                                                            </span>

                                                        </td>

                                                    </tr>

                                                ))}

                                        </tbody>

                                    </table>

                                </div>

                            )}

                        </div>

                    </div>

                </section>

            </div>

        </main>
    );
}

export default AdminDashboard;