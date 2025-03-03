import { Link } from 'react-router-dom';
const RootNavbar = () => {
    return(
        <header className="bg-white shadow-sm py-4">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <div className="text-2xl font-bold text-green-600">Wiqaya</div>
                <nav className="hidden md:flex space-x-6 ">
                    <a href="#" className="text-gray-600 hover:text-green-600 ">Products</a>
                    <a href="#" className="text-gray-600 hover:text-green-600">Claims</a>
                    <Link to="/aboutus">
                    <a href="#" className="text-gray-600 hover:text-green-600">About Us</a>
                    </Link>
                    <Link to="/contactus">
                    <a href="#" className="text-gray-600 hover:text-green-600">Contact</a>
                    </Link>
                </nav>
                <Link to="/login">
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                    Login
                </button>
                </Link>
            </div>
        </header>
    )
}
export default RootNavbar;