import React from "react";
import "./AboutUs.css";

export default function AboutUs() {
    return (
        <div className="aboutus-page">
            {/* Hero Section */}
            <div className="about-hero">
                <h1>Royal Restaurant</h1>
                <p>Where tradition meets taste since day one</p>
            </div>

            {/* Story Section */}
            <section className="story-section">
                <div className="story-text">
                    <h2>Our Story</h2>
                    <p>
                        At <strong>Royal Restaurant</strong>, we believe food is more than just
                        a meal — it’s an experience. From our humble beginnings as a small
                        family kitchen, we’ve grown into a beloved restaurant serving
                        authentic Arabian flavors across the city.
                    </p>
                    <p>
                        Every plate is made with love, tradition, and carefully chosen
                        spices passed down through generations.
                    </p>
                </div>
                <div className="story-image">
                    <img src="https://images.unsplash.com/photo-1508424757105-b6d5ad9329d0?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Royal Mandhi Restaurant" />
                </div>
            </section>

            {/* Highlights Section */}
            <section className="highlights">
                <div className="highlight-card">
                    <h3>Our Mission</h3>
                    <p>
                        Delivering authentic Food that blends tradition with
                        modern dining.
                    </p>
                </div>
                <div className="highlight-card">
                    <h3>Our History</h3>
                    <p>
                        A family-run kitchen that became a city favorite for food lovers
                        everywhere.
                    </p>
                </div>
                <div className="highlight-card">
                    <h3>What Makes Us Special</h3>
                    <p>
                        Handpicked spices, fresh ingredients, and chefs who treat cooking as
                        an art.
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="contact-section">
                <h2>Get in Touch</h2>
                <div className="contact-container">
                    {/* Contact Form */}
                    <form className="contact-form">
                        <input type="text" placeholder="Your Name" required />
                        <input type="email" placeholder="Your Email" required />
                        <textarea placeholder="Your Message" required></textarea>
                        <button type="submit">Send Message</button>
                    </form>

                    {/* Contact Info */}
                    <div className="contact-info">


                        <div className="map-container">
                            <iframe
                                title="location"
                                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3938.2781597087826!2d75.7711278!3d11.2550512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1695807861513!5m2!1sen!2sin"
                                width="100%"
                                height="240"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </div>

                    </div>
                </div>
                <div className="details">
                    <p><strong>Phone:</strong> +91 98765 43210</p>
                    <p><strong>Email:</strong> RoyalRestaurant@gmail.com</p>
                    <p><strong>Opening Hours:</strong> 11:00 AM – 11:00 PM</p>
                </div>
            </section>

        </div>
    );
}
