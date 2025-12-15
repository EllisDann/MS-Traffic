import '../styles/globals.css';
import { useState, useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  const login = (password) => {
    // In a real app, this would be a proper authentication
    // For simplicity, we're checking against an environment variable
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      localStorage.setItem('authToken', 'admin');
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

  // While loading, don't render anything
  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Component 
      {...pageProps} 
      isLoggedIn={isLoggedIn} 
      login={login} 
      logout={logout} 
    />
  );
}

export default MyApp;