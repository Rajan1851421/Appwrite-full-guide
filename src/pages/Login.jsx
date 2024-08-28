import React, { useEffect, useState } from 'react';
import { account } from '../appwrite/config';
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { login as authLogin } from '../feature/authSlice';
import { toast } from "react-toastify";

const Login = () => {
    const { isLogedIn, status } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [loginBtnText, setLoginBtnText] = useState("Login")

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
            dispatch(authLogin())
            setLoading(false)
            setLoginBtnText("Logged In")
            toast.success("Login successfully")
            setTimeout(() => {
                navigate('/dashboard')
            }, [2000])

        } catch (error) {
            console.log("Login Failed", error.message);
            setMessage(error.message)
            setLoading(false)
            setTimeout(() => { setMessage("") }, [5000])

        }
    }




    return (
        <div className="min-h-screen bg-gray-300 flex items-center justify-center">
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
                        <p className="text-xs text-red-500 mt-1 capitalize">
                            Password should be at least 8 characters <br /> (number and charcter mixed).
                        </p>
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            {loading ? 'Please wait..' : `${loginBtnText} `}
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
