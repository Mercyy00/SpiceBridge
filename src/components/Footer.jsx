import { Link } from "react-router-dom";

function Footer() {

    return (

        <footer className="bg-dark text-white pt-5 pb-3 mt-5">

            <div className="container">

                <div className="row g-4">

                    {/* Company */}

                    <div className="col-md-4">

                        <h4 className="fw-bold">
                            Spice<span className="text-success">Bridge</span>
                        </h4>

                        <p className="text-secondary mt-3">
                            Connecting quality Indian spices and
                            agro products with buyers across the world.
                        </p>

                        <p className="small text-secondary mb-0">
                            Trusted sourcing. Reliable quality.
                            Global supply.
                        </p>

                    </div>


                    {/* Quick Links */}

                    <div className="col-6 col-md-2">

                        <h6 className="fw-bold mb-3">
                            Quick Links
                        </h6>

                        <ul className="list-unstyled">

                            <li className="mb-2">
                                <Link
                                    to="/"
                                    className="text-secondary text-decoration-none"
                                >
                                    Home
                                </Link>
                            </li>

                            <li className="mb-2">
                                <Link
                                    to="/products"
                                    className="text-secondary text-decoration-none"
                                >
                                    Products
                                </Link>
                            </li>

                            <li className="mb-2">
                                <Link
                                    to="/quality"
                                    className="text-secondary text-decoration-none"
                                >
                                    Quality
                                </Link>
                            </li>

                            <li className="mb-2">
                                <Link
                                    to="/about"
                                    className="text-secondary text-decoration-none"
                                >
                                    About
                                </Link>
                            </li>

                        </ul>

                    </div>


                    {/* Business */}

                    <div className="col-6 col-md-2">

                        <h6 className="fw-bold mb-3">
                            Business
                        </h6>

                        <ul className="list-unstyled">

                            <li className="mb-2">
                                <Link
                                    to="/enquiry"
                                    className="text-secondary text-decoration-none"
                                >
                                    Send Enquiry
                                </Link>
                            </li>

                            <li className="mb-2">
                                <Link
                                    to="/export-info"
                                    className="text-secondary text-decoration-none"
                                >
                                    Export Info
                                </Link>
                            </li>

                            <li className="mb-2">
                                <Link
                                    to="/contact"
                                    className="text-secondary text-decoration-none"
                                >
                                    Contact Us
                                </Link>
                            </li>

                            <li className="mb-2">
                                <Link
                                    to="/login"
                                    className="text-secondary text-decoration-none"
                                >
                                    Login
                                </Link>
                            </li>

                        </ul>

                    </div>


                    {/* Contact */}

                    <div className="col-md-4">

                        <h6 className="fw-bold mb-3">
                            Contact
                        </h6>

                        <p className="text-secondary mb-2">
                            📍 Mumbai, Maharashtra, India
                        </p>

                        <p className="text-secondary mb-2">
                            📧 export@spicebridge.com
                        </p>

                        <p className="text-secondary mb-3">
                            📞 +91 98765 43210
                        </p>


                        {/* Social Icons */}

                        <div className="d-flex gap-2">

                            <a
                                href="#"
                                className="btn btn-outline-light btn-sm rounded-circle"
                            >
                                <i className="bi bi-linkedin"></i>
                            </a>

                            <a
                                href="#"
                                className="btn btn-outline-light btn-sm rounded-circle"
                            >
                                <i className="bi bi-facebook"></i>
                            </a>

                            <a
                                href="#"
                                className="btn btn-outline-light btn-sm rounded-circle"
                            >
                                <i className="bi bi-instagram"></i>
                            </a>

                        </div>

                    </div>

                </div>


                {/* Divider */}

                <hr className="border-secondary my-4" />


                {/* Bottom */}

                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">

                    <p className="text-secondary small mb-0">
                        © 2026 SpiceBridge. All rights reserved.
                    </p>

                    <p className="text-secondary small mb-0">
                        Spices & Agro Products Export
                    </p>

                </div>

            </div>

        </footer>

    );
}

export default Footer;