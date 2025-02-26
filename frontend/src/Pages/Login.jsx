import { useEffect, useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';

const Login = () => {
    const { keycloak, initialized } = useKeycloak();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const handleLogin = async () => {
            if (!initialized) {
                return;
            }

            try {
                if (keycloak.authenticated) {
                    // Store token in localStorage
                    localStorage.setItem('authToken', keycloak.token);

                    // Check the roles in the token
                    const roles = keycloak.tokenParsed?.realm_access?.roles || [];

                    // Redirect based on the role
                    if (roles.includes('client_admin')) {
                        window.location.href = '/admin';
                    } else if (roles.includes('client_admin')) {
                        window.location.href = '/user';
                    } else {
                        window.location.href = '/unauthorized';
                    }
                } else {
                    // Trigger login if not authenticated
                    await keycloak.login();
                }
            } catch (err) {
                setError('An error occurred during login');
                console.error(err);
            } finally {
                setLoading(false);  // Set loading to false after handling login
            }
        };

        if (initialized) {
            handleLogin();
        }
    }, [keycloak, initialized]);

    // Display loading state if Keycloak is still initializing
    if (loading) {
        return <p>Loading...</p>;
    }

    // Display error if there was an issue
    if (error) {
        return <p>{error}</p>;
    }

    return null;
};

export default Login;
