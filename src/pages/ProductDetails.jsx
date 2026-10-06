import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct, getProducts, getCategories } from "../services/api";

function ProductDetails() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        async function loadProductData() {
            setLoading(true);
            setError("");

            try {
                const [productData, allProducts, categoriesData] = await Promise.all([
                    getProduct(id),
                    getProducts(),
                    getCategories()
                ]);

                if (isMounted) {
                    setProduct(productData);
                    setCategories(categoriesData);

                    // Find related products in same category (excluding current product)
                    const related = allProducts.filter(
                        (p) => p.categoryId === productData.categoryId && String(p.id) !== String(productData.id)
                    ).slice(0, 3);
                    setRelatedProducts(related);
                }
            } catch (err) {
                if (isMounted) {
                    console.error("Failed to load product details:", err);
                    setError("Unable to find the requested spice product.");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        loadProductData();

        return () => {
            isMounted = false;
        };
    }, [id]);

    function getCategoryName(categoryId) {
        const cat = categories.find((c) => c.id === categoryId);
        return cat ? cat.name : "Spice Commodity";
    }

    if (loading) {
        return (
            <div className="container py-5 text-center" style={{ minHeight: "50vh" }}>
                <div className="spinner-border text-success my-5" role="status"></div>
                <p className="text-secondary">Loading product specifications...</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="container py-5 text-center" style={{ minHeight: "50vh" }}>
                <div className="alert alert-warning d-inline-block px-5 py-4 shadow-sm rounded-4">
                    <i className="bi bi-exclamation-triangle-fill fs-1 text-warning mb-3 d-block"></i>
                    <h4 className="fw-bold">Product Not Found</h4>
                    <p className="text-secondary mb-4">{error || "The product specification sheet could not be located."}</p>
                    <Link to="/products" className="btn btn-success px-4">
                        <i className="bi bi-arrow-left me-2"></i>
                        Return to Catalog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="bg-light py-5">
            <div className="container">
                {/* Breadcrumbs */}
                <nav aria-label="breadcrumb" className="mb-4">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/" className="text-decoration-none text-success">
                                Home
                            </Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to="/products" className="text-decoration-none text-success">
                                Products
                            </Link>
                        </li>
                        <li className="breadcrumb-item active text-truncate" aria-current="page" style={{ maxWidth: "300px" }}>
                            {product.name}
                        </li>
                    </ol>
                </nav>

                {/* Product Detail Card */}
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-5">
                    <div className="row g-0">
                        {/* Image Column */}
                        <div className="col-lg-5 position-relative bg-dark d-flex align-items-center justify-content-center">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-100 h-100 object-fit-cover"
                                style={{ minHeight: "420px", maxHeight: "550px", objectFit: "cover" }}
                            />
                            {product.featured && (
                                <span className="position-absolute top-0 start-0 m-3 badge bg-warning text-dark px-3 py-2 shadow-sm rounded-pill">
                                    <i className="bi bi-star-fill me-1"></i> Featured Export Grade
                                </span>
                            )}
                        </div>

                        {/* Content Column */}
                        <div className="col-lg-7 p-4 p-md-5 d-flex flex-column justify-content-between">
                            <div>
                                <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                                    <span className="badge bg-success-subtle text-success px-3 py-2">
                                        {getCategoryName(product.categoryId)}
                                    </span>
                                    <span className="badge bg-light text-secondary border px-3 py-2">
                                        <i className="bi bi-geo-alt-fill text-danger me-1"></i>
                                        {product.origin}
                                    </span>
                                </div>

                                <h1 className="display-6 fw-bold mb-3">{product.name}</h1>
                                
                                <p className="text-secondary lead fs-6 mb-4">
                                    {product.description}
                                </p>

                                {/* Price & MOQ Highlight Box */}
                                <div className="bg-success-subtle p-3 rounded-4 mb-4 d-flex flex-wrap justify-content-between align-items-center gap-3">
                                    <div>
                                        <small className="text-secondary d-block fw-semibold text-uppercase">Indicative Export FOB Price</small>
                                        <span className="fs-3 fw-bold text-success">{product.priceRange}</span>
                                    </div>
                                    <div className="text-md-end">
                                        <small className="text-secondary d-block fw-semibold text-uppercase">Minimum Order Quantity (MOQ)</small>
                                        <span className="badge bg-success fs-6 px-3 py-2">{product.moq}</span>
                                    </div>
                                </div>

                                {/* Specifications Table */}
                                <h5 className="fw-bold mb-3 border-bottom pb-2">Technical Specifications</h5>
                                <div className="table-responsive mb-4">
                                    <table className="table table-bordered table-striped align-middle mb-0">
                                        <tbody>
                                            <tr>
                                                <th className="bg-light w-40 text-secondary">Export Grade / Variety</th>
                                                <td className="fw-semibold">{product.grade}</td>
                                            </tr>
                                            <tr>
                                                <th className="bg-light text-secondary">Moisture Content</th>
                                                <td>{product.moisture}</td>
                                            </tr>
                                            <tr>
                                                <th className="bg-light text-secondary">Standard Export Packaging</th>
                                                <td>{product.packaging}</td>
                                            </tr>
                                            <tr>
                                                <th className="bg-light text-secondary">Region of Origin</th>
                                                <td>{product.origin}</td>
                                            </tr>
                                            <tr>
                                                <th className="bg-light text-secondary">Compliance & Lab Testing</th>
                                                <td>
                                                    <i className="bi bi-check-circle-fill text-success me-1"></i>
                                                    FSSAI, Spices Board, ISO 22000, Microbiological Tested
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Call to Actions */}
                            <div className="d-flex flex-wrap gap-3 pt-3 border-top">
                                <Link
                                    to={`/enquiry?productId=${product.id}`}
                                    className="btn btn-success btn-lg px-4 flex-grow-1"
                                >
                                    <i className="bi bi-envelope-paper me-2"></i>
                                    Request Quotation for this Product
                                </Link>
                                <Link
                                    to="/products"
                                    className="btn btn-outline-secondary btn-lg px-4"
                                >
                                    <i className="bi bi-arrow-left me-1"></i>
                                    Back to Catalog
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quality Standards Banner */}
                <div className="card border-0 shadow-sm rounded-4 p-4 mb-5 bg-white">
                    <div className="row g-4 text-center">
                        <div className="col-md-3">
                            <i className="bi bi-shield-check text-success fs-2"></i>
                            <h6 className="fw-bold mt-2">Certified Purity</h6>
                            <small className="text-secondary">Adulteration-free with verified essential oils</small>
                        </div>
                        <div className="col-md-3">
                            <i className="bi bi-moisture text-success fs-2"></i>
                            <h6 className="fw-bold mt-2">Moisture Controlled</h6>
                            <small className="text-secondary">Machine dried to ensure long international transit viability</small>
                        </div>
                        <div className="col-md-3">
                            <i className="bi bi-box2 text-success fs-2"></i>
                            <h6 className="fw-bold mt-2">Export Packaging</h6>
                            <small className="text-secondary">Moisture-barrier multi-wall and food-grade PP bags</small>
                        </div>
                        <div className="col-md-3">
                            <i className="bi bi-file-earmark-medical text-success fs-2"></i>
                            <h6 className="fw-bold mt-2">Certificate of Analysis</h6>
                            <small className="text-secondary">Complete lab report provided with every shipment</small>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h3 className="fw-bold mb-0">Similar Export Products</h3>
                            <Link to="/products" className="btn btn-sm btn-outline-success">
                                View Full Catalog →
                            </Link>
                        </div>

                        <div className="row g-4">
                            {relatedProducts.map((rel) => (
                                <div className="col-md-4" key={rel.id}>
                                    <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                                        <img
                                            src={rel.image}
                                            alt={rel.name}
                                            className="card-img-top"
                                            style={{ height: "200px", objectFit: "cover" }}
                                        />
                                        <div className="card-body p-4">
                                            <h5 className="fw-bold mb-2">{rel.name}</h5>
                                            <p className="text-secondary small text-truncate-2 mb-3">
                                                {rel.description}
                                            </p>
                                            <div className="d-flex justify-content-between align-items-center text-secondary small mb-3">
                                                <span>Origin: <strong>{rel.origin}</strong></span>
                                                <span className="text-success fw-bold">{rel.priceRange}</span>
                                            </div>
                                            <div className="d-grid gap-2">
                                                <Link to={`/products/${rel.id}`} className="btn btn-outline-success btn-sm">
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}

export default ProductDetails;
