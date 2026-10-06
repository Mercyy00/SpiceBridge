import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    getProducts,
    getCategories,
    createProduct,
    updateProduct,
    deleteProduct
} from "../services/api";


function AdminProducts() {

    const emptyForm = {
        name: "",
        categoryId: "",
        origin: "",
        grade: "",
        moisture: "",
        packaging: "",
        moq: "",
        priceRange: "",
        image: "",
        description: "",
        featured: false
    };


    const [products, setProducts] = useState([]);

    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState(emptyForm);

    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");


    // --------------------------------
    // LOAD DATA
    // --------------------------------

    async function loadData() {

        try {

            setLoading(true);

            const [productData, categoryData] =
                await Promise.all([
                    getProducts(),
                    getCategories()
                ]);

            setProducts(productData);

            setCategories(categoryData);

        } catch (err) {

            console.error(err);

            setError(
                "Unable to load products."
            );

        } finally {

            setLoading(false);

        }

    }


    useEffect(() => {

        let isMounted = true;

        async function fetchInitialData() {
            try {
                const [productData, categoryData] = await Promise.all([
                    getProducts(),
                    getCategories()
                ]);
                if (isMounted) {
                    setProducts(productData);
                    setCategories(categoryData);
                }
            } catch (err) {
                if (isMounted) {
                    console.error(err);
                    setError("Unable to load products.");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchInitialData();

        return () => {
            isMounted = false;
        };

    }, []);


    // --------------------------------
    // CONTROLLED FORM
    // --------------------------------

    function handleChange(e) {

        const { name, value, type, checked } = e.target;

        setFormData((previousData) => ({
            ...previousData,

            [name]:
                type === "checkbox"
                    ? checked
                    : value
        }));

    }


    // --------------------------------
    // EDIT PRODUCT
    // --------------------------------

    function handleEdit(product) {

        setEditingId(product.id);

        setFormData({
            name: product.name || "",
            categoryId: product.categoryId || "",
            origin: product.origin || "",
            grade: product.grade || "",
            moisture: product.moisture || "",
            packaging: product.packaging || "",
            moq: product.moq || "",
            priceRange: product.priceRange || "",
            image: product.image || "",
            description: product.description || "",
            featured: product.featured || false
        });

        setMessage("");

        setError("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    // --------------------------------
    // CANCEL EDIT
    // --------------------------------

    function handleCancelEdit() {

        setEditingId(null);

        setFormData(emptyForm);

        setMessage("");

        setError("");

    }


    // --------------------------------
    // CREATE / UPDATE
    // --------------------------------

    async function handleSubmit(e) {

        e.preventDefault();

        setSaving(true);

        setMessage("");

        setError("");


        try {

            if (editingId) {

                // UPDATE
                const updatedProduct =
                    await updateProduct(
                        editingId,
                        formData
                    );

                setProducts((previousProducts) =>
                    previousProducts.map((product) =>
                        product.id === editingId
                            ? updatedProduct
                            : product
                    )
                );

                setMessage(
                    "Product updated successfully."
                );

            } else {

                // CREATE
                const newProduct = {
                    id: `p-${Date.now()}`,
                    ...formData
                };

                const createdProduct =
                    await createProduct(newProduct);

                setProducts((previousProducts) => [
                    ...previousProducts,
                    createdProduct
                ]);

                setMessage(
                    "Product added successfully."
                );

            }


            setFormData(emptyForm);

            setEditingId(null);

        } catch (err) {

            console.error(err);

            setError(
                "Unable to save product."
            );

        } finally {

            setSaving(false);

        }

    }


    // --------------------------------
    // DELETE PRODUCT
    // --------------------------------

    async function handleDelete(id) {

        const confirmed = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmed) {
            return;
        }


        try {

            await deleteProduct(id);

            setProducts((previousProducts) =>
                previousProducts.filter(
                    (product) => product.id !== id
                )
            );

            setMessage(
                "Product deleted successfully."
            );

        } catch (err) {

            console.error(err);

            setError(
                "Unable to delete product."
            );

        }

    }


    // --------------------------------
    // CATEGORY NAME
    // --------------------------------

    function getCategoryName(categoryId) {

        const category = categories.find(
            (item) => item.id === categoryId
        );

        return category
            ? category.name
            : "Unknown";

    }


    return (
        <main className="bg-light min-vh-100 py-5">

            <div className="container">


                {/* PAGE HEADER */}

                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">

                    <div>

                        <p className="text-success fw-semibold mb-1">
                            ADMIN PANEL
                        </p>

                        <h1 className="fw-bold mb-2">
                            Manage Products
                        </h1>

                        <p className="text-secondary mb-0">
                            Add, update and remove products
                            from the catalog.
                        </p>

                    </div>


                    <div className="d-flex gap-2 mt-3 mt-md-0">
                        <button
                            type="button"
                            className="btn btn-outline-success"
                            onClick={loadData}
                        >
                            <i className="bi bi-arrow-clockwise me-1"></i>
                            Refresh
                        </button>
                        <Link
                            to="/admin"
                            className="btn btn-outline-secondary"
                        >
                            <i className="bi bi-arrow-left me-1"></i>
                            Admin Dashboard
                        </Link>
                    </div>

                </div>


                {/* ALERTS */}

                {message && (

                    <div className="alert alert-success">
                        <i className="bi bi-check-circle me-2"></i>
                        {message}
                    </div>

                )}


                {error && (

                    <div className="alert alert-danger">
                        <i className="bi bi-exclamation-circle me-2"></i>
                        {error}
                    </div>

                )}


                <div className="row g-4">


                    {/* ========================= */}
                    {/* PRODUCT FORM */}
                    {/* ========================= */}

                    <div className="col-lg-5">

                        <div className="card border-0 shadow-sm rounded-4">

                            <div className="card-body p-4">

                                <h4 className="fw-bold mb-4">

                                    {editingId
                                        ? "Edit Product"
                                        : "Add Product"
                                    }

                                </h4>


                                <form onSubmit={handleSubmit}>


                                    {/* NAME */}

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">
                                            Product Name
                                        </label>

                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            placeholder="Premium Black Pepper"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>


                                    {/* CATEGORY */}

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">
                                            Category
                                        </label>

                                        <select
                                            name="categoryId"
                                            className="form-select"
                                            value={formData.categoryId}
                                            onChange={handleChange}
                                            required
                                        >

                                            <option value="">
                                                Select Category
                                            </option>

                                            {categories.map(
                                                (category) => (

                                                    <option
                                                        key={category.id}
                                                        value={category.id}
                                                    >
                                                        {category.name}
                                                    </option>

                                                )
                                            )}

                                        </select>

                                    </div>


                                    {/* ORIGIN */}

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">
                                            Origin
                                        </label>

                                        <input
                                            type="text"
                                            name="origin"
                                            className="form-control"
                                            placeholder="Kerala, India"
                                            value={formData.origin}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>


                                    {/* GRADE */}

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">
                                            Grade
                                        </label>

                                        <input
                                            type="text"
                                            name="grade"
                                            className="form-control"
                                            placeholder="FAQ / ASTA 550"
                                            value={formData.grade}
                                            onChange={handleChange}
                                        />

                                    </div>


                                    {/* MOISTURE */}

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">
                                            Moisture
                                        </label>

                                        <input
                                            type="text"
                                            name="moisture"
                                            className="form-control"
                                            placeholder="Max 12%"
                                            value={formData.moisture}
                                            onChange={handleChange}
                                        />

                                    </div>


                                    {/* PACKAGING */}

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">
                                            Packaging
                                        </label>

                                        <input
                                            type="text"
                                            name="packaging"
                                            className="form-control"
                                            placeholder="25 kg / 50 kg PP Bags"
                                            value={formData.packaging}
                                            onChange={handleChange}
                                        />

                                    </div>


                                    {/* MOQ */}

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">
                                            Minimum Order Quantity
                                        </label>

                                        <input
                                            type="text"
                                            name="moq"
                                            className="form-control"
                                            placeholder="500 kg"
                                            value={formData.moq}
                                            onChange={handleChange}
                                        />

                                    </div>


                                    {/* PRICE */}

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">
                                            Price Range
                                        </label>

                                        <input
                                            type="text"
                                            name="priceRange"
                                            className="form-control"
                                            placeholder="$5.20 - $6.10 / kg"
                                            value={formData.priceRange}
                                            onChange={handleChange}
                                        />

                                    </div>


                                    {/* IMAGE */}

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">
                                            Image URL
                                        </label>

                                        <input
                                            type="url"
                                            name="image"
                                            className="form-control"
                                            placeholder="https://..."
                                            value={formData.image}
                                            onChange={handleChange}
                                        />

                                    </div>


                                    {/* DESCRIPTION */}

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">
                                            Description
                                        </label>

                                        <textarea
                                            name="description"
                                            className="form-control"
                                            rows="4"
                                            placeholder="Product description..."
                                            value={formData.description}
                                            onChange={handleChange}
                                        ></textarea>

                                    </div>


                                    {/* FEATURED */}

                                    <div className="form-check mb-4">

                                        <input
                                            type="checkbox"
                                            name="featured"
                                            id="featured"
                                            className="form-check-input"
                                            checked={formData.featured}
                                            onChange={handleChange}
                                        />

                                        <label
                                            htmlFor="featured"
                                            className="form-check-label"
                                        >
                                            Featured Product
                                        </label>

                                    </div>


                                    {/* BUTTONS */}

                                    <div className="d-flex gap-2">

                                        <button
                                            type="submit"
                                            className="btn btn-success flex-grow-1"
                                            disabled={saving}
                                        >

                                            {saving ? (
                                                <>
                                                    <span
                                                        className="spinner-border spinner-border-sm me-2"
                                                    ></span>

                                                    Saving...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="bi bi-check-lg me-2"></i>

                                                    {editingId
                                                        ? "Update Product"
                                                        : "Add Product"
                                                    }
                                                </>
                                            )}

                                        </button>


                                        {editingId && (

                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={handleCancelEdit}
                                            >
                                                Cancel
                                            </button>

                                        )}

                                    </div>

                                </form>

                            </div>

                        </div>

                    </div>


                    {/* ========================= */}
                    {/* PRODUCT LIST */}
                    {/* ========================= */}

                    <div className="col-lg-7">

                        <div className="card border-0 shadow-sm rounded-4">

                            <div className="card-body p-0">

                                <div className="p-4 border-bottom">

                                    <h4 className="fw-bold mb-1">
                                        Product List
                                    </h4>

                                    <p className="text-secondary mb-0">
                                        {products.length} products
                                        available
                                    </p>

                                </div>


                                {loading ? (

                                    <div className="text-center py-5">

                                        <div
                                            className="spinner-border text-success"
                                            role="status"
                                        ></div>

                                        <p className="text-secondary mt-3 mb-0">
                                            Loading products...
                                        </p>

                                    </div>

                                ) : products.length === 0 ? (

                                    <div className="text-center py-5">

                                        <i className="bi bi-box fs-1 text-secondary"></i>

                                        <p className="text-secondary mt-3">
                                            No products found.
                                        </p>

                                    </div>

                                ) : (

                                    <div className="table-responsive">

                                        <table className="table table-hover align-middle mb-0">

                                            <thead className="table-light">

                                                <tr>

                                                    <th className="px-4">
                                                        Product
                                                    </th>

                                                    <th>
                                                        Category
                                                    </th>

                                                    <th>
                                                        MOQ
                                                    </th>

                                                    <th>
                                                        Actions
                                                    </th>

                                                </tr>

                                            </thead>


                                            <tbody>

                                                {products.map(
                                                    (product) => (

                                                        <tr
                                                            key={product.id}
                                                        >

                                                            <td className="px-4">

                                                                <div className="d-flex align-items-center gap-3">

                                                                    <img
                                                                        src={
                                                                            product.image
                                                                        }
                                                                        alt={
                                                                            product.name
                                                                        }
                                                                        width="55"
                                                                        height="55"
                                                                        className="rounded-3 object-fit-cover"
                                                                    />

                                                                    <div>

                                                                        <div className="fw-semibold">
                                                                            {
                                                                                product.name
                                                                            }
                                                                        </div>

                                                                        <small className="text-secondary">
                                                                            {
                                                                                product.origin
                                                                            }
                                                                        </small>

                                                                    </div>

                                                                </div>

                                                            </td>


                                                            <td>

                                                                <span className="badge bg-success-subtle text-success">
                                                                    {
                                                                        getCategoryName(
                                                                            product.categoryId
                                                                        )
                                                                    }
                                                                </span>

                                                            </td>


                                                            <td>
                                                                {
                                                                    product.moq
                                                                }
                                                            </td>


                                                            <td>

                                                                <div className="d-flex gap-2">

                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-sm btn-outline-primary"
                                                                        onClick={() =>
                                                                            handleEdit(
                                                                                product
                                                                            )
                                                                        }
                                                                    >
                                                                        <i className="bi bi-pencil"></i>
                                                                    </button>


                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-sm btn-outline-danger"
                                                                        onClick={() =>
                                                                            handleDelete(
                                                                                product.id
                                                                            )
                                                                        }
                                                                    >
                                                                        <i className="bi bi-trash"></i>
                                                                    </button>

                                                                </div>

                                                            </td>

                                                        </tr>

                                                    )
                                                )}

                                            </tbody>

                                        </table>

                                    </div>

                                )}

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
}

export default AdminProducts;