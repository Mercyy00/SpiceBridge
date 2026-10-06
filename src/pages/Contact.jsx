import { useState } from "react";
import { createContact } from "../services/api";

function Contact() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");


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
        setSuccess("");
        setError("");

        try {

            const contactData = {
                id: `contact-${Date.now()}`,
                ...formData,
                createdAt: new Date().toISOString()
            };

            await createContact(contactData);

            setSuccess(
                "Your message has been sent successfully."
            );

            setFormData({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: ""
            });

        } catch (err) {

            console.error(err);

            setError(
                "Unable to send your message. Please try again."
            );

        } finally {

            setLoading(false);

        }

    }


    return (
        <main>

            {/* PAGE HEADER */}
            <section className="bg-light py-5">

                <div className="container text-center py-4">

                    <p className="text-success fw-semibold mb-2">
                        GET IN TOUCH
                    </p>

                    <h1 className="display-5 fw-bold">
                        Contact Us
                    </h1>

                    <p
                        className="text-secondary mx-auto mt-3"
                        style={{ maxWidth: "700px" }}
                    >
                        Have a question about our products or export
                        services? Send us a message and we'll get back
                        to you.
                    </p>

                </div>

            </section>


            {/* CONTACT CONTENT */}
            <section className="py-5">

                <div className="container">

                    <div className="row g-5">

                        {/* CONTACT INFORMATION */}
                        <div className="col-lg-5">

                            <p className="text-success fw-semibold">
                                CONTACT INFORMATION
                            </p>

                            <h2 className="fw-bold mb-4">
                                Let's Talk About
                                <br />
                                Your Requirements
                            </h2>

                            <p className="text-secondary mb-5">
                                Contact our team for product information,
                                export requirements, quotations or general
                                business enquiries.
                            </p>


                            {/* LOCATION */}
                            <div className="d-flex gap-3 mb-4">

                                <div
                                    className="bg-success-subtle text-success rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                                    style={{
                                        width: "55px",
                                        height: "55px"
                                    }}
                                >
                                    <i className="bi bi-geo-alt fs-4"></i>
                                </div>

                                <div>
                                    <h6 className="fw-bold mb-1">
                                        Office
                                    </h6>

                                    <p className="text-secondary mb-0">
                                        Mumbai, Maharashtra, India
                                    </p>
                                </div>

                            </div>


                            {/* EMAIL */}
                            <div className="d-flex gap-3 mb-4">

                                <div
                                    className="bg-success-subtle text-success rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                                    style={{
                                        width: "55px",
                                        height: "55px"
                                    }}
                                >
                                    <i className="bi bi-envelope fs-4"></i>
                                </div>

                                <div>
                                    <h6 className="fw-bold mb-1">
                                        Email
                                    </h6>

                                    <p className="text-secondary mb-0">
                                        export@spicebridge.com
                                    </p>
                                </div>

                            </div>


                            {/* PHONE */}
                            <div className="d-flex gap-3 mb-4">

                                <div
                                    className="bg-success-subtle text-success rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                                    style={{
                                        width: "55px",
                                        height: "55px"
                                    }}
                                >
                                    <i className="bi bi-telephone fs-4"></i>
                                </div>

                                <div>
                                    <h6 className="fw-bold mb-1">
                                        Phone
                                    </h6>

                                    <p className="text-secondary mb-0">
                                        +91 98765 43210
                                    </p>
                                </div>

                            </div>


                            {/* BUSINESS HOURS */}
                            <div className="d-flex gap-3">

                                <div
                                    className="bg-success-subtle text-success rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                                    style={{
                                        width: "55px",
                                        height: "55px"
                                    }}
                                >
                                    <i className="bi bi-clock fs-4"></i>
                                </div>

                                <div>
                                    <h6 className="fw-bold mb-1">
                                        Business Hours
                                    </h6>

                                    <p className="text-secondary mb-0">
                                        Monday - Saturday
                                    </p>

                                    <p className="text-secondary mb-0">
                                        9:00 AM - 6:00 PM
                                    </p>
                                </div>

                            </div>

                        </div>


                        {/* CONTACT FORM */}
                        <div className="col-lg-7">

                            <div className="card border-0 shadow-sm rounded-4">

                                <div className="card-body p-4 p-md-5">

                                    <h4 className="fw-bold mb-4">
                                        Send Us a Message
                                    </h4>


                                    {/* SUCCESS */}
                                    {success && (

                                        <div
                                            className="alert alert-success"
                                            role="alert"
                                        >
                                            <i className="bi bi-check-circle-fill me-2"></i>

                                            {success}
                                        </div>

                                    )}


                                    {/* ERROR */}
                                    {error && (

                                        <div
                                            className="alert alert-danger"
                                            role="alert"
                                        >
                                            <i className="bi bi-exclamation-circle-fill me-2"></i>

                                            {error}
                                        </div>

                                    )}


                                    <form onSubmit={handleSubmit}>

                                        <div className="row g-4">

                                            {/* NAME */}
                                            <div className="col-md-6">

                                                <label className="form-label fw-semibold">
                                                    Your Name
                                                </label>

                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control form-control-lg"
                                                    placeholder="Enter your name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                />

                                            </div>


                                            {/* EMAIL */}
                                            <div className="col-md-6">

                                                <label className="form-label fw-semibold">
                                                    Email Address
                                                </label>

                                                <input
                                                    type="email"
                                                    name="email"
                                                    className="form-control form-control-lg"
                                                    placeholder="you@example.com"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                />

                                            </div>


                                            {/* PHONE */}
                                            <div className="col-md-6">

                                                <label className="form-label fw-semibold">
                                                    Phone Number
                                                </label>

                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    className="form-control form-control-lg"
                                                    placeholder="+91 98765 43210"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                />

                                            </div>


                                            {/* SUBJECT */}
                                            <div className="col-md-6">

                                                <label className="form-label fw-semibold">
                                                    Subject
                                                </label>

                                                <input
                                                    type="text"
                                                    name="subject"
                                                    className="form-control form-control-lg"
                                                    placeholder="Enter subject"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    required
                                                />

                                            </div>


                                            {/* MESSAGE */}
                                            <div className="col-12">

                                                <label className="form-label fw-semibold">
                                                    Message
                                                </label>

                                                <textarea
                                                    name="message"
                                                    className="form-control"
                                                    rows="6"
                                                    placeholder="Write your message..."
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    required
                                                ></textarea>

                                            </div>


                                            {/* SUBMIT */}
                                            <div className="col-12">

                                                <button
                                                    type="submit"
                                                    className="btn btn-success btn-lg w-100"
                                                    disabled={loading}
                                                >

                                                    {loading ? (
                                                        <>
                                                            <span
                                                                className="spinner-border spinner-border-sm me-2"
                                                                role="status"
                                                            ></span>

                                                            Sending...
                                                        </>
                                                    ) : (
                                                        <>
                                                            Send Message
                                                            <i className="bi bi-send ms-2"></i>
                                                        </>
                                                    )}

                                                </button>

                                            </div>

                                        </div>

                                    </form>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* WHY CONTACT US */}
            <section className="bg-light py-5">

                <div className="container">

                    <div className="text-center mb-5">

                        <p className="text-success fw-semibold">
                            HOW WE CAN HELP
                        </p>

                        <h2 className="fw-bold">
                            Business Enquiries
                        </h2>

                    </div>


                    <div className="row g-4">

                        <div className="col-md-4">

                            <div className="bg-white rounded-4 p-4 text-center h-100 shadow-sm">

                                <i className="bi bi-box-seam text-success fs-1"></i>

                                <h5 className="fw-bold mt-3">
                                    Product Information
                                </h5>

                                <p className="text-secondary mb-0">
                                    Ask about product specifications,
                                    grades, origin and packaging.
                                </p>

                            </div>

                        </div>


                        <div className="col-md-4">

                            <div className="bg-white rounded-4 p-4 text-center h-100 shadow-sm">

                                <i className="bi bi-file-earmark-text text-success fs-1"></i>

                                <h5 className="fw-bold mt-3">
                                    Quotations
                                </h5>

                                <p className="text-secondary mb-0">
                                    Submit your requirements to begin
                                    the quotation process.
                                </p>

                            </div>

                        </div>


                        <div className="col-md-4">

                            <div className="bg-white rounded-4 p-4 text-center h-100 shadow-sm">

                                <i className="bi bi-globe2 text-success fs-1"></i>

                                <h5 className="fw-bold mt-3">
                                    Export Support
                                </h5>

                                <p className="text-secondary mb-0">
                                    Discuss your destination and export
                                    requirements with the team.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </main>
    );
}

export default Contact;