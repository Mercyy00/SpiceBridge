import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="container py-5">

            <div
                className="row justify-content-center align-items-center text-center"
                style={{ minHeight: "65vh" }}
            >

                <div className="col-md-7 col-lg-6">

                    {/* Icon */}
                    <div className="mb-4">
                        <i className="bi bi-exclamation-circle display-1 text-success"></i>
                    </div>

                    {/* 404 */}
                    <h1 className="display-1 fw-bold text-success">
                        404
                    </h1>

                    <h2 className="fw-bold mb-3">
                        Page Not Found
                    </h2>

                    <p className="text-secondary mb-4">
                        Sorry, the page you are looking for does not
                        exist or may have been moved.
                    </p>

                    {/* Buttons */}
                    <div className="d-flex justify-content-center gap-2">

                        <Link
                            to="/"
                            className="btn btn-success px-4"
                        >
                            <i className="bi bi-house me-2"></i>
                            Go Home
                        </Link>

                        <Link
                            to="/products"
                            className="btn btn-outline-success px-4"
                        >
                            <i className="bi bi-box-seam me-2"></i>
                            View Products
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default NotFound;