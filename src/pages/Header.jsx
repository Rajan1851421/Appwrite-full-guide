import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { account } from '../appwrite/config'
import { AiOutlineLogout } from "react-icons/ai";

function Navbar() {
    const navigate = useNavigate()
    const [islogedIn, setIsLogedIn] = useState(false)

    useEffect(() => {
        isLogedIn()
    }, [])

    const isLogedIn = async () => {
        try {
            const islogin = await account.get('current')
            console.log("Login", islogin);
            if (islogin) {
                setIsLogedIn(true)
            }

        } catch (error) {
            console.log("User Not Login", error.message)
        }
    }

    const handleLogout = async () => {
        try {
            await account.deleteSession('current');
            console.log('User logged out successfully');
            navigate("/login")
            setshowLogoutBtn(false)
            setshowLoginBtn(true)
            // Redirect to login page or home page after logout
            // window.location.href = '/login'; // Example redirect to login page
        } catch (error) {
            console.error('Logout failed:', error.message);
        }
    };
    return (
        <>

            <nav class="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
                <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://avatars.githubusercontent.com/u/105105537?v=4" class="h-10 rounded-full" alt="Flowbite Logo" />

                    </Link>
                    <button data-collapse-toggle="navbar-dropdown" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
                        <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <Link to="/" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Home</Link>
                            </li>



                            <li>
                                <Link to="/register" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Signup</Link>
                            </li>
                            <li>
                                {islogedIn && <Link to="/dashboard" class="block py-2  px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Dashboard</Link>}
                            </li>
                            <li>
                                {islogedIn ? <button onClick={handleLogout} class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                    <AiOutlineLogout onClick={handleLogout} className='mt-1' />
                                </button> :
                                    <Link to="/login" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</Link>}
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>


        </>
    )
}

export default Navbar
