import { useState } from "react";
import { motion } from "framer-motion";
import insuranceProducts from "./InsuranceProducts";
import { FaHeartbeat, FaCar, FaHome, FaUserShield } from "react-icons/fa";

const iconMap = {
    "Health": <FaHeartbeat className="text-red-500 text-2xl" />,
    "Car": <FaCar className="text-blue-500 text-2xl" />,
    "Home": <FaHome className="text-green-500 text-2xl" />,
    "Life": <FaUserShield className="text-yellow-500 text-2xl" />
};

const InsuranceSelection = () => {
    // Set default selection to "Car Insurance"
    const defaultProduct = insuranceProducts.find((p) => p.name === "Car")?.id || null;
    const [selectedProduct, setSelectedProduct] = useState(defaultProduct);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6">Choose Your Insurance Plan</h1>

            {/* Insurance Options */}
            <div className="flex flex-row gap-6 justify-center">
                {insuranceProducts.map((product) => (
                    <motion.div
                        key={product.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-4 border cursor-pointer transition rounded-lg shadow flex items-center space-x-4 ${
                            selectedProduct === product.id ? "border-blue-500" : "border-gray-300"
                        }`}
                        onClick={() => setSelectedProduct(product.id)}
                    >
                        {iconMap[product.name]}
                        <div>
                            <h2 className="text-xl font-semibold">{product.name}</h2>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Selected Product Image & Buttons */}
            {selectedProduct && (
                <div className="mt-6 text-center">
                    <img
                        src={insuranceProducts.find(p => p.id === selectedProduct)?.image}
                        alt="Selected Product"
                        className="mx-auto mb-4 rounded-lg shadow-lg w-64 h-40 object-cover"
                    />
                    <p className="text-lg font-medium">
                        You selected: {insuranceProducts.find(p => p.id === selectedProduct)?.name}
                    </p>
                    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
                        Proceed with Purchase
                    </button>
                </div>
            )}
        </div>
    );
};

export default InsuranceSelection;
