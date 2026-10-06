import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setError("");
        setSuccess("");

        // Check password
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must contain at least 6 characters.");
            return;
        }

        try {
            setLoading(true);

            // Check whether email already exists
            const checkResponse = await fetch(
                `${API_URL}/users?email=${encodeURIComponent(
                    formData.email
                )}`
            );

            const existingUsers = await checkResponse.json();

            if (existingUsers.length > 0) {
                setError("An account with this email already exists.");
                return;
            }

            // Create new user
            const newUser = {
                id: `u-${Date.now()}`,
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: "buyer"
            };

            const response = await fetch(`${API_URL}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            });

            if (!response.ok) {
                throw new Error("Registration failed");
            }

            setSuccess(
                "Registration successful! Redirecting to login..."
            );

            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
            });

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (err) {
            console.error(err);
            setError(
                "Unable to register. Please make sure the backend server is running."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-md-7 col-lg-5">

                    <div className="card border-0 shadow-sm">

                        {/* Header */}
                        <div className="card-body p-4 p-md-5">

                            <div className="text-center mb-4">

                                <h2 className="fw-bold">
                                    Create Account
                                </h2>

                                <p className="text-secondary mb-0">
                                    Register as a SpiceBridge buyer
                                </p>

                            </div>

                            {/* Error */}
                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}

                            {/* Success */}
                            {success && (
                                <div className="alert alert-success">
                                    {success}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>

                                {/* Name */}
                                <div className="mb-3">

                                    <label className="form-label fw-semibold">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="Enter your full name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                {/* Email */}
                                <div className="mb-3">

                                    <label className="form-label fw-semibold">
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                {/* Password */}
                                <div className="mb-3">

                                    <label className="form-label fw-semibold">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Create a password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                {/* Confirm Password */}
                                <div className="mb-4">

                                    <label className="form-label fw-semibold">
                                        Confirm Password
                                    </label>

                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        className="form-control"
                                        placeholder="Confirm your password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                {/* Register Button */}
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

                                            Creating Account...
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-person-plus me-2"></i>
                                            Create Account
                                        </>
                                    )}
                                </button>

                            </form>

                            {/* Login link */}
                            <div className="text-center mt-4">

                                <span className="text-secondary">
                                    Already have an account?
                                </span>{" "}

                                <Link
                                    to="/login"
                                    className="text-success fw-semibold text-decoration-none"
                                >
                                    Login
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Register;