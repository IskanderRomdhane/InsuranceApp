import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import SideBar from '../../Components/SideBar';
const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedData = localStorage.getItem('access_token');
        if (storedData) {
            try {
                const decoded = jwtDecode(storedData);
                setUser(decoded.given_name)
            } catch (error) {
                console.error('Error parsing auth token:', error);
            }
        }
    }, []);

    if (!user) {
        return <h1>No user data found. Please log in.</h1>;
    }

    return (
        <div>
            <h1>HELLO MR {user || 'User'}</h1>    
        </div>
    );
};

export default Dashboard;
