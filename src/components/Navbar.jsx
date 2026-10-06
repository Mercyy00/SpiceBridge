import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const auth = useAuth();

    const {
        user,
        isLoggedIn,
        logout
    } = auth;

    function handleLogout() {
        logout();
    }

    return (
        <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
            <div className="container">

                <Link
                    to="/"
                    className="navbar-brand fw-bold fs-4 d-flex align-items-center"
                >
                    <i className="bi bi-flower1 text-success fs-3 me-2"></i>
                    <span>Spice<span className="text-success">Bridge</span></span>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#spiceBridgeNavbar"
                    aria-controls="spiceBridgeNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="spiceBridgeNavbar"
                >

                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <NavLink
                                to="/"
                                className="nav-link"
                            >
                                Home
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                to="/products"
                                className="nav-link"
                            >
                                Products
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                to="/enquiry"
                                className="nav-link"
                            >
                                Enquiry
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                to="/quality"
                                className="nav-link"
                            >
                                Quality
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                to="/export-info"
                                className="nav-link"
                            >
                                Export Info
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                to="/about"
                                className="nav-link"
                            >
                                About
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                to="/contact"
                                className="nav-link"
                            >
                                Contact
                            </NavLink>
                        </li>

                        {isLoggedIn && (
                            <li className="nav-item">
                                <NavLink
                                    to="/dashboard"
                                    className="nav-link"
                                >
                                    Dashboard
                                </NavLink>
                            </li>
                        )}

                        {isLoggedIn && user?.role === "admin" && (
                            <li className="nav-item">
                                <NavLink
                                    to="/admin"
                                    className="nav-link text-success fw-semibold"
                                >
                                    <i className="bi bi-speedometer2 me-1"></i>
                                    Admin
                                </NavLink>
                            </li>
                        )}

                    </ul>

                    <div className="d-flex align-items-center gap-2">

                        {isLoggedIn ? (
                            <>
                                <span className="badge bg-success-subtle text-success border border-success-subtle d-none d-md-inline-flex align-items-center gap-1 py-2 px-3">
                                    <i className="bi bi-person-circle"></i>
                                    <span className="fw-semibold">{user?.name}</span>
                                    <span className="badge bg-success text-white ms-1 text-uppercase" style={{ fontSize: "0.65rem" }}>
                                        {user?.role}
                                    </span>
                                </span>

                                <button
                                    type="button"
                                    className="btn btn-outline-danger btn-sm px-3"
                                    onClick={handleLogout}
                                >
                                    <i className="bi bi-box-arrow-right me-1"></i>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="btn btn-success px-4"
                            >
                                <i className="bi bi-box-arrow-in-right me-1"></i>
                                Login
                            </Link>
                        )}

                    </div>

                </div>
            </div>
        </nav>
    );
}

export default Navbar;