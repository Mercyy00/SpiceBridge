import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
    getProducts,
    getEnquiries,
    getQuotations
} from "../services/api";

function Dashboard() {
    const { user } = useAuth();

    const [stats, setStats] = useState({
        products: 0,
        enquiries: 0,
        quotations: 0
    });

    const [myEnquiries, setMyEnquiries] = useState([]);
    const [myQuotations, setMyQuotations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        async function loadDashboardData() {
            try {
                const [products, enquiries, quotations] = await Promise.all([
                    getProducts(),
                    getEnquiries(),
                    getQuotations()
                ]);

                if (isMounted) {
                    setStats({
                        products: products.length,
                        enquiries: enquiries.length,
                        quotations: quotations.length
                    });

                    // Filter enquiries for the current user (by email or name, or all if admin)
                    if (user?.role === "admin") {
                        setMyEnquiries(enquiries);
                        setMyQuotations(quotations);
                    } else {
                        const userEnquiries = enquiries.filter(
                            (e) =>
                                (e.email && e.email.toLowerCase() === user?.email?.toLowerCase()) ||
                                (e.name && e.name.toLowerCase() === user?.name?.toLowerCase())
                        );
                        setMyEnquiries(userEnquiries);

                        // Find quotations matching this user's enquiries or buyerName
                        const userQuotations = quotations.filter(
                            (q) =>
                                (q.buyerName && q.buyerName.toLowerCase().includes(user?.name?.toLowerCase())) ||
                                userEnquiries.some((ue) => ue.id === q.enquiryId)
                        );
                        setMyQuotations(userQuotations);
                    }
                }
            } catch (error) {
                if (isMounted) {
                    console.error("Dashboard data error:", error);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        loadDashboardData();

        return () => {
            isMounted = false;
        };
    }, [user]);

    function getStatusBadge(status) {
        switch (status) {
            case "New":
                return "bg-primary";
            case "Contacted":
                return "bg-warning text-dark";
            case "Quoted":
                return "bg-info text-dark";
            case "Closed":
            case "Accepted":
                return "bg-success";
            case "Rejected":
                return "bg-danger";
            default:
                return "bg-secondary";
        }
    }

    return (
        <main className="bg-light min-vh-100 py-5">
            <div className="container">

                {/* HEADER */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
                    <div>
                        <p className="text-success fw-semibold mb-1">
                            BUYER PORTAL
                        </p>
                        <h1 className="fw-bold mb-1">
                            Welcome, {user?.name || "User"}
                        </h1>
                        <p className="text-secondary mb-0">
                            Track your sourcing enquiries, inspect quotations and manage your export profile.
                        </p>
                    </div>

                    <div className="d-flex gap-2">
                        <Link to="/enquiry" className="btn btn-success px-4">
                            <i className="bi bi-send me-2"></i>
                            New Enquiry
                        </Link>
                        {user?.role === "admin" && (
                            <Link to="/admin" className="btn btn-outline-success">
                                <i className="bi bi-speedometer2 me-2"></i>
                                Admin Panel
                            </Link>
                        )}
                    </div>
                </div>

                {/* ADMIN NOTICE BANNER */}
                {user?.role === "admin" && (
                    <div className="alert alert-success d-flex align-items-center justify-content-between p-3 rounded-4 mb-4 shadow-sm">
                        <div className="d-flex align-items-center gap-3">
                            <i className="bi bi-shield-check fs-2 text-success"></i>
                            <div>
                                <strong className="d-block">Administrator Access Active</strong>
                                <small className="text-secondary">You have full administrative privileges to edit product catalog, review enquiries, and issue quotations.</small>
                            </div>
                        </div>
                        <Link to="/admin" className="btn btn-success btn-sm px-3">
                            Open Admin Suite →
                        </Link>
                    </div>
                )}

                {/* USER PROFILE CARD */}
                <div className="card border-0 shadow-sm rounded-4 mb-4">
                    <div className="card-body p-4">
                        <div className="row align-items-center g-4">
                            <div className="col-md-8">
                                <div className="d-flex align-items-center gap-3">
                                    <div
                                        className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                                        style={{ width: "65px", height: "65px" }}
                                    >
                                        <i className="bi bi-person fs-3"></i>
                                    </div>
                                    <div>
                                        <h5 className="fw-bold mb-1">
                                            {user?.name}
                                        </h5>
                                        <p className="text-secondary mb-1">
                                            <i className="bi bi-envelope me-1"></i>
                                            {user?.email}
                                        </p>
                                        <div className="d-flex gap-2 align-items-center">
                                            <span className="badge bg-success text-capitalize">
                                                Role: {user?.role}
                                            </span>
                                            <span className="badge bg-light text-secondary border">
                                                ID: {user?.id}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4 text-md-end">
                                <Link
                                    to="/products"
                                    className="btn btn-outline-success"
                                >
                                    Browse Products
                                    <i className="bi bi-arrow-right ms-2"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* STATISTICS CARDS */}
                <div className="row g-4 mb-5">
                    {/* AVAILABLE PRODUCTS */}
                    <div className="col-md-4">
                        <div className="card border-0 shadow-sm rounded-4 h-100">
                            <div className="card-body p-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <p className="text-secondary mb-1">
                                            Available Products
                                        </p>
                                        <h2 className="fw-bold mb-0">
                                            {loading ? "..." : stats.products}
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
                                            {user?.role === "admin" ? "Total Enquiries" : "My Enquiries"}
                                        </p>
                                        <h2 className="fw-bold mb-0">
                                            {loading ? "..." : (user?.role === "admin" ? stats.enquiries : myEnquiries.length)}
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
                                            {user?.role === "admin" ? "Total Quotations" : "Quotations Received"}
                                        </p>
                                        <h2 className="fw-bold mb-0">
                                            {loading ? "..." : (user?.role === "admin" ? stats.quotations : myQuotations.length)}
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

                {/* MY ENQUIRIES TABLE */}
                <div className="card border-0 shadow-sm rounded-4 mb-5">
                    <div className="card-header bg-white border-0 p-4 pb-0 d-flex justify-content-between align-items-center">
                        <div>
                            <h4 className="fw-bold mb-1">
                                {user?.role === "admin" ? "All System Enquiries" : "My Sourcing Enquiries"}
                            </h4>
                            <p className="text-secondary small mb-0">
                                Real-time status of submitted spice inquiries
                            </p>
                        </div>
                        <Link to="/enquiry" className="btn btn-sm btn-outline-success">
                            <i className="bi bi-plus-circle me-1"></i>
                            New Request
                        </Link>
                    </div>

                    <div className="card-body p-4">
                        {loading ? (
                            <div className="text-center py-4">
                                <div className="spinner-border text-success" role="status"></div>
                            </div>
                        ) : myEnquiries.length === 0 ? (
                            <div className="text-center py-5">
                                <i className="bi bi-inbox fs-1 text-secondary d-block mb-3"></i>
                                <h5>No enquiries submitted yet</h5>
                                <p className="text-secondary">Explore our catalog and submit an enquiry for spices or agro commodities.</p>
                                <Link to="/products" className="btn btn-success mt-2">
                                    Browse Product Catalog
                                </Link>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Product</th>
                                            <th>Quantity</th>
                                            <th>Destination</th>
                                            <th>Packaging</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {myEnquiries.map((enq) => (
                                            <tr key={enq.id}>
                                                <td>
                                                    <strong>{enq.productName || "Spice Commodity"}</strong>
                                                    {enq.company && (
                                                        <small className="d-block text-secondary">{enq.company}</small>
                                                    )}
                                                </td>
                                                <td>
                                                    {enq.quantity} {enq.unit || "KG"}
                                                </td>
                                                <td>
                                                    <i className="bi bi-geo-alt text-danger me-1"></i>
                                                    {enq.country || "International"}
                                                </td>
                                                <td>
                                                    <small className="text-secondary">{enq.packaging || "Standard PP Bags"}</small>
                                                </td>
                                                <td>
                                                    <small className="text-secondary">
                                                        {enq.createdAt ? new Date(enq.createdAt).toLocaleDateString() : "-"}
                                                    </small>
                                                </td>
                                                <td>
                                                    <span className={`badge ${getStatusBadge(enq.status)}`}>
                                                        {enq.status || "New"}
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

                {/* MY QUOTATIONS TABLE */}
                {myQuotations.length > 0 && (
                    <div className="card border-0 shadow-sm rounded-4 mb-5">
                        <div className="card-header bg-white border-0 p-4 pb-0">
                            <h4 className="fw-bold mb-1">
                                {user?.role === "admin" ? "All Commercial Quotations" : "Commercial Quotations"}
                            </h4>
                            <p className="text-secondary small mb-0">
                                Pricing and FOB/CIF offers issued for your inquiries
                            </p>
                        </div>
                        <div className="card-body p-4">
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Quotation ID</th>
                                            <th>Product</th>
                                            <th>Quantity</th>
                                            <th>Unit Price</th>
                                            <th>Validity</th>
                                            <th>Status</th>
                                            <th>Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {myQuotations.map((q) => (
                                            <tr key={q.id}>
                                                <td>
                                                    <span className="badge bg-light text-dark border">
                                                        {q.id}
                                                    </span>
                                                </td>
                                                <td>
                                                    <strong>{q.productName}</strong>
                                                </td>
                                                <td>
                                                    {q.quantity} {q.unit}
                                                </td>
                                                <td>
                                                    <strong className="text-success">
                                                        ${q.price} {q.currency || "USD"}
                                                    </strong>
                                                </td>
                                                <td>
                                                    <small className="text-secondary">{q.validity || "15 days"}</small>
                                                </td>
                                                <td>
                                                    <span className={`badge ${getStatusBadge(q.status)}`}>
                                                        {q.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <small className="text-secondary">{q.notes || "Standard terms apply."}</small>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* QUICK ACTIONS */}
                <section>
                    <h4 className="fw-bold mb-4">Quick Actions</h4>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <Link to="/products" className="text-decoration-none">
                                <div className="card border-0 shadow-sm rounded-4 h-100">
                                    <div className="card-body p-4">
                                        <i className="bi bi-box-seam text-success fs-2"></i>
                                        <h5 className="fw-bold text-dark mt-3">View Products</h5>
                                        <p className="text-secondary mb-0">
                                            Explore available spices, grains and agro products.
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div className="col-md-4">
                            <Link to="/enquiry" className="text-decoration-none">
                                <div className="card border-0 shadow-sm rounded-4 h-100">
                                    <div className="card-body p-4">
                                        <i className="bi bi-send text-success fs-2"></i>
                                        <h5 className="fw-bold text-dark mt-3">Send Enquiry</h5>
                                        <p className="text-secondary mb-0">
                                            Submit your product and quantity requirements.
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div className="col-md-4">
                            <Link to="/contact" className="text-decoration-none">
                                <div className="card border-0 shadow-sm rounded-4 h-100">
                                    <div className="card-body p-4">
                                        <i className="bi bi-envelope text-success fs-2"></i>
                                        <h5 className="fw-bold text-dark mt-3">Contact Us</h5>
                                        <p className="text-secondary mb-0">
                                            Contact the SpiceBridge export team directly.
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>

            </div>
        </main>
    );
}

export default Dashboard;