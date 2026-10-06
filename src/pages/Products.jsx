import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    getProducts,
    getCategories
} from "../services/api";

function Products() {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState("all");
    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function loadProducts() {

            try {

                const [productsData, categoriesData] =
                    await Promise.all([
                        getProducts(),
                        getCategories()
                    ]);

                setProducts(productsData);
                setCategories(categoriesData);

            } catch (err) {

                console.error(err);
                setError("Unable to load products.");

            } finally {

                setLoading(false);

            }
        }

        loadProducts();

    }, []);


    // Find category name using categoryId
    function getCategoryName(categoryId) {

        const category = categories.find(
            (item) => item.id === categoryId
        );

        return category ? category.name : "Other";

    }


    // Filter products
    const filteredProducts = products.filter((product) => {

        const matchesCategory =
            selectedCategory === "all" ||
            product.categoryId === selectedCategory;

        const matchesSearch =
            product.name
                .toLowerCase()
                .includes(search.toLowerCase());

        return matchesCategory && matchesSearch;

    });


    if (loading) {

        return (
            <div className="container py-5 text-center">

                <div
                    className="spinner-border text-success"
                    role="status"
                ></div>

                <p className="mt-3">
                    Loading products...
                </p>

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


    return (
        <main>

            {/* PAGE HEADER */}
            <section className="bg-light py-5">

                <div className="container text-center py-4">

                    <p className="text-success fw-semibold mb-2">
                        SPICEBRIDGE CATALOG
                    </p>

                    <h1 className="display-5 fw-bold">
                        Our Products
                    </h1>

                    <p className="text-secondary mx-auto mt-3"
                        style={{ maxWidth: "700px" }}
                    >
                        Explore our range of Indian spices, grains,
                        pulses and agro products prepared for
                        international buyers.
                    </p>

                </div>

            </section>


            {/* FILTER SECTION */}
            <section className="py-4 border-bottom">

                <div className="container">

                    <div className="row g-3 align-items-center">

                        {/* SEARCH */}
                        <div className="col-lg-5">

                            <div className="input-group">

                                <span className="input-group-text bg-white">
                                    <i className="bi bi-search"></i>
                                </span>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search products..."
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                />

                            </div>

                        </div>


                        {/* CATEGORY */}
                        <div className="col-lg-7">

                            <div className="d-flex flex-wrap gap-2 justify-content-lg-end">

                                <button
                                    className={`btn ${
                                        selectedCategory === "all"
                                            ? "btn-success"
                                            : "btn-outline-success"
                                    }`}
                                    onClick={() =>
                                        setSelectedCategory("all")
                                    }
                                >
                                    All Products
                                </button>


                                {categories.map((category) => (

                                    <button
                                        key={category.id}
                                        className={`btn ${
                                            selectedCategory === category.id
                                                ? "btn-success"
                                                : "btn-outline-success"
                                        }`}
                                        onClick={() =>
                                            setSelectedCategory(category.id)
                                        }
                                    >
                                        {category.name}
                                    </button>

                                ))}

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* PRODUCTS */}
            <section className="py-5">

                <div className="container">

                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <div>

                            <h2 className="fw-bold mb-1">
                                Product Catalog
                            </h2>

                            <p className="text-secondary mb-0">
                                {filteredProducts.length} products found
                            </p>

                        </div>

                    </div>


                    {filteredProducts.length === 0 ? (

                        <div className="text-center py-5">

                            <i className="bi bi-search fs-1 text-secondary"></i>

                            <h4 className="mt-3">
                                No products found
                            </h4>

                            <p className="text-secondary">
                                Try another search or category.
                            </p>

                        </div>

                    ) : (

                        <div className="row g-4">

                            {filteredProducts.map((product) => (

                                <div
                                    className="col-md-6 col-lg-4"
                                    key={product.id}
                                >

                                    <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">

                                        {/* IMAGE */}
                                        <Link to={`/products/${product.id}`} className="d-block overflow-hidden">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="card-img-top"
                                                style={{
                                                    height: "240px",
                                                    objectFit: "cover",
                                                    transition: "transform 0.3s ease"
                                                }}
                                            />
                                        </Link>


                                        {/* CARD BODY */}
                                        <div className="card-body p-4">

                                            <div className="d-flex justify-content-between align-items-start gap-2">

                                                <div>

                                                    <span className="badge bg-success-subtle text-success mb-2">
                                                        {getCategoryName(
                                                            product.categoryId
                                                        )}
                                                    </span>

                                                    <h5 className="fw-bold mb-2">
                                                        <Link
                                                            to={`/products/${product.id}`}
                                                            className="text-decoration-none text-dark"
                                                        >
                                                            {product.name}
                                                        </Link>
                                                    </h5>

                                                </div>

                                            </div>


                                            <p className="text-secondary small">
                                                {product.description}
                                            </p>


                                            {/* PRODUCT DETAILS */}
                                            <div className="border-top pt-3 mt-3">

                                                <div className="d-flex justify-content-between mb-2">

                                                    <span className="text-secondary">
                                                        Origin
                                                    </span>

                                                    <strong>
                                                        {product.origin}
                                                    </strong>

                                                </div>


                                                <div className="d-flex justify-content-between mb-2">

                                                    <span className="text-secondary">
                                                        Grade
                                                    </span>

                                                    <strong>
                                                        {product.grade}
                                                    </strong>

                                                </div>


                                                <div className="d-flex justify-content-between mb-2">

                                                    <span className="text-secondary">
                                                        MOQ
                                                    </span>

                                                    <strong>
                                                        {product.moq}
                                                    </strong>

                                                </div>


                                                <div className="d-flex justify-content-between">

                                                    <span className="text-secondary">
                                                        Price
                                                    </span>

                                                    <strong className="text-success">
                                                        {product.priceRange}
                                                    </strong>

                                                </div>

                                            </div>

                                        </div>


                                        {/* CARD FOOTER */}
                                        <div className="card-footer bg-white border-0 p-4 pt-0 d-flex gap-2">

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
                                                Enquire
                                                <i className="bi bi-arrow-right ms-1"></i>
                                            </Link>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </section>


            {/* BUYER CTA */}
            <section className="bg-success text-white py-5">

                <div className="container text-center py-4">

                    <h2 className="fw-bold">
                        Need a Specific Product?
                    </h2>

                    <p className="mb-4">
                        Tell us your required specification,
                        quantity and packaging requirements.
                    </p>

                    <Link
                        to="/enquiry"
                        className="btn btn-light btn-lg px-5"
                    >
                        Send Product Enquiry
                    </Link>

                </div>

            </section>

        </main>
    );
}

export default Products;