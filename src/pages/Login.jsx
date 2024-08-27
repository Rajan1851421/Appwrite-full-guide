import React, { useEffect, useState } from 'react';
import { account } from '../appwrite/config';
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()
    // State hooks for form fields
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [logoutBtn, setshowLogoutBtn] = useState(false)
    const [loginBtn, setshowLoginBtn] = useState(true)
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    // Handler functions for input changes
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const toggleShowPassword = () => setShowPassword(!showPassword);


    
    // Form submission handler
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login submitted', { email, password });
        login()
        // Perform login action here (e.g., API call)
    };

    const login = async () => {
        try {
            setLoading(true)
            const response = await account.createEmailPasswordSession(email, password);
            console.log(response)
            
            setLoading(false)
            setTimeout(()=>{
                navigate('/dashboard')
            },[3000])
            if (response) {
                setshowLogoutBtn(true)
                setshowLoginBtn(false)
            }
        } catch (error) {
            console.log("Login Failed", error.message);
            setMessage(error.message)
            setLoading(false)
            setTimeout(() => { setMessage("") }, [5000])

        }
    }

    const handleLogout = async () => {
        try {
            await account.deleteSession('current');
            console.log('User logged out successfully');
            setshowLogoutBtn(false)
            setshowLoginBtn(true)
            // Redirect to login page or home page after logout
            // window.location.href = '/login'; // Example redirect to login page
        } catch (error) {
            console.error('Logout failed:', error.message);
        }
    };


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <p className='text-red-600'>{message}</p>
                <form onSubmit={handleSubmit}>
                    {/* Email Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleEmailChange}
                            className="shadow lowercase appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                            <button
                                type="button"
                                onClick={toggleShowPassword}
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                            >
                                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                            </button>

                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-between">
                        {loginBtn && <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            {loading ? 'wait..' : 'login'}
                        </button>}
                        {logoutBtn && <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Logout
                        </button>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
