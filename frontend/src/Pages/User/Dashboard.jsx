import { useEffect, useState } from 'react';

const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedData = localStorage.getItem('authToken');

        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData); // Convert string back to object
                setUser(parsedData);
                console.log(user);
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
            <h1>HELLO MR {user.name || 'User'}</h1>
        </div>
    );
};

export default Dashboard;
