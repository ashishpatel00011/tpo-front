import React, { useState } from "react";
import "./contact.css";
import { addcontect } from "../../api/add_contect";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = (formData) => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }
    if (!formData.subject) errors.subject = "Subject is required";
    if (!formData.message) errors.message = "Message is required";
    if (!formData.number) errors.number = "Contact number is required";
    else if (!/^\d{10}$/.test(formData.number)) {
      errors.number = "Contact number must be 10 digits";
    }
    if (!formData.type) errors.type = "Please select a query type";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage("");

    const formData = {
      name: e.target["name"].value,
      email: e.target["email"].value,
      subject: e.target["subject"].value,
      message: e.target["message"].value,
      number: e.target["phone"].value,
      type: e.target["type"].value,
    };

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      await addcontect(formData);
      e.target.reset();
      setStatusMessage("Your message has been sent successfully!");
      setErrors({});
    } catch (error) {
      setStatusMessage("Failed to send your message. Please try again.");
      console.error("Error inserting data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="section-background">
        <div className="cont">
          <div className="row">
            <div className="col-md-12">
              <h3 className="text-uppercase">Get In Touch</h3>
              <form
                id="widget-contact-form"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="row">
                  {/* Name Input */}
                  <div className="form-group col-sm-6">
                    <label htmlFor="name">Name</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fa fa-user"></i>
                      </span>
                      <input
                        type="text"
                        name="name"
                        className={`form-control required name ${errors.name ? 'is-invalid' : ''}`}
                        placeholder="Enter your Name"
                        required
                      />
                      {errors.name && <small className="text-danger">{errors.name}</small>}
                    </div>
                  </div>
                  {/* Email Input */}
                  <div className="form-group col-sm-6">
                    <label htmlFor="email">Email</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fa fa-envelope"></i>
                      </span>
                      <input
                        type="email"
                        name="email"
                        className={`form-control required email ${errors.email ? 'is-invalid' : ''}`}
                        placeholder="Enter your Email"
                        required
                      />
                      {errors.email && <small className="text-danger">{errors.email}</small>}
                    </div>
                  </div>
                  {/* Query Select */}
                  <div className="col-sm-12">
                    <label htmlFor="subject">
                      QUERY REGARDING
                      <small style={{ color: "grey" }}>
                        (Placement, Internship, or both) Select from the menu
                      </small>
                    </label>
                    <select name="type" className={`form-control ${errors.type ? 'is-invalid' : ''}`}>
                      <option value="">Select an option</option>
                      <option value="Placement">Campus Recruitment</option>
                      <option value="Internship">Internship</option>
                      <option value="Both">
                        Campus Recruitment &amp; Internship
                      </option>
                    </select>
                    {errors.type && <small className="text-danger">{errors.type}</small>}
                  </div>
                  {/* Phone Input */}
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="upper" htmlFor="phone">
                        Contact Number
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="fa fa-phone"></i>
                        </span>
                        <input
                          className={`form-control required ${errors.number ? 'is-invalid' : ''}`}
                          name="phone"
                          placeholder="Enter phone"
                          id="phone"
                          type="tel"
                          pattern="[0-9]{10}"
                          maxLength="10"
                          required
                        />
                      </div>
                      {errors.number && <small className="text-danger">{errors.number}</small>}
                    </div>
                  </div>
                </div>
                {/* Subject Input */}
                <div className="row">
                  <div className="form-group col-sm-12">
                    <label htmlFor="subject">Your Subject</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fa fa-tag"></i>
                      </span>
                      <input
                        type="text"
                        name="subject"
                        className={`form-control required ${errors.subject ? 'is-invalid' : ''}`}
                        required
                      />
                      {errors.subject && <small className="text-danger">{errors.subject}</small>}
                    </div>
                  </div>
                </div>
                {/* Message Input */}
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    name="message"
                    rows="5"
                    className={`form-control required ${errors.message ? 'is-invalid' : ''}`}
                    placeholder="Your Name, Contact No. &amp; Suitable time to reach you"
                    required
                  ></textarea>
                  {errors.message && <small className="text-danger">{errors.message}</small>}
                </div>
                {/* Submit Button */}
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <span>Sending...</span>
                  ) : (
                    <span>
                      <i className="fa fa-paper-plane"></i>&nbsp;Send message
                    </span>
                  )}
                </button>
                {/* Status Message */}
                {statusMessage && (
                  <p style={{ color: statusMessage.includes("successfully") ? "green" : "red" }}>
                    {statusMessage}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
