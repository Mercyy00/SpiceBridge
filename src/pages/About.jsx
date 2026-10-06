import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    getProducts,
    getCategories,
    getCountries
} from "../services/api";

function About() {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [countries, setCountries] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        async function loadAboutData() {

            try {

                const [
                    productsData,
                    categoriesData,
                    countriesData
                ] = await Promise.all([
                    getProducts(),
                    getCategories(),
                    getCountries()
                ]);

                setProducts(productsData);
                setCategories(categoriesData);
                setCountries(countriesData);

            } catch (err) {

                console.error(err);
                setError("Unable to load company information.");

            } finally {

                setLoading(false);

            }

        }

        loadAboutData();

    }, []);


    if (loading) {

        return (
            <div className="container py-5 text-center">

                <div
                    className="spinner-border text-success"
                    role="status"
                ></div>

                <p className="mt-3">
                    Loading...
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
                        ABOUT SPICEBRIDGE
                    </p>

                    <h1 className="display-5 fw-bold">
                        Connecting Indian Agriculture
                        <br />
                        With Global Buyers
                    </h1>

                    <p
                        className="text-secondary mx-auto mt-3"
                        style={{ maxWidth: "700px" }}
                    >
                        SpiceBridge is a B2B export catalog concept designed
                        to connect international buyers with Indian spices,
                        grains, pulses and agro products.
                    </p>

                </div>

            </section>


            {/* ABOUT INTRO */}
            <section className="py-5">

                <div className="container">

                    <div className="row align-items-center g-5">

                        <div className="col-lg-6">

                            <div className="bg-success-subtle rounded-4 p-5">

                                <div className="text-center">

                                    <i className="bi bi-globe2 text-success"
                                        style={{ fontSize: "90px" }}
                                    ></i>

                                    <h2 className="fw-bold mt-4">
                                        SpiceBridge
                                    </h2>

                                    <p className="text-secondary">
                                        Spices & Agro Products Export
                                    </p>

                                </div>

                            </div>

                        </div>


                        <div className="col-lg-6">

                            <p className="text-success fw-semibold">
                                WHO WE ARE
                            </p>

                            <h2 className="fw-bold mb-4">
                                A Bridge Between
                                <br />
                                Suppliers & Buyers
                            </h2>

                            <p className="text-secondary">
                                SpiceBridge provides a structured product
                                catalog where international buyers can
                                explore product specifications and submit
                                their requirements.
                            </p>

                            <p className="text-secondary">
                                The platform is designed around a simple
                                B2B workflow: browse products, submit an
                                enquiry, process the enquiry into a
                                quotation, and manage the supply process.
                            </p>

                            <Link
                                to="/products"
                                className="btn btn-success mt-2"
                            >
                                Explore Products
                                <i className="bi bi-arrow-right ms-2"></i>
                            </Link>

                        </div>

                    </div>

                </div>

            </section>


            {/* DATABASE STATS */}
            <section className="bg-light py-5">

                <div className="container">

                    <div className="text-center mb-5">

                        <p className="text-success fw-semibold">
                            OUR CATALOG
                        </p>

                        <h2 className="fw-bold">
                            SpiceBridge By The Numbers
                        </h2>

                    </div>


                    <div className="row g-4">

                        <div className="col-6 col-lg-3">

                            <div className="bg-white rounded-4 shadow-sm p-4 text-center h-100">

                                <i className="bi bi-box-seam text-success fs-1"></i>

                                <h2 className="fw-bold mt-3">
                                    {products.length}+
                                </h2>

                                <p className="text-secondary mb-0">
                                    Products
                                </p>

                            </div>

                        </div>


                        <div className="col-6 col-lg-3">

                            <div className="bg-white rounded-4 shadow-sm p-4 text-center h-100">

                                <i className="bi bi-grid text-success fs-1"></i>

                                <h2 className="fw-bold mt-3">
                                    {categories.length}
                                </h2>

                                <p className="text-secondary mb-0">
                                    Categories
                                </p>

                            </div>

                        </div>


                        <div className="col-6 col-lg-3">

                            <div className="bg-white rounded-4 shadow-sm p-4 text-center h-100">

                                <i className="bi bi-globe2 text-success fs-1"></i>

                                <h2 className="fw-bold mt-3">
                                    {countries.length}+
                                </h2>

                                <p className="text-secondary mb-0">
                                    Markets
                                </p>

                            </div>

                        </div>


                        <div className="col-6 col-lg-3">

                            <div className="bg-white rounded-4 shadow-sm p-4 text-center h-100">

                                <i className="bi bi-people text-success fs-1"></i>

                                <h2 className="fw-bold mt-3">
                                    B2B
                                </h2>

                                <p className="text-secondary mb-0">
                                    Business Focus
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* OUR VALUES */}
            <section className="py-5">

                <div className="container">

                    <div className="text-center mb-5">

                        <p className="text-success fw-semibold">
                            OUR VALUES
                        </p>

                        <h2 className="fw-bold">
                            What We Focus On
                        </h2>

                    </div>


                    <div className="row g-4">

                        <div className="col-md-4">

                            <div className="border rounded-4 p-4 h-100">

                                <div
                                    className="bg-success-subtle text-success rounded-3 d-flex align-items-center justify-content-center mb-4"
                                    style={{
                                        width: "60px",
                                        height: "60px"
                                    }}
                                >
                                    <i className="bi bi-award fs-3"></i>
                                </div>

                                <h4 className="fw-bold">
                                    Quality
                                </h4>

                                <p className="text-secondary mb-0">
                                    Product information and quality
                                    requirements are organized to help
                                    buyers make informed enquiries.
                                </p>

                            </div>

                        </div>


                        <div className="col-md-4">

                            <div className="border rounded-4 p-4 h-100">

                                <div
                                    className="bg-success-subtle text-success rounded-3 d-flex align-items-center justify-content-center mb-4"
                                    style={{
                                        width: "60px",
                                        height: "60px"
                                    }}
                                >
                                    <i className="bi bi-handshake fs-3"></i>
                                </div>

                                <h4 className="fw-bold">
                                    Reliability
                                </h4>

                                <p className="text-secondary mb-0">
                                    A structured enquiry and quotation
                                    workflow helps organize buyer
                                    requirements.
                                </p>

                            </div>

                        </div>


                        <div className="col-md-4">

                            <div className="border rounded-4 p-4 h-100">

                                <div
                                    className="bg-success-subtle text-success rounded-3 d-flex align-items-center justify-content-center mb-4"
                                    style={{
                                        width: "60px",
                                        height: "60px"
                                    }}
                                >
                                    <i className="bi bi-globe2 fs-3"></i>
                                </div>

                                <h4 className="fw-bold">
                                    Global Reach
                                </h4>

                                <p className="text-secondary mb-0">
                                    The catalog is designed for
                                    international B2B buyers and
                                    export requirements.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* WORKFLOW */}
            <section className="bg-dark text-white py-5">

                <div className="container py-4">

                    <div className="row align-items-center g-5">

                        <div className="col-lg-5">

                            <p className="text-success fw-semibold">
                                B2B WORKFLOW
                            </p>

                            <h2 className="fw-bold">
                                Simple Process From
                                <br />
                                Enquiry To Quotation
                            </h2>

                            <p className="text-secondary">
                                SpiceBridge is structured around a
                                straightforward workflow for managing
                                product enquiries.
                            </p>

                        </div>


                        <div className="col-lg-7">

                            <div className="d-flex flex-column gap-4">

                                <div className="d-flex gap-3">

                                    <div
                                        className="bg-success rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                                        style={{
                                            width: "50px",
                                            height: "50px"
                                        }}
                                    >
                                        1
                                    </div>

                                    <div>
                                        <h5 className="fw-bold">
                                            Browse Products
                                        </h5>

                                        <p className="text-secondary mb-0">
                                            Buyers explore products and
                                            specifications.
                                        </p>
                                    </div>

                                </div>


                                <div className="d-flex gap-3">

                                    <div
                                        className="bg-success rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                                        style={{
                                            width: "50px",
                                            height: "50px"
                                        }}
                                    >
                                        2
                                    </div>

                                    <div>
                                        <h5 className="fw-bold">
                                            Submit Enquiry
                                        </h5>

                                        <p className="text-secondary mb-0">
                                            Buyer requirements are stored
                                            in the enquiry database.
                                        </p>
                                    </div>

                                </div>


                                <div className="d-flex gap-3">

                                    <div
                                        className="bg-success rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                                        style={{
                                            width: "50px",
                                            height: "50px"
                                        }}
                                    >
                                        3
                                    </div>

                                    <div>
                                        <h5 className="fw-bold">
                                            Process Quotation
                                        </h5>

                                        <p className="text-secondary mb-0">
                                            Enquiry information can be used
                                            to prepare a quotation.
                                        </p>
                                    </div>

                                </div>


                                <div className="d-flex gap-3">

                                    <div
                                        className="bg-success rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                                        style={{
                                            width: "50px",
                                            height: "50px"
                                        }}
                                    >
                                        4
                                    </div>

                                    <div>
                                        <h5 className="fw-bold">
                                            Manage Supply
                                        </h5>

                                        <p className="text-secondary mb-0">
                                            Product and export requirements
                                            can be managed through the
                                            system.
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* CTA */}
            <section className="py-5">

                <div className="container">

                    <div className="bg-success text-white rounded-4 p-4 p-md-5">

                        <div className="row align-items-center g-4">

                            <div className="col-lg-8">

                                <h2 className="fw-bold">
                                    Looking for Indian Spices or Agro Products?
                                </h2>

                                <p className="mb-0">
                                    Explore our catalog or submit your
                                    product requirements.
                                </p>

                            </div>


                            <div className="col-lg-4 text-lg-end">

                                <Link
                                    to="/enquiry"
                                    className="btn btn-light btn-lg"
                                >
                                    Send Enquiry
                                    <i className="bi bi-arrow-right ms-2"></i>
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </main>
    );
}

export default About;