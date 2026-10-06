import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
    getQuotations,
    createQuotation,
    updateQuotation
} from "../services/api";

function AdminQuotations() {
    const [searchParams] = useSearchParams();
    const queryEnquiryId = searchParams.get("enquiryId") || "";
    const queryBuyerName = searchParams.get("buyerName") || "";
    const queryProductName = searchParams.get("productName") || "";
    const queryQuantity = searchParams.get("quantity") || "";
    const queryUnit = searchParams.get("unit") || "kg";

    const [quotations, setQuotations] = useState([]);

    const [formData, setFormData] = useState({
        enquiryId: queryEnquiryId,
        buyerName: queryBuyerName,
        productName: queryProductName,
        quantity: queryQuantity,
        unit: queryUnit,
        price: "",
        currency: "USD",
        validity: "15 days",
        status: "Draft",
        notes: queryEnquiryId ? `Generated for Enquiry ID: ${queryEnquiryId}` : ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        let isMounted = true;

        async function fetchQuotations() {
            try {
                const data = await getQuotations();
                if (isMounted) {
                    setQuotations(data);
                }
            } catch (err) {
                if (isMounted) {
                    console.error(err);
                    setError("Unable to load quotations.");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchQuotations();

        return () => {
            isMounted = false;
        };
    }, []);

    async function loadQuotations() {
        try {
            setLoading(true);
            setError("");

            const data = await getQuotations();
            setQuotations(data);
        } catch (err) {
            console.error(err);
            setError("Unable to load quotations.");
        } finally {
            setLoading(false);
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));
    }

    function handleEdit(quotation) {
        setEditingId(quotation.id);

        setFormData({
            enquiryId: quotation.enquiryId || "",
            buyerName: quotation.buyerName || "",
            productName: quotation.productName || "",
            quantity: quotation.quantity || "",
            unit: quotation.unit || "kg",
            price: quotation.price || "",
            currency: quotation.currency || "USD",
            validity: quotation.validity || "15 days",
            status: quotation.status || "Draft",
            notes: quotation.notes || ""
        });

        setSuccess("");
        setError("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    function handleCancelEdit() {
        setEditingId(null);

        setFormData({
            enquiryId: "",
            buyerName: "",
            productName: "",
            quantity: "",
            unit: "kg",
            price: "",
            currency: "USD",
            validity: "15 days",
            status: "Draft",
            notes: ""
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setSaving(true);
        setError("");
        setSuccess("");

        try {
            if (editingId) {
                const updatedQuotation = await updateQuotation(
                    editingId,
                    formData
                );

                setQuotations((previousQuotations) =>
                    previousQuotations.map((quotation) =>
                        quotation.id === editingId
                            ? updatedQuotation
                            : quotation
                    )
                );

                setSuccess("Quotation updated successfully.");
            } else {
                const newQuotation = {
                    id: `quotation-${Date.now()}`,
                    ...formData,
                    createdAt: new Date().toISOString()
                };

                const createdQuotation =
                    await createQuotation(newQuotation);

                setQuotations((previousQuotations) => [
                    ...previousQuotations,
                    createdQuotation
                ]);

                setSuccess("Quotation created successfully.");
            }

            handleCancelEdit();
        } catch (err) {
            console.error(err);
            setError("Unable to save quotation.");
        } finally {
            setSaving(false);
        }
    }

    function getStatusClass(status) {
        if (status === "Draft") {
            return "bg-secondary";
        }

        if (status === "Sent") {
            return "bg-primary";
        }

        if (status === "Accepted") {
            return "bg-success";
        }

        if (status === "Rejected") {
            return "bg-danger";
        }

        if (status === "Expired") {
            return "bg-warning text-dark";
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
                        Quotation Management
                    </h2>

                    <p className="text-secondary mb-0">
                        Create and manage quotations for buyers.
                    </p>
                </div>

                <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={loadQuotations}
                >
                    <i className="bi bi-arrow-clockwise me-2"></i>
                    Refresh
                </button>

            </div>

            {/* Messages */}
            {success && (
                <div className="alert alert-success">
                    {success}
                </div>
            )}

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {/* Quotation Form */}
            <div className="card border-0 shadow-sm mb-5">

                <div className="card-header bg-success text-white py-3">
                    <h5 className="mb-0 fw-bold">
                        {editingId
                            ? "Edit Quotation"
                            : "Create New Quotation"}
                    </h5>
                </div>

                <div className="card-body p-4">

                    <form onSubmit={handleSubmit}>

                        <div className="row g-3">

                            {/* Enquiry ID */}
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">
                                    Enquiry ID
                                </label>

                                <input
                                    type="text"
                                    name="enquiryId"
                                    className="form-control"
                                    placeholder="Enter enquiry ID"
                                    value={formData.enquiryId}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Buyer */}
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">
                                    Buyer Name
                                </label>

                                <input
                                    type="text"
                                    name="buyerName"
                                    className="form-control"
                                    placeholder="Enter buyer name"
                                    value={formData.buyerName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Product */}
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">
                                    Product Name
                                </label>

                                <input
                                    type="text"
                                    name="productName"
                                    className="form-control"
                                    placeholder="Enter product name"
                                    value={formData.productName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Quantity */}
                            <div className="col-md-3">
                                <label className="form-label fw-semibold">
                                    Quantity
                                </label>

                                <input
                                    type="number"
                                    name="quantity"
                                    className="form-control"
                                    placeholder="Quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Unit */}
                            <div className="col-md-3">
                                <label className="form-label fw-semibold">
                                    Unit
                                </label>

                                <select
                                    name="unit"
                                    className="form-select"
                                    value={formData.unit}
                                    onChange={handleChange}
                                >
                                    <option value="kg">kg</option>
                                    <option value="MT">MT</option>
                                    <option value="Ton">Ton</option>
                                </select>
                            </div>

                            {/* Price */}
                            <div className="col-md-4">
                                <label className="form-label fw-semibold">
                                    Price
                                </label>

                                <input
                                    type="number"
                                    step="0.01"
                                    name="price"
                                    className="form-control"
                                    placeholder="Enter price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Currency */}
                            <div className="col-md-4">
                                <label className="form-label fw-semibold">
                                    Currency
                                </label>

                                <select
                                    name="currency"
                                    className="form-select"
                                    value={formData.currency}
                                    onChange={handleChange}
                                >
                                    <option value="USD">
                                        USD
                                    </option>

                                    <option value="EUR">
                                        EUR
                                    </option>

                                    <option value="GBP">
                                        GBP
                                    </option>

                                    <option value="INR">
                                        INR
                                    </option>
                                </select>
                            </div>

                            {/* Validity */}
                            <div className="col-md-4">
                                <label className="form-label fw-semibold">
                                    Validity
                                </label>

                                <select
                                    name="validity"
                                    className="form-select"
                                    value={formData.validity}
                                    onChange={handleChange}
                                >
                                    <option value="7 days">
                                        7 days
                                    </option>

                                    <option value="15 days">
                                        15 days
                                    </option>

                                    <option value="30 days">
                                        30 days
                                    </option>
                                </select>
                            </div>

                            {/* Status */}
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">
                                    Status
                                </label>

                                <select
                                    name="status"
                                    className="form-select"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option value="Draft">
                                        Draft
                                    </option>

                                    <option value="Sent">
                                        Sent
                                    </option>

                                    <option value="Accepted">
                                        Accepted
                                    </option>

                                    <option value="Rejected">
                                        Rejected
                                    </option>

                                    <option value="Expired">
                                        Expired
                                    </option>
                                </select>
                            </div>

                            {/* Notes */}
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">
                                    Notes
                                </label>

                                <textarea
                                    name="notes"
                                    className="form-control"
                                    rows="3"
                                    placeholder="Additional quotation notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                        </div>

                        {/* Buttons */}
                        <div className="d-flex gap-2 mt-4">

                            <button
                                type="submit"
                                className="btn btn-success px-4"
                                disabled={saving}
                            >
                                {saving ? (
                                    <>
                                        <span
                                            className="spinner-border spinner-border-sm me-2"
                                            role="status"
                                        ></span>

                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-check-lg me-2"></i>

                                        {editingId
                                            ? "Update Quotation"
                                            : "Create Quotation"}
                                    </>
                                )}
                            </button>

                            {editingId && (
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={handleCancelEdit}
                                >
                                    Cancel
                                </button>
                            )}

                        </div>

                    </form>

                </div>
            </div>

            {/* Quotations Table */}
            <div className="card border-0 shadow-sm">

                <div className="card-header bg-white py-3">
                    <h5 className="mb-0 fw-bold">
                        All Quotations

                        <span className="badge bg-success ms-2">
                            {quotations.length}
                        </span>
                    </h5>
                </div>

                {loading ? (

                    <div className="text-center py-5">

                        <div
                            className="spinner-border text-success"
                            role="status"
                        ></div>

                        <p className="text-secondary mt-3 mb-0">
                            Loading quotations...
                        </p>

                    </div>

                ) : quotations.length === 0 ? (

                    <div className="text-center py-5">

                        <i className="bi bi-file-earmark-text display-4 text-secondary"></i>

                        <h5 className="fw-bold mt-3">
                            No quotations yet
                        </h5>

                        <p className="text-secondary mb-0">
                            Create your first quotation using the form above.
                        </p>

                    </div>

                ) : (

                    <div className="table-responsive">

                        <table className="table table-hover align-middle mb-0">

                            <thead className="table-light">

                                <tr>
                                    <th>Buyer</th>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Validity</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>

                            </thead>

                            <tbody>

                                {quotations.map((quotation) => (

                                    <tr key={quotation.id}>

                                        <td>
                                            <div className="fw-semibold">
                                                {quotation.buyerName}
                                            </div>

                                            <div className="small text-secondary">
                                                {quotation.enquiryId}
                                            </div>
                                        </td>

                                        <td>
                                            {quotation.productName}
                                        </td>

                                        <td>
                                            {quotation.quantity}{" "}
                                            {quotation.unit}
                                        </td>

                                        <td className="fw-semibold">
                                            {quotation.currency}{" "}
                                            {quotation.price}
                                        </td>

                                        <td>
                                            {quotation.validity}
                                        </td>

                                        <td>
                                            <span
                                                className={`badge ${getStatusClass(
                                                    quotation.status
                                                )}`}
                                            >
                                                {quotation.status}
                                            </span>
                                        </td>

                                        <td>
                                            {quotation.createdAt
                                                ? new Date(
                                                    quotation.createdAt
                                                ).toLocaleDateString()
                                                : "-"}
                                        </td>

                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() =>
                                                    handleEdit(
                                                        quotation
                                                    )
                                                }
                                            >
                                                <i className="bi bi-pencil"></i>
                                            </button>
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
}

export default AdminQuotations;