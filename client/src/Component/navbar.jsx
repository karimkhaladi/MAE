import React, { useState, useEffect } from 'react';
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { IoIosLogOut } from "react-icons/io";

function Navbar() {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/profil', { withCredentials: true })
            .then(res => setUser(res.data))
            .catch(err => setUser(""));
    }, []);

    const handleLogout = () => {
        axios.post('/api/logout', {}, { withCredentials: true })
            .then(res => {
                navigate('/login');
                console.log(res.data);
            })
            .catch(err => console.log(err));
    };

    return (
        <header className="py-4 px-4 container mx-auto text-xl flex flex-wrap xl:flex-nowrap items-center justify-between">
            <div className="">
                <Link to='/'>
                    <img src="https://www.mae.tn/sites/default/files/Logo_site_MAE.png" className='md:w-80 w-72' alt="MAE Logo" />
                </Link>
            </div>
            <div className='flex items-center gap-10 md:gap-20'>
                <ul className='flex items-center gap-6 md:gap-12 text-sm font-bold md:font-normal md:text-lg'>
                    <Link to="/Workshops" className="flex items-center justify-center h-14 text-gray-800 hover:text-green-500 transition duration-300 ease-in-out transform hover:-translate-y-2">
                        Workshops
                    </Link>
                    {user ? (
                        <>
                            <Link to='/profil' className="flex items-center justify-center h-14 text-gray-800 hover:text-green-500 transition duration-300 ease-in-out transform hover:-translate-y-2">
                                <FaUser />
                            </Link>
                            <IoIosLogOut onClick={handleLogout} className="flex items-center justify-center h-14 text-gray-800 hover:text-red-500 transition duration-300 ease-in-out transform hover:-translate-y-2" />
                        </>
                    ) : null}
                </ul>
                {!user && (
                    <ul className="flex justify-center">
                        <li className="px-2 gap-1 flex mt-5">
                            <Link to={'/create_account'} className="inline-flex w-20 items-center justify-center rounded-md border border-[#469924] px-4 md:px-8 py-2 font-medium text-[#168859] shadow-sm focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto text-sm">
                                Register
                            </Link>
                            <Link to={'/login'} className="inline-flex w-20 items-center justify-center rounded-md border border-transparent bg-[#168859] px-4 md:px-8 py-2 font-medium text-[#ffffff] shadow-sm focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto text-sm">
                                Login
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
        </header>
    );
}

export default Navbar;
