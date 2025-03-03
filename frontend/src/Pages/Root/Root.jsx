import { useState, useEffect } from 'react';
import {reasons, offers, products} from './insuranceProducts.js';
import RootNavbar from "../../Components/RootNavbar.jsx";
import offersImage from "../../assets/Root/Bundle_women_moving_scene_Optimized_XL_L.webp"
import aboutUsImage from "../../assets/Root/AboutUs.webp"
import { Link } from 'react-router-dom';
const InsuranceApp = () => {
    const [selectedProduct, setSelectedProduct] = useState('home');
    const [selectedOffer, setSelectedOffer] = useState('bundle');
    const [currentReasonIndex, setCurrentReasonIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Timer to automatically switch reason cards (5 seconds)
    useEffect(() => {
        let timer;
        if (!isPaused) {
            timer = setInterval(() => {
                setCurrentReasonIndex((prevIndex) => (prevIndex + 1) % reasons.length);
            }, 5000);
        }

        return () => clearInterval(timer);
    }, [isPaused]);

    // Navigate to the next reason
    const goToNextReason = () => {
        setCurrentReasonIndex((prevIndex) => (prevIndex + 1) % reasons.length);
    };

    // Navigate to the previous reason
    const goToPrevReason = () => {
        setCurrentReasonIndex((prevIndex) => (prevIndex - 1 + reasons.length) % reasons.length);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Header */}
            <RootNavbar />

            {/* Main Content */}
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="bg-green-700 text-white py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Protect What Matters Most</h1>
                        <p className="text-xl mb-8 max-w-3xl mx-auto">
                            Comprehensive insurance solutions tailored to your needs with industry-leading coverage and support.
                        </p>
                        <Link to = "/login">
                        <button className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                            Get Started Today
                        </button>
                        </Link>
                    </div>
                </section>

                {/* Products Section */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-4">Our Insurance Products</h2>
                        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
                            Discover our range of customizable insurance solutions designed to provide you with peace of mind and financial security for every aspect of your life.
                        </p>

                        {/* Product Display */}
                        <div className="rounded-lg p-6 max-w-4xl mx-auto mb-8">
                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                <div className="md:w-1/2">
                                    <img
                                        src={products[selectedProduct].image}
                                        alt={products[selectedProduct].name}
                                        width={512}
                                        height={512}
                                        className="rounded-lg shadow-md w-full"
                                    />
                                </div>
                                <div className="md:w-1/2">
                                    <h3 className="text-2xl font-bold mb-4">{products[selectedProduct].name}</h3>
                                    <p className="text-gray-600 mb-6">{products[selectedProduct].description}</p>
                                    <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition">
                                        Get a Quote
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Product Navigation*/}
                        <div className="flex flex-wrap justify-center gap-4">
                            {Object.keys(products).map((product) => (
                                <button
                                    key={product}
                                    onClick={() => setSelectedProduct(product)}
                                    className={`px-6 py-3 rounded-lg font-medium transition ${
                                        selectedProduct === product
                                            ? 'bg-green-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    {products[product].name}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why Choose Us Section */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-4">Why Choose Us</h2>
                        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
                            Discover the InsureGuard difference and see why thousands of customers trust us with their most valuable assets.
                        </p>

                        <div
                            className="max-w-4xl mx-auto"
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                        >
                            {/* Progress bar */}
                            <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
                                <div
                                    className="h-2 bg-green-600 rounded-full transition-all duration-300 ease-out"
                                    style={{ width: `${((currentReasonIndex + 1) / reasons.length) * 100}%` }}
                                />
                            </div>

                            {/* Card container with animation */}
                            <div className="relative h-96 overflow-hidden rounded-lg shadow-lg">
                                {reasons.map((reason, index) => (
                                    <div
                                        key={index}
                                        className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out flex flex-col ${
                                            index === currentReasonIndex
                                                ? 'opacity-100 translate-x-0'
                                                : index < currentReasonIndex
                                                    ? 'opacity-0 -translate-x-full'
                                                    : 'opacity-0 translate-x-full'
                                        }`}
                                    >
                                        <div className="h-full bg-white rounded-lg flex flex-col md:flex-row overflow-hidden">
                                            {/* Image section */}
                                            <div className="flex items-center md:w-1/2 h-48 md:h-auto relative">
                                                <img
                                                    src={reason.image || '/api/placeholder/400/300'}
                                                    alt={reason.title}
                                                    className="w-auto h-auto object-cover items-center rounded-lg"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4 md:hidden">
                                                    <h3 className="text-xl text-white font-bold">{reason.title}</h3>
                                                </div>
                                            </div>

                                            {/* Content section */}
                                            <div className="md:w-1/2 p-6 flex flex-col justify-center">
                                                <div className="text-green-600 bg-green-100 p-3 rounded-full w-12 h-12 mb-4 flex items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <h3 className="text-2xl font-semibold mb-3 hidden md:block">{reason.title}</h3>
                                                <p className="text-gray-600">{reason.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Navigation buttons */}
                            <div className="flex justify-between mt-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-green-600 font-semibold">{currentReasonIndex + 1}/{reasons.length}</span>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={goToPrevReason}
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-2 rounded-full"
                                        aria-label="Previous reason"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={goToNextReason}
                                        className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full"
                                        aria-label="Next reason"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Indicator dots */}
                            <div className="flex justify-center mt-4 gap-2">
                                {reasons.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentReasonIndex(index)}
                                        className={`w-3 h-3 rounded-full ${
                                            index === currentReasonIndex ? 'bg-green-600' : 'bg-gray-300'
                                        }`}
                                        aria-label={`Go to reason ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Offers Section */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-4">Special Offers</h2>
                        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
                            Take advantage of our limited-time promotions and exclusive deals designed to maximize your coverage while minimizing costs.
                        </p>
                        <div className="flex flex-col md:flex-row max-w-7xl mx-auto gap-16 items-center">
                            {/* Offer Cards on the Left */}
                            <div className="md:w-2/5 flex flex-col gap-6">
                                {Object.keys(offers).map((offer) => (
                                    <div
                                        key={offer}
                                        onClick={() => setSelectedOffer(offer)}
                                        className={`p-6 rounded-lg cursor-pointer transition shadow-lg border text-left ${
                                            selectedOffer === offer
                                                ? 'bg-white text-gray-700 border-green-700'
                                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                                        }`}
                                    >
                                        <h3 className="text-lg font-semibold">{offers[offer].title}</h3>
                                        <p className="text-sm text-gray-600 mt-2">{offers[offer].description}</p>
                                    </div>
                                ))}
                            </div>
                            {/* Larger Image on the Right */}
                            <div className="md:w-3/5 flex justify-end">
                                <img
                                    src={offersImage}
                                    alt="Special Offers"
                                    className="rounded-lg object-cover w-full max-w-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* About Us Section - Now at the end */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-4">About Us</h2>
                        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
                            Learn about our mission, values, and the dedicated team of insurance professionals committed to protecting your future.
                        </p>

                        <div className="flex flex-col md:flex-row gap-12 items-center max-w-6xl mx-auto">
                            <div className="md:w-1/2">
                                <img
                                    src={aboutUsImage}
                                    alt="Our Insurance Team"
                                    className="w-full"
                                />
                            </div>
                            <div className="md:w-1/2">
                                <h3 className="text-2xl font-bold mb-4">Our Story</h3>
                                <p className="text-gray-600 mb-4">
                                    Founded in 1985, InsureGuard began with a simple mission: to provide honest, reliable insurance solutions that truly protect what matters most to our clients.
                                </p>
                                <p className="text-gray-600 mb-4">
                                    Over four decades, we&#39;ve grown from a small local agency to a nationwide provider, but our commitment to personalized service has never wavered.
                                </p>
                                <p className="text-gray-600 mb-4">
                                    With a team of over 500 dedicated insurance professionals and a 98% customer satisfaction rating, we continue to innovate and adapt to meet the changing needs of our clients.
                                </p>
                                <Link to="/aboutus">
                                <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition mt-4">
                                    Learn More About Us
                                </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">WiqayaGuard</h3>
                            <p className="text-gray-400">
                                Providing reliable insurance solutions since 1985. Your trust is our priority.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Products</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white">Home Insurance</a></li>
                                <li><a href="#" className="hover:text-white">Auto Insurance</a></li>
                                <li><a href="#" className="hover:text-white">Health Insurance</a></li>
                                <li><a href="#" className="hover:text-white">Car Insurance</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-gray-400">
                                <Link to={'/aboutus'} >
                                <li><a href="#" className="hover:text-white">About Us</a></li>
                                </Link>
                                <Link to={'/contactus'} >
                                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                                </Link>
                                <li><a href="#" className="hover:text-white">Blog</a></li>
                                <li><a href="#" className="hover:text-white">Press</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Contact</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>1234 Wiqaya Ave</li>
                                <li>Tunis, Sousse 10001</li>
                                <li>contact@Wiqaya.com</li>
                                <li>+216 123-4567</li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-gray-700 text-center text-gray-400">
                        <p>&copy; 2025 Wiqaya. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default InsuranceApp;