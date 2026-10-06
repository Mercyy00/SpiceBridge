import { useEffect, useState } from "react";

import {
    getCertifications,
    getLabReports
} from "../services/api";

function Quality() {

    const [certifications, setCertifications] = useState([]);
    const [labReports, setLabReports] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        async function loadQualityData() {

            try {

                const [
                    certificationsData,
                    labReportsData
                ] = await Promise.all([
                    getCertifications(),
                    getLabReports()
                ]);

                setCertifications(certificationsData);
                setLabReports(labReportsData);

            } catch (err) {

                console.error(err);
                setError("Unable to load quality information.");

            } finally {

                setLoading(false);

            }

        }

        loadQualityData();

    }, []);


    if (loading) {

        return (
            <div className="container py-5 text-center">

                <div
                    className="spinner-border text-success"
                    role="status"
                ></div>

                <p className="mt-3">
                    Loading quality information...
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
                        QUALITY & COMPLIANCE
                    </p>

                    <h1 className="display-5 fw-bold">
                        Quality Assurance
                    </h1>

                    <p
                        className="text-secondary mx-auto mt-3"
                        style={{ maxWidth: "700px" }}
                    >
                        Quality information, certifications and testing
                        resources for international buyers.
                    </p>

                </div>

            </section>


            {/* INTRODUCTION */}
            <section className="py-5">

                <div className="container">

                    <div className="row align-items-center g-5">

                        <div className="col-lg-6">

                            <p className="text-success fw-semibold">
                                OUR APPROACH
                            </p>

                            <h2 className="fw-bold mb-4">
                                Quality From Sourcing
                                <br />
                                To Export
                            </h2>

                            <p className="text-secondary">
                                SpiceBridge organizes product specifications,
                                quality information and testing resources
                                to help buyers understand the products they
                                are sourcing.
                            </p>

                            <p className="text-secondary">
                                Product requirements can vary according to
                                destination markets, buyer specifications
                                and applicable standards.
                            </p>

                        </div>


                        <div className="col-lg-6">

                            <div className="row g-3">

                                <div className="col-6">

                                    <div className="bg-success-subtle rounded-4 p-4 text-center h-100">

                                        <i className="bi bi-shield-check text-success fs-1"></i>

                                        <h5 className="fw-bold mt-3">
                                            Quality
                                        </h5>

                                        <p className="small text-secondary mb-0">
                                            Quality-focused sourcing
                                        </p>

                                    </div>

                                </div>


                                <div className="col-6">

                                    <div className="bg-light rounded-4 p-4 text-center h-100">

                                        <i className="bi bi-clipboard-check text-success fs-1"></i>

                                        <h5 className="fw-bold mt-3">
                                            Testing
                                        </h5>

                                        <p className="small text-secondary mb-0">
                                            Product testing resources
                                        </p>

                                    </div>

                                </div>


                                <div className="col-6">

                                    <div className="bg-light rounded-4 p-4 text-center h-100">

                                        <i className="bi bi-file-earmark-check text-success fs-1"></i>

                                        <h5 className="fw-bold mt-3">
                                            Documents
                                        </h5>

                                        <p className="small text-secondary mb-0">
                                            Export documentation
                                        </p>

                                    </div>

                                </div>


                                <div className="col-6">

                                    <div className="bg-success-subtle rounded-4 p-4 text-center h-100">

                                        <i className="bi bi-globe2 text-success fs-1"></i>

                                        <h5 className="fw-bold mt-3">
                                            Global
                                        </h5>

                                        <p className="small text-secondary mb-0">
                                            International requirements
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* CERTIFICATIONS */}
            <section className="bg-light py-5">

                <div className="container">

                    <div className="text-center mb-5">

                        <p className="text-success fw-semibold">
                            CERTIFICATIONS
                        </p>

                        <h2 className="fw-bold">
                            Certifications & Standards
                        </h2>

                        <p className="text-secondary">
                            Certification information maintained in our
                            product catalog database.
                        </p>

                    </div>


                    <div className="row g-4">

                        {certifications.map((certification) => (

                            <div
                                className="col-md-6 col-lg-3"
                                key={certification.id}
                            >

                                <div className="card border-0 shadow-sm rounded-4 h-100">

                                    <div className="card-body text-center p-4">

                                        <div
                                            className="bg-success-subtle text-success rounded-circle mx-auto d-flex align-items-center justify-content-center"
                                            style={{
                                                width: "70px",
                                                height: "70px"
                                            }}
                                        >

                                            <i className="bi bi-patch-check-fill fs-2"></i>

                                        </div>


                                        <h5 className="fw-bold mt-4">
                                            {certification.name}
                                        </h5>


                                        <p className="text-secondary mb-0">
                                            {certification.description}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </section>


            {/* LAB REPORTS */}
            <section className="py-5">

                <div className="container">

                    <div className="row align-items-center mb-5">

                        <div className="col-lg-7">

                            <p className="text-success fw-semibold mb-1">
                                PRODUCT TESTING
                            </p>

                            <h2 className="fw-bold">
                                Laboratory Reports
                            </h2>

                            <p className="text-secondary">
                                Testing information can be provided based
                                on product, buyer and destination-market
                                requirements.
                            </p>

                        </div>

                    </div>


                    <div className="row g-4">

                        {labReports.map((report) => (

                            <div
                                className="col-md-6 col-lg-4"
                                key={report.id}
                            >

                                <div className="border rounded-4 p-4 h-100">

                                    <div className="d-flex align-items-start gap-3">

                                        <div
                                            className="bg-success-subtle text-success rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                                            style={{
                                                width: "55px",
                                                height: "55px"
                                            }}
                                        >

                                            <i className="bi bi-file-earmark-medical fs-4"></i>

                                        </div>


                                        <div>

                                            <h5 className="fw-bold mb-2">
                                                {report.name}
                                            </h5>

                                            <p className="text-secondary mb-0">
                                                {report.description}
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </section>


            {/* QUALITY PROCESS */}
            <section className="bg-dark text-white py-5">

                <div className="container py-4">

                    <div className="text-center mb-5">

                        <p className="text-success fw-semibold">
                            OUR PROCESS
                        </p>

                        <h2 className="fw-bold">
                            Quality Process
                        </h2>

                    </div>


                    <div className="row g-4">

                        <div className="col-md-3">

                            <div className="text-center">

                                <div className="bg-success rounded-circle mx-auto d-flex align-items-center justify-content-center"
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
                                    Sourcing
                                </h5>

                                <p className="text-secondary">
                                    Product sourcing based on buyer
                                    requirements.
                                </p>

                            </div>

                        </div>


                        <div className="col-md-3">

                            <div className="text-center">

                                <div className="bg-success rounded-circle mx-auto d-flex align-items-center justify-content-center"
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
                                    Inspection
                                </h5>

                                <p className="text-secondary">
                                    Product specifications and quality
                                    requirements are reviewed.
                                </p>

                            </div>

                        </div>


                        <div className="col-md-3">

                            <div className="text-center">

                                <div className="bg-success rounded-circle mx-auto d-flex align-items-center justify-content-center"
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
                                    Testing
                                </h5>

                                <p className="text-secondary">
                                    Testing resources can be used where
                                    required.
                                </p>

                            </div>

                        </div>


                        <div className="col-md-3">

                            <div className="text-center">

                                <div className="bg-success rounded-circle mx-auto d-flex align-items-center justify-content-center"
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
                                    Export
                                </h5>

                                <p className="text-secondary">
                                    Products are prepared according to
                                    agreed requirements.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* BUYER NOTE */}
            <section className="py-5">

                <div className="container">

                    <div className="bg-success-subtle rounded-4 p-4 p-md-5">

                        <div className="row align-items-center g-4">

                            <div className="col-lg-8">

                                <h3 className="fw-bold">
                                    Need specific quality requirements?
                                </h3>

                                <p className="text-secondary mb-0">
                                    Include your required grade,
                                    specifications and testing requirements
                                    when submitting an enquiry.
                                </p>

                            </div>

                            <div className="col-lg-4 text-lg-end">

                                <a
                                    href="/enquiry"
                                    className="btn btn-success btn-lg"
                                >
                                    Send Enquiry
                                    <i className="bi bi-arrow-right ms-2"></i>
                                </a>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </main>
    );
}

export default Quality;