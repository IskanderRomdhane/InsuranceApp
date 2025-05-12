import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8081',
});

console.log('Axios instance created'); 

const isTokenExpired = (token) => {
  if (!token) {
    console.log('No token provided - considered expired');
    return true;
  }

  try {
    const decoded = jwtDecode(token);
    const now = Date.now().valueOf() / 1000;
    const isExpired = decoded.exp < now;
    console.log(`Token expiration check: ${isExpired ? 'EXPIRED' : 'VALID'}`);
    return isExpired;
  } catch (error) {
    console.error('Token decode error:', error);
    return true;
  }
};

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    console.log('Interceptor triggered for request to:', config.url);

    let accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    if (!accessToken || isTokenExpired(accessToken)) {
      console.log('Token needs refresh - attempting...');
      
      if (!refreshToken) {
        console.log('No refresh token available - redirecting to login');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(new Error('No refresh token available'));
      }

      try {
        console.log('Making refresh request...');
        const response = await axios.post(
          'http://localhost:8081/api/auth/refresh',
          { refreshToken },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            baseURL: 'http://localhost:8081',
          }
        );

        console.log('Refresh response:', response.data);

        const newAccessToken = response.data.access_token;
        const newRefreshToken = response.data.refresh_token;

        console.log('New access token:', newAccessToken);
        console.log('New refresh token:', newRefreshToken ? 'exists' : 'missing');

        localStorage.setItem('access_token', newAccessToken);
        localStorage.setItem('refresh_token', newRefreshToken);
        accessToken = newAccessToken;
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Add authorization header if token exists
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      console.log('Authorization header set for request');
    } else {
      console.log('No access token available for request');
    }

    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for additional logging
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.config.url, response.status);
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    return Promise.reject(error);
  }
);

console.log('Interceptors setup complete');
export default axiosInstance;