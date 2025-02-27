import React from 'react';
import mainImage from '/src/assets/AboutUs/mainImage.webp';

const AboutUs = () => {
    return (
        <div className="bg-white">
            {/*Main Section - Simple and Clean Header with Wavy Bottom*/}
            <section className="py-16 bg-green-50 relative">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4 text-green-600">About Wiqaya</h1>
                    <p className="text-xl text-green-800 max-w-2xl mx-auto">
                        Where peace of mind meets innovation in insurance
                    </p>
                </div>
                {/* Wavy bottom */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden" style={{ height: "50px" }}>
                    <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: "100%", width: "100%" }}>
                        <path d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
                              style={{ stroke: "none", fill: "white" }}></path>
                    </svg>
                </div>
            </section>

            {/*Our Mission - With Image Side by Side*/}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1">
                        <h2 className="text-3xl font-bold mb-6 text-green-600">Our Mission</h2>
                        <div className="space-y-4">
                            <p className="text-lg text-gray-700">
                                At Wiqaya, our mission is to revolutionize the insurance experience for Tunisians through
                                technology and accessibility. We believe that everyone deserves reliable protection
                                that's easy to understand and simple to manage.
                            </p>
                            <p className="text-lg text-gray-700">
                                We're committed to providing transparent, affordable, and comprehensive insurance
                                solutions that empower our customers to protect what matters most to them, all
                                from the convenience of their smartphones.
                            </p>
                        </div>
                    </div>
                    <div className="order-1 md:order-2">
                        <img
                            src={mainImage}
                            alt="Wiqaya Insurance App"
                            className="w-full h-auto rounded-xl"
                        />
                    </div>
                </div>
            </section>

            {/*Key Numbers - Soft Design with Wavy Top and Bottom*/}
            <section className="py-16 px-4 bg-green-50 relative">
                {/* Wavy top */}
                <div className="absolute top-0 left-0 w-full overflow-hidden" style={{ height: "50px" }}>
                    <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: "100%", width: "100%" }}>
                        <path d="M0.00,49.98 C150.00,150.00 271.49,-49.98 500.00,49.98 L500.00,0.00 L0.00,0.00 Z"
                              style={{ stroke: "none", fill: "white" }}></path>
                    </svg>
                </div>

                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12 text-green-600">Wiqaya by the Numbers</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-sm text-center transition-transform hover:scale-105">
                            <div className="text-5xl font-bold text-green-500 mb-3">50,000+</div>
                            <div className="text-lg text-gray-600">Satisfied Customers</div>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm text-center transition-transform hover:scale-105">
                            <div className="text-5xl font-bold text-green-500 mb-3">100,000+</div>
                            <div className="text-lg text-gray-600">App Downloads</div>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm text-center transition-transform hover:scale-105">
                            <div className="text-5xl font-bold text-green-500 mb-3">4.8/5</div>
                            <div className="text-lg text-gray-600">Customer Satisfaction</div>
                        </div>
                    </div>
                </div>

                {/* Wavy bottom */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden" style={{ height: "50px" }}>
                    <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: "100%", width: "100%" }}>
                        <path d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
                              style={{ stroke: "none", fill: "white" }}></path>
                    </svg>
                </div>
            </section>

            {/*Our Story - Clean and Airy*/}
            <section className="py-16 px-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-10 text-green-600">Our Story</h2>
                    <div className="space-y-6 text-gray-700">
                        <p className="text-lg">
                            Wiqaya was born from a simple observation: insurance in Tunisia was often complicated,
                            time-consuming, and inaccessible for many. In 2020, a team of tech enthusiasts and
                            insurance experts came together with a shared vision to change this reality.
                        </p>
                        <p className="text-lg">
                            We started with the belief that technology could transform the insurance experience,
                            making it more transparent, affordable, and convenient. Our founding team spent months
                            researching the pain points in the traditional insurance process and designing solutions
                            that would address these challenges.
                        </p>
                        <p className="text-lg">
                            After a year of development and testing, we launched the Wiqaya app in 2021, offering
                            a streamlined way for Tunisians to purchase, manage, and claim insurance - all from their
                            smartphones. Since then, we've grown from a small startup to a trusted insurance partner
                            for thousands of Tunisians across the country.
                        </p>
                        <div className="bg-green-50 p-8 rounded-xl italic text-center my-10">
                            <p className="text-xl text-green-700">
                                "Wiqaya isn't just an app. It's our contribution to building a more secure future for Tunisia,
                                one policy at a time."
                            </p>
                            <p className="text-right font-medium mt-4 text-green-800">— Founder's quote</p>
                        </div>
                    </div>
                </div>
            </section>

            {/*Our Values - Light and Comforting with Wavy Top and Bottom*/}
            <section className="py-16 px-4 bg-green-50 relative">
                {/* Wavy top */}
                <div className="absolute top-0 left-0 w-full overflow-hidden" style={{ height: "50px" }}>
                    <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: "100%", width: "100%" }}>
                        <path d="M0.00,49.98 C200.00,150.00 300.00,-49.98 500.00,49.98 L500.00,0.00 L0.00,0.00 Z"
                              style={{ stroke: "none", fill: "white" }}></path>
                    </svg>
                </div>

                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-10 text-green-600">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-sm transition-all hover:shadow-md">
                            <h3 className="text-2xl font-bold mb-4 text-green-500">Transparency</h3>
                            <p className="text-gray-700">We believe in clear communication and no hidden fees. Our customers always know exactly what they're getting.</p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm transition-all hover:shadow-md">
                            <h3 className="text-2xl font-bold mb-4 text-green-500">Innovation</h3>
                            <p className="text-gray-700">We're constantly looking for ways to improve the insurance experience through technology and creative solutions.</p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm transition-all hover:shadow-md">
                            <h3 className="text-2xl font-bold mb-4 text-green-500">Accessibility</h3>
                            <p className="text-gray-700">We're committed to making insurance available to all Tunisians, regardless of location or background.</p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm transition-all hover:shadow-md">
                            <h3 className="text-2xl font-bold mb-4 text-green-500">Customer-Centric</h3>
                            <p className="text-gray-700">Everything we do is designed with our customers in mind, putting their needs and experiences first.</p>
                        </div>
                    </div>
                </div>

                {/* Wavy bottom */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden" style={{ height: "50px" }}>
                    <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: "100%", width: "100%" }}>
                        <path d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
                              style={{ stroke: "none", fill: "white" }}></path>
                    </svg>
                </div>
            </section>

            {/*Contact Section - Gentle Call to Action*/}
            <section className="py-16 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6 text-green-600">Get in Touch</h2>
                    <p className="text-lg mb-8 text-gray-700">Have questions about Wiqaya? Our team is here to help.</p>
                    <button className="bg-green-500 text-white px-8 py-4 rounded-full font-medium hover:bg-green-600 transition shadow-sm">
                        Contact Us
                    </button>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;