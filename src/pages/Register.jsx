import React, { useState } from 'react';
import { toast } from "react-toastify";
import { account } from '../appwrite/config'; // Make sure this import path is correct
import { useNavigate } from 'react-router-dom';

const Register = () => {
  // State hooks for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Handler functions for input changes
  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted', { name, email, password });
    register();
  };

  const register = async () => {
    try {
      setLoading(true)
      // Correcting the unique ID usage
      const response = await account.create('unique()', email, password, name);
      // console.log(response);
      if (response) {
        setLoading(false)
        toast.success("Register Successfully ")
        setName('')
        setEmail("")
        setPassword("")
        setTimeout(() => {
          navigate("/login")
        }, [2000])
      }
    } catch (error) {
      console.error("Account creation failed:", error.message);
      toast.error("Registration Failed")
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              required
              placeholder="Enter your name"
              value={name}
              onChange={handleNameChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {loading ? 'Please wait..' : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
