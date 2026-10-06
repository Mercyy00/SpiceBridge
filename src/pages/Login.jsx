import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    // Controlled form
    function handleChange(e) {

        const { name, value } = e.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));

    }


    async function handleSubmit(e) {

        e.preventDefault();

        setLoading(true);
        setError("");

        try {

            const user = await loginUser(
                formData.email,
                formData.password
            );

            if (!user) {

                setError("Invalid email or password.");
                return;

            }

            // Send user to AuthContext
            login(user);

            // Go to home page
            navigate("/");

        } catch (err) {

            console.error(err);

            setError(
                "Unable to login. Please check that the backend server is running."
            );

        } finally {

            setLoading(false);

        }

    }


    return (
        <main className="bg-light min-vh-100 d-flex align-items-center py-5">

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-12 col-md-8 col-lg-5">

                        <div className="card border-0 shadow rounded-4">

                            <div className="card-body p-4 p-md-5">

                                {/* Logo */}
                                <div className="text-center mb-4">

                                    <h2 className="fw-bold">
                                        Spice
                                        <span className="text-success">
                                            Bridge
                                        </span>
                                    </h2>

                                    <p className="text-secondary mb-0">
                                        Sign in to your account
                                    </p>

                                </div>


                                {/* Error message */}
                                {error && (

                                    <div
                                        className="alert alert-danger"
                                        role="alert"
                                    >
                                        <i className="bi bi-exclamation-circle me-2"></i>

                                        {error}

                                    </div>

                                )}

                                {/* Quick Demo Login Helper */}
                                <div className="bg-success-subtle bg-opacity-25 p-3 rounded-3 mb-4 border border-success-subtle">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <small className="fw-bold text-success">
                                            <i className="bi bi-lightning-charge-fill me-1"></i> Quick Demo Fill
                                        </small>
                                        <span className="badge bg-success-subtle text-success">Demo Accounts</span>
                                    </div>
                                    <div className="d-flex gap-2">
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-success flex-fill fw-semibold"
                                            onClick={() => setFormData({ email: "admin@spicebridge.com", password: "admin123" })}
                                        >
                                            👑 Admin
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-primary flex-fill fw-semibold"
                                            onClick={() => setFormData({ email: "buyer@spicebridge.com", password: "buyer123" })}
                                        >
                                            🛒 Buyer
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-dark flex-fill fw-semibold"
                                            onClick={() => setFormData({ email: "sales@spicebridge.com", password: "sales123" })}
                                        >
                                            💼 Sales
                                        </button>
                                    </div>
                                </div>


                                {/* Login Form */}
                                <form onSubmit={handleSubmit}>

                                    {/* EMAIL */}
                                    <div className="mb-3">

                                        <label
                                            htmlFor="email"
                                            className="form-label fw-semibold"
                                        >
                                            Email Address
                                        </label>

                                        <div className="input-group">

                                            <span className="input-group-text">
                                                <i className="bi bi-envelope"></i>
                                            </span>

                                            <input
                                                id="email"
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                placeholder="Enter your email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />

                                        </div>

                                    </div>


                                    {/* PASSWORD */}
                                    <div className="mb-4">

                                        <label
                                            htmlFor="password"
                                            className="form-label fw-semibold"
                                        >
                                            Password
                                        </label>

                                        <div className="input-group">

                                            <span className="input-group-text">
                                                <i className="bi bi-lock"></i>
                                            </span>

                                            <input
                                                id="password"
                                                type="password"
                                                name="password"
                                                className="form-control"
                                                placeholder="Enter your password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                            />

                                        </div>

                                    </div>


                                    {/* LOGIN BUTTON */}
                                    <button
                                        type="submit"
                                        className="btn btn-success w-100 py-2"
                                        disabled={loading}
                                    >

                                        {loading ? (
                                            <>
                                                <span
                                                    className="spinner-border spinner-border-sm me-2"
                                                    role="status"
                                                ></span>

                                                Logging in...
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-box-arrow-in-right me-2"></i>
                                                Login
                                            </>
                                        )}

                                    </button>

                                </form>


                                {/* CREATE ACCOUNT */}
                                <div className="text-center mt-4">

                                    <span className="text-secondary">
                                        Don't have an account?
                                    </span>{" "}

                                    <Link
                                        to="/register"
                                        className="text-success fw-semibold text-decoration-none"
                                    >
                                        Create Account
                                    </Link>

                                </div>


                                {/* BACK TO HOME */}
                                <div className="text-center mt-3">

                                    <Link
                                        to="/"
                                        className="text-success text-decoration-none"
                                    >
                                        <i className="bi bi-arrow-left me-1"></i>
                                        Back to Home
                                    </Link>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
}

export default Login;