import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Home({ isLoggedIn, login, logout }) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Redirect to dashboard if already logged in
    if (isLoggedIn) {
      router.push('/dashboard');
    }
  }, [isLoggedIn, router]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(password)) {
      router.push('/dashboard');
    } else {
      setError('Invalid password');
    }
  };

  if (isLoggedIn) {
    return null; // Will redirect immediately
  }

  return (
    <div className="login-container">
      <Head>
        <title>M&S Traffic - AI Report Tool</title>
        <meta name="description" content="Internal AI Report Tool for M&S Traffic" />
      </Head>

      <main className="login-main">
        <div className="login-card">
          <h1>M&S Traffic AI Report Tool</h1>
          <p>Sign in to access the internal report generation system</p>
          
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <button type="submit" className="login-button">Sign In</button>
          </form>
        </div>
      </main>

      <style jsx>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #2c3e50, #4a6491);
          padding: 20px;
        }
        
        .login-main {
          width: 100%;
          max-width: 400px;
        }
        
        .login-card {
          background: white;
          border-radius: 8px;
          padding: 40px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          text-align: center;
        }
        
        .login-card h1 {
          color: #2c3e50;
          margin-bottom: 10px;
        }
        
        .login-card p {
          color: #666;
          margin-bottom: 30px;
        }
        
        .login-form {
          text-align: left;
        }
        
        .form-group {
          margin-bottom: 20px;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #333;
        }
        
        .form-group input {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
        }
        
        .form-group input:focus {
          outline: none;
          border-color: #4a6491;
        }
        
        .error-message {
          color: #e74c3c;
          margin-bottom: 15px;
          text-align: center;
        }
        
        .login-button {
          width: 100%;
          padding: 12px;
          background-color: #4a6491;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        
        .login-button:hover {
          background-color: #3a5070;
        }
      `}</style>
    </div>
  );
}