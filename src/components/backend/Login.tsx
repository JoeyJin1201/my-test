import React, { useState } from 'react';

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      setMessage('Login successful!');
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="block w-full px-4 py-2 border rounded-md mb-4"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="block w-full px-4 py-2 border rounded-md mb-4"
          onChange={handleChange}
        />
        <button
          onClick={handleLogin}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
        >
          Login
        </button>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
