import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getEnquiries,
    updateEnquiry,
    deleteEnquiry
} from "../services/api";

function AdminEnquiries() {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingId, setUpdatingId] = useState("");

    useEffect(() => {
        loadEnquiries();
    }, []);

    async function loadEnquiries() {
        try {
            setLoading(true);
            setError("");

            const data = await getEnquiries();
            setEnquiries(data);
        } catch (err) {
            console.error(err);
            setError("Unable to load enquiries.");
        } finally {
            setLoading(false);
        }
    }

    async function handleStatusChange(id, status) {
        try {
            setUpdatingId(id);

            const updatedEnquiry = await updateEnquiry(id, {
                status
            });

            setEnquiries((previousEnquiries) =>
                previousEnquiries.map((enquiry) =>
                    enquiry.id === id
                        ? updatedEnquiry
                        : enquiry
                )
            );
        } catch (err) {
            console.error(err);
            setError("Unable to update enquiry status.");
        } finally {
            setUpdatingId("");
        }
    }

    async function handleDelete(id) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this enquiry?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteEnquiry(id);

            setEnquiries((previousEnquiries) =>
                previousEnquiries.filter(
                    (enquiry) => enquiry.id !== id
                )
            );
        } catch (err) {
            console.error(err);
            setError("Unable to delete enquiry.");
        }
    }

    function getStatusClass(status) {
        if (status === "New") {
            return "bg-primary";
        }

        if (status === "Contacted") {
            return "bg-warning text-dark";
        }

        if (status === "Quoted") {
            return "bg-info text-dark";
        }

        if (status === "Closed") {
            return "bg-success";
        }

        return "bg-secondary";
    }

    return (
        <div className="container py-5">

            {/* Header */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">

                <div>
                    <Link
                        to="/admin"
                        className="text-decoration-none text-secondary small"
                    >
                        ← Back to Admin Dashboard
                    </Link>

                    <h2 className="fw-bold mt-2 mb-1">
                        Enquiry Management
                    </h2>

                    <p className="text-secondary mb-0">
                        View and manage buyer enquiries.
                    </p>
                </div>

                <button
                    className="btn btn-outline-success"
                    onClick={loadEnquiries}
                >
                    <i className="bi bi-arrow-clockwise me-2"></i>
                    Refresh
                </button>

            </div>

            {/* Error */}
            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {/* Loading */}
            {loading ? (
                <div className="text-center py-5">
                    <div
                        className="spinner-border text-success"
                        role="status"
                    ></div>

                    <p className="text-secondary mt-3">
                        Loading enquiries...
                    </p>
                </div>
            ) : enquiries.length === 0 ? (

                /* Empty state */
                <div className="card border-0 shadow-sm">
                    <div className="card-body text-center py-5">

                        <i className="bi bi-inbox display-4 text-secondary"></i>

                        <h5 className="fw-bold mt-3">
                            No enquiries found
                        </h5>

                        <p className="text-secondary mb-0">
                            Buyer enquiries will appear here.
                        </p>

                    </div>
                </div>

            ) : (

                /* Enquiries table */
                <div className="card border-0 shadow-sm">

                    <div className="card-header bg-white py-3">
                        <h5 className="mb-0 fw-bold">
                            All Enquiries
                            <span className="badge bg-success ms-2">
                                {enquiries.length}
                            </span>
                        </h5>
                    </div>

                    <div className="table-responsive">

                        <table className="table table-hover align-middle mb-0">

                            <thead className="table-light">
                                <tr>
                                    <th>Buyer</th>
                                    <th>Company</th>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Country</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>

                                {enquiries.map((enquiry) => (

                                    <tr key={enquiry.id}>

                                        {/* Buyer */}
                                        <td>
                                            <div className="fw-semibold">
                                                {enquiry.name}
                                            </div>

                                            <div className="small text-secondary">
                                                {enquiry.email}
                                            </div>
                                        </td>

                                        {/* Company */}
                                        <td>
                                            {enquiry.company || "-"}
                                        </td>

                                        {/* Product */}
                                        <td>
                                            <span className="fw-semibold">
                                                {enquiry.productName || "-"}
                                            </span>
                                        </td>

                                        {/* Quantity */}
                                        <td>
                                            {enquiry.quantity
                                                ? `${enquiry.quantity} ${enquiry.unit || ""}`
                                                : "-"
                                            }
                                        </td>

                                        {/* Country */}
                                        <td>
                                            {enquiry.country || "-"}
                                        </td>

                                        {/* Date */}
                                        <td>
                                            {enquiry.createdAt
                                                ? new Date(
                                                    enquiry.createdAt
                                                ).toLocaleDateString()
                                                : "-"
                                            }
                                        </td>

                                        {/* Status */}
                                        <td>
                                            <select
                                                className={`form-select form-select-sm`}
                                                value={enquiry.status || "New"}
                                                disabled={
                                                    updatingId === enquiry.id
                                                }
                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        enquiry.id,
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="New">
                                                    New
                                                </option>

                                                <option value="Contacted">
                                                    Contacted
                                                </option>

                                                <option value="Quoted">
                                                    Quoted
                                                </option>

                                                <option value="Closed">
                                                    Closed
                                                </option>
                                            </select>

                                            <span
                                                className={`badge ${getStatusClass(
                                                    enquiry.status
                                                )} mt-1`}
                                            >
                                                {enquiry.status || "New"}
                                            </span>
                                        </td>

                                        {/* Action */}
                                        <td>
                                            <div className="d-flex gap-1">
                                                <Link
                                                    to={`/admin/quotations?enquiryId=${enquiry.id}&buyerName=${encodeURIComponent(enquiry.name || "")}&productName=${encodeURIComponent(enquiry.productName || "")}&quantity=${enquiry.quantity || ""}&unit=${enquiry.unit || "KG"}`}
                                                    className="btn btn-sm btn-outline-success"
                                                    title="Generate Quotation"
                                                >
                                                    <i className="bi bi-file-earmark-plus"></i> Quote
                                                </Link>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    title="Delete Enquiry"
                                                    onClick={() =>
                                                        handleDelete(
                                                            enquiry.id
                                                        )
                                                    }
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>
            )}

        </div>
    );
}

export default AdminEnquiries;