const RootNavbar = () => {
    return(
        <header className="bg-white shadow-sm py-4">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <div className="text-2xl font-bold text-green-600">Wiqaya</div>
                <nav className="hidden md:flex space-x-6 ">
                    <a href="#" className="text-gray-600 hover:text-green-600 ">Products</a>
                    <a href="#" className="text-gray-600 hover:text-green-600">Claims</a>
                    <a href="#" className="text-gray-600 hover:text-green-600">About Us</a>
                    <a href="#" className="text-gray-600 hover:text-green-600">Contact</a>
                </nav>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                    Get Quote
                </button>
            </div>
        </header>
    )
}
export default RootNavbar;