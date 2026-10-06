import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    getProducts,
    getCategories,
    getCountries,
    getCertifications
} from "../services/api";

function Home() {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [countries, setCountries] = useState([]);
    const [certifications, setCertifications] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function loadHomeData() {

            try {

                const [
                    productsData,
                    categoriesData,
                    countriesData,
                    certificationsData
                ] = await Promise.all([
                    getProducts(),
                    getCategories(),
                    getCountries(),
                    getCertifications()
                ]);

                setProducts(productsData);
                setCategories(categoriesData);
                setCountries(countriesData);
                setCertifications(certificationsData);

            } catch (err) {

                console.error(err);
                setError("Unable to load data from the server.");

            } finally {

                setLoading(false);

            }
        }

        loadHomeData();

    }, []);

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-success" role="status"></div>
                <p className="mt-3">Loading SpiceBridge...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-5">
                <div className="alert alert-danger text-center">
                    {error}
                    <br />
                    <small className="text-secondary">
                        Tip: Run <code>npm start</code> to launch both frontend and backend together.
                    </small>
                </div>
            </div>
        );
    }

    const featuredProducts = products.filter(
        (product) => product.featured
    );

    return (
        <main>

            {/* HERO SECTION */}
            <section className="bg-light py-5">
                <div className="container py-5">

                    <div className="row align-items-center g-5">

                        <div className="col-lg-6">

                            <span className="badge bg-success-subtle text-success px-3 py-2 mb-3">
                                Indian Spices & Agro Products
                            </span>

                            <h1 className="display-4 fw-bold mb-4">
                                Quality Products.
                                <br />
                                <span className="text-success">
                                    Global Connections.
                                </span>
                            </h1>

                            <p className="lead text-secondary mb-4">
                                SpiceBridge connects international buyers
                                with quality Indian spices, grains, pulses
                                and agro products.
                            </p>

                            <div className="d-flex flex-wrap gap-3">

                                <Link
                                    to="/products"
                                    className="btn btn-success btn-lg px-4"
                                >
                                    Explore Products
                                </Link>

                                <Link
                                    to="/enquiry"
                                    className="btn btn-outline-dark btn-lg px-4"
                                >
                                    Send Enquiry
                                </Link>

                            </div>

                        </div>

                        <div className="col-lg-6">

                            {featuredProducts.length > 0 && (
                                <img
                                    src={featuredProducts[0].image}
                                    alt={featuredProducts[0].name}
                                    className="img-fluid rounded-4 shadow"
                                    style={{
                                        width: "100%",
                                        height: "420px",
                                        objectFit: "cover"
                                    }}
                                />
                            )}

                        </div>

                    </div>

                </div>
            </section>


            {/* STATS SECTION */}
            <section className="py-5">
                <div className="container">

                    <div className="row g-4 text-center">

                        <div className="col-6 col-lg-3">
                            <div className="border rounded-4 p-4 h-100">
                                <h2 className="fw-bold text-success">
                                    {products.length}+
                                </h2>
                                <p className="text-secondary mb-0">
                                    Products
                                </p>
                            </div>
                        </div>

                        <div className="col-6 col-lg-3">
                            <div className="border rounded-4 p-4 h-100">
                                <h2 className="fw-bold text-success">
                                    {categories.length}
                                </h2>
                                <p className="text-secondary mb-0">
                                    Categories
                                </p>
                            </div>
                        </div>

                        <div className="col-6 col-lg-3">
                            <div className="border rounded-4 p-4 h-100">
                                <h2 className="fw-bold text-success">
                                    {countries.length}+
                                </h2>
                                <p className="text-secondary mb-0">
                                    Export Markets
                                </p>
                            </div>
                        </div>

                        <div className="col-6 col-lg-3">
                            <div className="border rounded-4 p-4 h-100">
                                <h2 className="fw-bold text-success">
                                    {certifications.length}
                                </h2>
                                <p className="text-secondary mb-0">
                                    Quality Standards
                                </p>
                            </div>
                        </div>

                    </div>

                </div>
            </section>


            {/* FEATURED PRODUCTS */}
            <section className="bg-light py-5">
                <div className="container">

                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <div>
                            <p className="text-success fw-semibold mb-1">
                                OUR PRODUCTS
                            </p>

                            <h2 className="fw-bold">
                                Featured Products
                            </h2>
                        </div>

                        <Link
                            to="/products"
                            className="btn btn-outline-success"
                        >
                            View All
                        </Link>

                    </div>


                    <div className="row g-4">

                        {featuredProducts.slice(0, 3).map((product) => (

                            <div
                                className="col-md-6 col-lg-4"
                                key={product.id}
                            >

                                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">

                                    <Link to={`/products/${product.id}`} className="d-block overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="card-img-top"
                                            style={{
                                                height: "220px",
                                                objectFit: "cover"
                                            }}
                                        />
                                    </Link>

                                    <div className="card-body p-4 d-flex flex-column justify-content-between">

                                        <div>
                                            <span className="badge bg-success-subtle text-success mb-2">
                                                {product.grade}
                                            </span>

                                            <h5 className="fw-bold mb-2">
                                                <Link to={`/products/${product.id}`} className="text-decoration-none text-dark">
                                                    {product.name}
                                                </Link>
                                            </h5>

                                            <p className="text-secondary small">
                                                {product.description}
                                            </p>

                                            <div className="small text-secondary mb-3">
                                                <div>
                                                    <strong>Origin:</strong>{" "}
                                                    {product.origin}
                                                </div>

                                                <div>
                                                    <strong>MOQ:</strong>{" "}
                                                    {product.moq}
                                                </div>

                                                <div>
                                                    <strong>Price:</strong>{" "}
                                                    <span className="text-success fw-bold">{product.priceRange}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex gap-2 pt-2 border-top">
                                            <Link
                                                to={`/products/${product.id}`}
                                                className="btn btn-outline-success flex-fill"
                                            >
                                                Details
                                            </Link>
                                            <Link
                                                to={`/enquiry?productId=${product.id}`}
                                                className="btn btn-success flex-fill"
                                            >
                                                Enquiry
                                            </Link>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>
            </section>


            {/* CATEGORIES */}
            <section className="py-5">

                <div className="container">

                    <div className="text-center mb-5">

                        <p className="text-success fw-semibold mb-1">
                            PRODUCT RANGE
                        </p>

                        <h2 className="fw-bold">
                            Explore Our Categories
                        </h2>

                        <p className="text-secondary">
                            Browse our range of export-quality agricultural
                            products.
                        </p>

                    </div>


                    <div className="row g-4">

                        {categories.map((category) => (

                            <div
                                className="col-md-6 col-lg-3"
                                key={category.id}
                            >

                                <div className="card border-0 shadow-sm rounded-4 h-100">

                                    <div className="card-body p-4">

                                        <div
                                            className="bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center mb-3"
                                            style={{
                                                width: "55px",
                                                height: "55px"
                                            }}
                                        >
                                            <i className="bi bi-box-seam fs-4"></i>
                                        </div>

                                        <h5 className="fw-bold">
                                            {category.name}
                                        </h5>

                                        <p className="text-secondary mb-0">
                                            {category.description}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </section>


            {/* EXPORT MARKETS */}
            <section className="bg-dark text-white py-5">

                <div className="container">

                    <div className="row align-items-center g-4">

                        <div className="col-lg-5">

                            <p className="text-success fw-semibold">
                                GLOBAL REACH
                            </p>

                            <h2 className="fw-bold">
                                Exporting From India
                                <br />
                                To Global Markets
                            </h2>

                            <p className="text-secondary">
                                We support international buyers with
                                reliable sourcing and export-ready products.
                            </p>

                            <Link
                                to="/export-info"
                                className="btn btn-success"
                            >
                                Export Information
                            </Link>

                        </div>


                        <div className="col-lg-7">

                            <div className="row g-3">

                                {countries.map((country) => (

                                    <div
                                        className="col-sm-6"
                                        key={country.id}
                                    >

                                        <div className="border border-secondary rounded-3 p-3">
                                            <i className="bi bi-globe2 text-success me-2"></i>
                                            {country.name}
                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* QUALITY SECTION */}
            <section className="py-5">

                <div className="container">

                    <div className="text-center mb-5">

                        <p className="text-success fw-semibold mb-1">
                            QUALITY FIRST
                        </p>

                        <h2 className="fw-bold">
                            Quality & Compliance
                        </h2>

                        <p className="text-secondary">
                            Our product information and quality resources
                            are organized for international buyers.
                        </p>

                    </div>


                    <div className="row g-4">

                        {certifications.map((certification) => (

                            <div
                                className="col-md-6 col-lg-3"
                                key={certification.id}
                            >

                                <div className="border rounded-4 p-4 text-center h-100">

                                    <i className="bi bi-patch-check-fill text-success fs-1"></i>

                                    <h5 className="fw-bold mt-3">
                                        {certification.name}
                                    </h5>

                                    <p className="text-secondary mb-0">
                                        {certification.description}
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </section>


            {/* CTA */}
            <section className="bg-success text-white py-5">

                <div className="container text-center py-4">

                    <h2 className="fw-bold">
                        Looking for Indian Spices or Agro Products?
                    </h2>

                    <p className="mb-4">
                        Send your requirements and our team can prepare
                        an enquiry and quotation.
                    </p>

                    <Link
                        to="/enquiry"
                        className="btn btn-light btn-lg px-5"
                    >
                        Send Your Enquiry
                    </Link>

                </div>

            </section>

        </main>
    );
}

export default Home;