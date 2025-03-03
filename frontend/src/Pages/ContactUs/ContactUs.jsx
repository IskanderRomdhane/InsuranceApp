import { useState, useEffect } from 'react';
import ContactUsMain from "/src/assets/ContactUs/ContactUsMain.svg";
import centers from "./ContactUsDetails.js";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        from_name: '',
        email_from: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [formStatus, setFormStatus] = useState({
        submitted: false,
        error: false,
        message: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [activeOffice, setActiveOffice] = useState(0);

    // Auto-cycle through offices
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveOffice(prev => (prev + 1) % centers.length);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setSelectedCenter(centers[activeOffice]);
    }, [activeOffice]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Send email using EmailJS
        emailjs.sendForm(
            'service_6rz91xo',
            'template_a9vcy73',
            e.target,
            '84_CoJjd12JhDxWEB'
        )
            .then((result) => {
                console.log('Email sent successfully:', result.text);
                // Show success message
                setFormStatus({
                    submitted: true,
                    error: false,
                    message: 'Thank you for your message! We will get back to you soon.'
                });

                // Reset form after submission
                setFormData({
                    from_name: '',
                    email_from: '',
                    phone: '',
                    subject: '',
                    message: ''
                });
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Failed to send email:', error.text);
                // Show error message
                setFormStatus({
                    submitted: true,
                    error: true,
                    message: 'There was an error sending your message. Please try again later.'
                });
                setIsLoading(false);
            });
    };

    const [selectedCenter, setSelectedCenter] = useState(centers[0]);

    // Animation for input fields
    const inputFocusAnimation = "transition-transform duration-300 transform focus:-translate-y-1";

    return (
        <div className="bg-white overflow-hidden">
            {/* Header Banner with Animation */}
            <section className="relative h-64 md:h-72 overflow-hidden">
                <img
                    src={ContactUsMain}
                    alt="Contact Wiqaya Insurance"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-green-800 bg-opacity-40 flex items-center justify-center backdrop-blur-sm">
                    <div className="text-center text-white p-4 animate-fadeIn">
                        <h1 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">Contact Us</h1>
                        <p className="text-lg md:text-xl drop-shadow-md">We're here to help with your insurance needs</p>
                    </div>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form Section */}
                    <div className="transform transition-all duration-500 hover:shadow-xl rounded-xl p-6 border border-gray-100">
                        <h2 className="text-2xl font-bold text-green-600 mb-6 relative inline-block">
                            Send Us a Message
                            <span className="absolute bottom-0 left-0 w-full h-1 bg-green-400 rounded"></span>
                        </h2>

                        {formStatus.submitted ? (
                            <div className={`${formStatus.error ? 'bg-red-100 border-red-400 text-red-700' : 'bg-green-100 border-green-400 text-green-700'} px-4 py-3 rounded-lg mb-6 border animate-fadeIn`}>
                                {formStatus.message}
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="from_name" className="block text-gray-700 mb-1 font-medium">Full Name</label>
                                    <input
                                        type="text"
                                        id="from_name"
                                        name="from_name"
                                        value={formData.from_name}
                                        onChange={handleChange}
                                        className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm ${inputFocusAnimation}`}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="email_from" className="block text-gray-700 mb-1 font-medium">Email Address</label>
                                        <input
                                            type="email"
                                            id="email_from"
                                            name="email_from"
                                            value={formData.email_from}
                                            onChange={handleChange}
                                            className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm ${inputFocusAnimation}`}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-gray-700 mb-1 font-medium">Phone Number</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm ${inputFocusAnimation}`}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-gray-700 mb-1 font-medium">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm ${inputFocusAnimation}`}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-gray-700 mb-1 font-medium">Your Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="5"
                                        className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm ${inputFocusAnimation}`}
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="bg-green-500 text-white py-3 px-8 rounded-lg hover:bg-green-600 transition duration-300 transform hover:scale-105 shadow-md flex items-center justify-center space-x-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <span>Send Message</span>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Map and Office Locations */}
                    <div className="transform transition-all duration-500 hover:shadow-xl rounded-xl p-6 border border-gray-100">
                        <h2 className="text-2xl font-bold text-green-600 mb-6 relative inline-block">
                            Our Locations
                            <span className="absolute bottom-0 left-0 w-full h-1 bg-green-400 rounded"></span>
                        </h2>

                        {/* Google Maps iframe */}
                        <div className="w-full h-64 bg-gray-200 rounded-lg mb-6 overflow-hidden shadow-md transition-transform duration-300 transform hover:scale-105">
                            <iframe
                                src={selectedCenter.embedMapUrl}
                                width="100%"
                                height="100%"
                                style={{border: 0}}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title={`Map showing ${selectedCenter.name}`}
                                className="w-full h-full"
                            ></iframe>
                        </div>

                        {/* Office selection */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Select an Office:</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                {centers.map((center, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setSelectedCenter(center);
                                            setActiveOffice(index);
                                        }}
                                        className={`p-2 text-sm rounded-md transition-all duration-300 transform hover:scale-105 ${
                                            selectedCenter.name === center.name
                                                ? 'bg-green-500 text-white shadow-md'
                                                : 'bg-gray-100 hover:bg-gray-200'
                                        }`}
                                    >
                                        {center.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Selected office details */}
                        <div className="bg-green-50 p-4 rounded-lg shadow-md transition-all duration-500 transform hover:shadow-lg">
                            <h3 className="font-bold text-lg mb-2">
                                {selectedCenter.name}
                                {selectedCenter.mainOffice && <span className="ml-2 text-xs bg-green-600 text-white px-2 py-1 rounded">Headquarters</span>}
                            </h3>
                            <div className="space-y-2">
                                <p className="flex items-start">
                                    <svg className="w-5 h-5 mr-2 text-green-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                    <span>{selectedCenter.address}</span>
                                </p>
                                <p className="flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                    </svg>
                                    <span>{selectedCenter.phone}</span>
                                </p>
                                <p className="flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                    <span>{selectedCenter.email}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Contact Options with Waves */}
            <section className="py-12 relative bg-green-50 overflow-hidden">
                {/* Wave SVG at the top */}
                <div className="absolute top-0 left-0 w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
                        <path fill="#ffffff" fillOpacity="1" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,112C960,117,1056,107,1152,90.7C1248,75,1344,53,1392,42.7L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
                    </svg>
                </div>

                <div className="max-w-6xl mx-auto px-4 relative z-10">
                    <h2 className="text-2xl font-bold text-center text-green-600 mb-10 relative inline-block mx-auto">
                        More Ways to Connect
                        <span className="absolute bottom-0 left-0 w-full h-1 bg-green-400 rounded"></span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg text-center shadow-md transition-all duration-300 transform hover:shadow-xl hover:scale-105">
                            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4 transition-all duration-300 transform hover:rotate-12">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold mb-2">Customer Service</h3>
                            <p className="text-gray-600 mb-3">Available 7 days a week</p>
                            <p className="text-green-600 font-bold">+216 71 987 654</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg text-center shadow-md transition-all duration-300 transform hover:shadow-xl hover:scale-105">
                            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4 transition-all duration-300 transform hover:rotate-12">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold mb-2">Business Hours</h3>
                            <p className="text-gray-600 mb-1">Monday - Friday: 8:00 - 17:00</p>
                            <p className="text-gray-600">Saturday: 9:00 - 13:00</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg text-center shadow-md transition-all duration-300 transform hover:shadow-xl hover:scale-105">
                            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4 transition-all duration-300 transform hover:rotate-12">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold mb-2">FAQ</h3>
                            <p className="text-gray-600 mb-3">Find answers to common questions</p>
                            <a href="#" className="text-green-600 font-bold hover:underline transition-colors duration-300 hover:text-green-700">
                                Visit FAQ Page
                            </a>
                        </div>
                    </div>
                </div>

                {/* Wave SVG at the bottom */}
                <div className="absolute bottom-0 left-0 w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
                        <path fill="#ffffff" fillOpacity="1" d="M0,160L48,138.7C96,117,192,75,288,69.3C384,64,480,96,576,122.7C672,149,768,171,864,165.3C960,160,1056,128,1152,106.7C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>
            </section>

            {/* Emergency Contact */}
            <section className="py-10">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg px-6 py-8 shadow-lg transform transition-all duration-300 hover:shadow-xl hover:scale-105">
                        <h3 className="text-lg font-bold text-white mb-2">24/7 Emergency Claims Hotline</h3>
                        <p className="text-green-50">For urgent assistance with claims outside business hours</p>
                        <p className="text-white font-bold text-2xl mt-3">+216 71 123 123</p>
                    </div>
                </div>
            </section>


        </div>
    );
};

export default ContactUs;