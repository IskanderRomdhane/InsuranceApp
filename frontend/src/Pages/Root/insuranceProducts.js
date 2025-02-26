import Auto from "/src/assets/Root/Auto.avif";
import Health from "/src/assets/Root/Health.jpg";
import home from "/src/assets/Root/Home.png";
import rewards from "/src/assets/Root/Rewards.webp";
import bundle from "/src/assets/Root/Bundle.webp";
import claims from "/src/assets/Root/Claims.webp";
import customersupport from "/src/assets/Root/CustomerSupport.webp";
import digital from "/src/assets/Root/Digital.svg";
export const products = {
    home: {
        name: 'Home Insurance',
        description: 'Protect your home and belongings with our comprehensive coverage.',
        image: home
    },
    auto: {
        name: 'Auto Insurance',
        description: 'Stay covered on the road with our reliable auto insurance plans.',
        image: Auto
    },
    health: {
        name: 'Health Insurance',
        description: 'Take care of what matters most with our health insurance options.',
        image: Health
    },

};

export const offers = {
    bundle : {
        title: 'Bundle & Save 20%',
        description: 'Combine home and auto insurance to get our best rates.',
        cta: 'Learn More',
        image : bundle
    },
    newCustomer : {
        title: 'New Customer Discount',
        description: 'First-time customers get 15% off their first-year premium.',
        cta: 'Get Quote',
        image : ""
    },
    loyalty : {
        title: 'Loyalty Rewards',
        description: 'Stay with us for 3+ years and receive exclusive benefits.',
        cta: 'See Benefits',
        image : rewards
    }
}

export const reasons = [
    {
        title: 'Fast Claims Processing',
        description: 'Our claims are processed within 48 hours, giving you peace of mind when you need it most.',
        image: claims
    },
    {
        title: '24/7 Customer Support',
        description: 'Our team is always available to assist you with any questions or concerns.',
        image: customersupport
    },
    {
        title: 'Digital-First Experience',
        description: 'Manage your policy, file claims, and track your benefits all through our easy-to-use app.',
        image: digital
    }
];
