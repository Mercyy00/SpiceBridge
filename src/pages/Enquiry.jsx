import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getProducts, createEnquiry } from "../services/api";

function Enquiry() {
    const [searchParams] = useSearchParams();
    const { user } = useAuth();
    const queryProductId = searchParams.get("productId") || searchParams.get("product") || "";

    const [products, setProducts] = useState([]);

    const [formData, setFormData] = useState({
        name: user?.name || "",
        company: "",
        email: user?.email || "",
        phone: "",
        country: "",
        productId: queryProductId,
        quantity: "",
        unit: "KG",
        packaging: "",
        message: ""
    });

    const [loading, setLoading] = useState(false);
    const [loadingProducts, setLoadingProducts] = useState(true);

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");


    // Load products from database
    useEffect(() => {

        async function loadProducts() {

            try {

                const data = await getProducts();

                setProducts(data);

            } catch (err) {

                console.error(err);
                setError("Unable to load products.");

            } finally {

                setLoadingProducts(false);

            }
        }

        loadProducts();

    }, []);


    // Handle input changes
    function handleChange(e) {

        const { name, value } = e.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));

    }


    // Submit enquiry
    async function handleSubmit(e) {

        e.preventDefault();

        setSuccess("");
        setError("");
        setLoading(true);

        try {

            const selectedProduct = products.find(
                (product) => product.id === formData.productId
            );

            const enquiryData = {
                id: `enq-${Date.now()}`,

                ...formData,

                productName: selectedProduct
                    ? selectedProduct.name
                    : "",

                status: "New",

                createdAt: new Date().toISOString()
            };


            await createEnquiry(enquiryData);


            setSuccess(
                "Your enquiry has been submitted successfully."
            );


            // Clear form
            setFormData({
                name: "",
                company: "",
                email: "",
                phone: "",
                country: "",
                productId: "",
                quantity: "",
                unit: "KG",
                packaging: "",
                message: ""
            });

        } catch (err) {

            console.error(err);

            setError(
                "Unable to submit enquiry. Please try again."
            );

        } finally {

            setLoading(false);

        }

    }


    return (
        <main>

            {/* PAGE HEADER */}
            <section className="bg-light py-5">

                <div className="container text-center py-4">

                    <p className="text-success fw-semibold mb-2">
                        BUSINESS ENQUIRY
                    </p>

                    <h1 className="display-5 fw-bold">
                        Send an Enquiry
                    </h1>

                    <p
                        className="text-secondary mx-auto mt-3"
                        style={{ maxWidth: "700px" }}
                    >
                        Tell us what products you need, along with your
                        quantity and packaging requirements.
                    </p>

                </div>

            </section>


            {/* FORM SECTION */}
            <section className="py-5">

                <div className="container">

                    <div className="row justify-content-center">

                        <div className="col-lg-9">

                            <div className="card border-0 shadow-sm rounded-4">

                                <div className="card-body p-4 p-md-5">

                                    {/* SUCCESS MESSAGE */}
                                    {success && (
                                        <div
                                            className="alert alert-success"
                                            role="alert"
                                        >
                                            <i className="bi bi-check-circle-fill me-2"></i>
                                            {success}
                                        </div>
                                    )}


                                    {/* ERROR MESSAGE */}
                                    {error && (
                                        <div
                                            className="alert alert-danger"
                                            role="alert"
                                        >
                                            <i className="bi bi-exclamation-circle-fill me-2"></i>
                                            {error}
                                        </div>
                                    )}

                                    {/* PRE-SELECTED PRODUCT NOTICE */}
                                    {formData.productId && products.find(p => p.id === formData.productId) && (
                                        <div className="alert alert-success bg-success-subtle border-0 d-flex align-items-center gap-3 mb-4 rounded-3">
                                            <i className="bi bi-box-seam-fill text-success fs-3"></i>
                                            <div>
                                                <small className="text-secondary d-block">Selected Commodity:</small>
                                                <strong className="text-dark">{products.find(p => p.id === formData.productId)?.name}</strong>
                                                <span className="badge bg-success ms-2">Pre-selected</span>
                                            </div>
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit}>

                                        {/* BUYER INFORMATION */}
                                        <h4 className="fw-bold mb-4">
                                            Buyer Information
                                        </h4>


                                        <div className="row g-4">

                                            {/* NAME */}
                                            <div className="col-md-6">

                                                <label className="form-label fw-semibold">
                                                    Full Name
                                                </label>

                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control form-control-lg"
                                                    placeholder="Enter your name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                />

                                            </div>


                                            {/* COMPANY */}
                                            <div className="col-md-6">

                                                <label className="form-label fw-semibold">
                                                    Company Name
                                                </label>

                                                <input
                                                    type="text"
                                                    name="company"
                                                    className="form-control form-control-lg"
                                                    placeholder="Enter company name"
                                                    value={formData.company}
                                                    onChange={handleChange}
                                                    required
                                                />

                                            </div>


                                            {/* EMAIL */}
                                            <div className="col-md-6">

                                                <label className="form-label fw-semibold">
                                                    Email Address
                                                </label>

                                                <input
                                                    type="email"
                                                    name="email"
                                                    className="form-control form-control-lg"
                                                    placeholder="you@example.com"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                />

                                            </div>


                                            {/* PHONE */}
                                            <div className="col-md-6">

                                                <label className="form-label fw-semibold">
                                                    Phone Number
                                                </label>

                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    className="form-control form-control-lg"
                                                    placeholder="+91 98765 43210"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    required
                                                />

                                            </div>


                                            {/* COUNTRY */}
                                            <div className="col-md-6">

                                                <label className="form-label fw-semibold">
                                                    Country
                                                </label>

                                                <input
                                                    type="text"
                                                    name="country"
                                                    className="form-control form-control-lg"
                                                    placeholder="Enter your country"
                                                    value={formData.country}
                                                    onChange={handleChange}
                                                    required
                                                />

                                            </div>

                                        </div>


                                        <hr className="my-5" />


                                        {/* PRODUCT REQUIREMENTS */}
                                        <h4 className="fw-bold mb-4">
                                            Product Requirements
                                        </h4>


                                        <div className="row g-4">

                                            {/* PRODUCT */}
                                            <div className="col-md-6">

                                                <label className="form-label fw-semibold">
                                                    Select Product
                                                </label>

                                                <select
                                                    name="productId"
                                                    className="form-select form-select-lg"
                                                    value={formData.productId}
                                                    onChange={handleChange}
                                                    required
                                                    disabled={loadingProducts}
                                                >

                                                    <option value="">
                                                        {loadingProducts
                                                            ? "Loading products..."
                                                            : "Select a product"
                                                        }
                                                    </option>

                                                    {products.map((product) => (

                                                        <option
                                                            key={product.id}
                                                            value={product.id}
                                                        >
                                                            {product.name}
                                                        </option>

                                                    ))}

                                                </select>

                                            </div>


                                            {/* QUANTITY */}
                                            <div className="col-md-4">

                                                <label className="form-label fw-semibold">
                                                    Quantity
                                                </label>

                                                <input
                                                    type="number"
                                                    name="quantity"
                                                    className="form-control form-control-lg"
                                                    placeholder="e.g. 500"
                                                    min="1"
                                                    value={formData.quantity}
                                                    onChange={handleChange}
                                                    required
                                                />

                                            </div>


                                            {/* UNIT */}
                                            <div className="col-md-2">

                                                <label className="form-label fw-semibold">
                                                    Unit
                                                </label>

                                                <select
                                                    name="unit"
                                                    className="form-select form-select-lg"
                                                    value={formData.unit}
                                                    onChange={handleChange}
                                                >

                                                    <option value="KG">
                                                        KG
                                                    </option>

                                                    <option value="MT">
                                                        MT
                                                    </option>

                                                    <option value="TON">
                                                        TON
                                                    </option>

                                                </select>

                                            </div>


                                            {/* PACKAGING */}
                                            <div className="col-12">

                                                <label className="form-label fw-semibold">
                                                    Packaging Requirement
                                                </label>

                                                <input
                                                    type="text"
                                                    name="packaging"
                                                    className="form-control form-control-lg"
                                                    placeholder="Example: 25 kg PP Bags"
                                                    value={formData.packaging}
                                                    onChange={handleChange}
                                                    required
                                                />

                                            </div>


                                            {/* MESSAGE */}
                                            <div className="col-12">

                                                <label className="form-label fw-semibold">
                                                    Additional Requirements
                                                </label>

                                                <textarea
                                                    name="message"
                                                    className="form-control"
                                                    rows="5"
                                                    placeholder="Tell us about your specifications, destination port, quality requirements, etc."
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                ></textarea>

                                            </div>

                                        </div>


                                        {/* SUBMIT */}
                                        <div className="d-grid mt-5">

                                            <button
                                                type="submit"
                                                className="btn btn-success btn-lg"
                                                disabled={loading}
                                            >

                                                {loading ? (
                                                    <>
                                                        <span
                                                            className="spinner-border spinner-border-sm me-2"
                                                            role="status"
                                                        ></span>

                                                        Submitting...
                                                    </>
                                                ) : (
                                                    <>
                                                        Submit Enquiry
                                                        <i className="bi bi-send ms-2"></i>
                                                    </>
                                                )}

                                            </button>

                                        </div>

                                    </form>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* INFORMATION */}
            <section className="bg-light py-5">

                <div className="container">

                    <div className="row g-4 text-center">

                        <div className="col-md-4">

                            <i className="bi bi-box-seam text-success fs-1"></i>

                            <h5 className="fw-bold mt-3">
                                Product Specifications
                            </h5>

                            <p className="text-secondary mb-0">
                                Share your required product and
                                specifications.
                            </p>

                        </div>


                        <div className="col-md-4">

                            <i className="bi bi-file-earmark-text text-success fs-1"></i>

                            <h5 className="fw-bold mt-3">
                                Quotation
                            </h5>

                            <p className="text-secondary mb-0">
                                Your enquiry can be processed into
                                a quotation.
                            </p>

                        </div>


                        <div className="col-md-4">

                            <i className="bi bi-globe2 text-success fs-1"></i>

                            <h5 className="fw-bold mt-3">
                                Global Supply
                            </h5>

                            <p className="text-secondary mb-0">
                                Product requirements can include
                                international destinations.
                            </p>

                        </div>

                    </div>

                </div>

            </section>

        </main>
    );
}

export default Enquiry;