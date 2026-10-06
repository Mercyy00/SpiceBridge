import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    getCountries,
    getPackagingOptions
} from "../services/api";

function ExportInfo() {

    const [countries, setCountries] = useState([]);
    const [packagingOptions, setPackagingOptions] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        async function loadExportData() {

            try {

                const [
                    countriesData,
                    packagingData
                ] = await Promise.all([
                    getCountries(),
                    getPackagingOptions()
                ]);

                setCountries(countriesData);
                setPackagingOptions(packagingData);

            } catch (err) {

                console.error(err);
                setError("Unable to load export information.");

            } finally {

                setLoading(false);

            }

        }

        loadExportData();

    }, []);


    if (loading) {

        return (
            <div className="container py-5 text-center">

                <div
                    className="spinner-border text-success"
                    role="status"
                ></div>

                <p className="mt-3">
                    Loading export information...
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
                        EXPORT INFORMATION
                    </p>

                    <h1 className="display-5 fw-bold">
                        Global Export
                    </h1>

                    <p
                        className="text-secondary mx-auto mt-3"
                        style={{ maxWidth: "700px" }}
                    >
                        Information about our export markets, packaging
                        options and international supply process.
                    </p>

                </div>

            </section>


            {/* EXPORT INTRO */}
            <section className="py-5">

                <div className="container">

                    <div className="row align-items-center g-5">

                        <div className="col-lg-6">

                            <p className="text-success fw-semibold">
                                FROM INDIA TO THE WORLD
                            </p>

                            <h2 className="fw-bold mb-4">
                                Export-Ready Agricultural Products
                            </h2>

                            <p className="text-secondary">
                                SpiceBridge connects Indian agricultural
                                products with international buyers.
                            </p>

                            <p className="text-secondary">
                                Buyers can specify their destination,
                                quantity, packaging requirements and
                                product specifications when submitting
                                an enquiry.
                            </p>

                            <Link
                                to="/enquiry"
                                className="btn btn-success mt-2"
                            >
                                Start an Enquiry
                                <i className="bi bi-arrow-right ms-2"></i>
                            </Link>

                        </div>


                        <div className="col-lg-6">

                            <div className="bg-success-subtle rounded-4 p-4 p-md-5">

                                <div className="row g-4">

                                    <div className="col-6">

                                        <div className="text-center">

                                            <i className="bi bi-globe2 text-success fs-1"></i>

                                            <h3 className="fw-bold mt-2">
                                                {countries.length}+
                                            </h3>

                                            <p className="text-secondary mb-0">
                                                Export Markets
                                            </p>

                                        </div>

                                    </div>


                                    <div className="col-6">

                                        <div className="text-center">

                                            <i className="bi bi-box-seam text-success fs-1"></i>

                                            <h3 className="fw-bold mt-2">
                                                {packagingOptions.length}+
                                            </h3>

                                            <p className="text-secondary mb-0">
                                                Packaging Options
                                            </p>

                                        </div>

                                    </div>


                                    <div className="col-12">

                                        <hr />

                                        <div className="d-flex align-items-center gap-3">

                                            <i className="bi bi-check-circle-fill text-success fs-3"></i>

                                            <div>
                                                <strong>
                                                    Buyer-specific requirements
                                                </strong>

                                                <p className="text-secondary mb-0 small">
                                                    Product specifications can
                                                    be discussed through an enquiry.
                                                </p>
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* EXPORT MARKETS */}
            <section className="bg-light py-5">

                <div className="container">

                    <div className="text-center mb-5">

                        <p className="text-success fw-semibold mb-1">
                            GLOBAL REACH
                        </p>

                        <h2 className="fw-bold">
                            Our Export Markets
                        </h2>

                        <p className="text-secondary">
                            Countries currently represented in the
                            SpiceBridge catalog.
                        </p>

                    </div>


                    <div className="row g-4">

                        {countries.map((country, index) => (

                            <div
                                className="col-md-6 col-lg-4"
                                key={country.id}
                            >

                                <div className="card border-0 shadow-sm rounded-4 h-100">

                                    <div className="card-body p-4">

                                        <div className="d-flex align-items-center gap-3">

                                            <div
                                                className="bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                                                style={{
                                                    width: "55px",
                                                    height: "55px"
                                                }}
                                            >
                                                <i className="bi bi-globe2 fs-4"></i>
                                            </div>

                                            <div>

                                                <span className="text-secondary small">
                                                    Market {index + 1}
                                                </span>

                                                <h5 className="fw-bold mb-0">
                                                    {country.name}
                                                </h5>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </section>


            {/* PACKAGING */}
            <section className="py-5">

                <div className="container">

                    <div className="row align-items-center mb-5">

                        <div className="col-lg-8">

                            <p className="text-success fw-semibold mb-1">
                                PACKAGING
                            </p>

                            <h2 className="fw-bold">
                                Packaging Options
                            </h2>

                            <p className="text-secondary">
                                Available packaging options can be discussed
                                according to the product and buyer requirements.
                            </p>

                        </div>

                    </div>


                    <div className="row g-4">

                        {packagingOptions.map((option, index) => (

                            <div
                                className="col-md-6 col-lg-3"
                                key={option.id}
                            >

                                <div className="border rounded-4 p-4 h-100">

                                    <div
                                        className="bg-success-subtle text-success rounded-3 d-flex align-items-center justify-content-center mb-3"
                                        style={{
                                            width: "55px",
                                            height: "55px"
                                        }}
                                    >
                                        <i className="bi bi-box-seam fs-4"></i>
                                    </div>

                                    <span className="small text-secondary">
                                        Option {index + 1}
                                    </span>

                                    <h5 className="fw-bold mt-1">
                                        {option.name}
                                    </h5>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </section>


            {/* EXPORT PROCESS */}
            <section className="bg-dark text-white py-5">

                <div className="container py-4">

                    <div className="text-center mb-5">

                        <p className="text-success fw-semibold">
                            HOW IT WORKS
                        </p>

                        <h2 className="fw-bold">
                            Export Enquiry Process
                        </h2>

                    </div>


                    <div className="row g-4">

                        <div className="col-md-3">

                            <div className="text-center">

                                <div
                                    className="bg-success rounded-circle mx-auto d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "60px",
                                        height: "60px"
                                    }}
                                >
                                    <span className="fw-bold fs-4">
                                        1
                                    </span>
                                </div>

                                <h5 className="fw-bold mt-3">
                                    Select Product
                                </h5>

                                <p className="text-secondary">
                                    Browse the product catalog and select
                                    your required product.
                                </p>

                            </div>

                        </div>


                        <div className="col-md-3">

                            <div className="text-center">

                                <div
                                    className="bg-success rounded-circle mx-auto d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "60px",
                                        height: "60px"
                                    }}
                                >
                                    <span className="fw-bold fs-4">
                                        2
                                    </span>
                                </div>

                                <h5 className="fw-bold mt-3">
                                    Send Enquiry
                                </h5>

                                <p className="text-secondary">
                                    Submit quantity, packaging and
                                    destination requirements.
                                </p>

                            </div>

                        </div>


                        <div className="col-md-3">

                            <div className="text-center">

                                <div
                                    className="bg-success rounded-circle mx-auto d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "60px",
                                        height: "60px"
                                    }}
                                >
                                    <span className="fw-bold fs-4">
                                        3
                                    </span>
                                </div>

                                <h5 className="fw-bold mt-3">
                                    Quotation
                                </h5>

                                <p className="text-secondary">
                                    The enquiry can be processed into
                                    a quotation.
                                </p>

                            </div>

                        </div>


                        <div className="col-md-3">

                            <div className="text-center">

                                <div
                                    className="bg-success rounded-circle mx-auto d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "60px",
                                        height: "60px"
                                    }}
                                >
                                    <span className="fw-bold fs-4">
                                        4
                                    </span>
                                </div>

                                <h5 className="fw-bold mt-3">
                                    Supply
                                </h5>

                                <p className="text-secondary">
                                    Final supply details are discussed
                                    according to the quotation.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* DOCUMENTATION */}
            <section className="py-5">

                <div className="container">

                    <div className="row justify-content-center">

                        <div className="col-lg-9">

                            <div className="border rounded-4 p-4 p-md-5">

                                <div className="text-center mb-4">

                                    <i className="bi bi-file-earmark-text text-success fs-1"></i>

                                    <h3 className="fw-bold mt-3">
                                        Export Documentation
                                    </h3>

                                    <p className="text-secondary">
                                        Documentation requirements can vary
                                        depending on the product and destination.
                                    </p>

                                </div>


                                <div className="row g-3">

                                    <div className="col-md-6">

                                        <div className="d-flex gap-2">
                                            <i className="bi bi-check-circle-fill text-success"></i>

                                            <span>
                                                Product specifications
                                            </span>
                                        </div>

                                    </div>


                                    <div className="col-md-6">

                                        <div className="d-flex gap-2">
                                            <i className="bi bi-check-circle-fill text-success"></i>

                                            <span>
                                                Commercial documents
                                            </span>
                                        </div>

                                    </div>


                                    <div className="col-md-6">

                                        <div className="d-flex gap-2">
                                            <i className="bi bi-check-circle-fill text-success"></i>

                                            <span>
                                                Packaging details
                                            </span>
                                        </div>

                                    </div>


                                    <div className="col-md-6">

                                        <div className="d-flex gap-2">
                                            <i className="bi bi-check-circle-fill text-success"></i>

                                            <span>
                                                Quality information
                                            </span>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* CTA */}
            <section className="bg-success text-white py-5">

                <div className="container text-center py-4">

                    <h2 className="fw-bold">
                        Ready to Discuss Your Requirement?
                    </h2>

                    <p className="mb-4">
                        Send your product and quantity requirements
                        to start the enquiry process.
                    </p>

                    <Link
                        to="/enquiry"
                        className="btn btn-light btn-lg px-5"
                    >
                        Send Enquiry
                    </Link>

                </div>

            </section>

        </main>
    );
}

export default ExportInfo;