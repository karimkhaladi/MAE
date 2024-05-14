import React from 'react';
import { FaUser } from "react-icons/fa";
import { GrWorkshop } from "react-icons/gr";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function Admin() {
    const navigate = useNavigate();

    // Function to handle logout
    const handleLogout = () => {
        // Remove admin cookie
        Cookies.remove('admin');
        // Redirect to the login page
        navigate('/admin/login'); // Assuming '/login' is your login route
    };  

    return (
        <div className='font-sans bg-[#F3F7F9] flex flex-col min-h-screen w-full'>
            {/* Header */}
            <div className="bg-[#168859]">
                <div className="container mx-auto px-4">
                    <div className="flex items-center md:justify-between py-4">
                        {/* Logo */}
                        <div className="w-1/2 md:w-auto text-center text-black text-2xl font-medium">
                            MAE
                        </div>
                        {/* Logout Button */}
                        <div className="w-1/4 md:w-auto md:flex text-right">
                            <div className="md:items-center ml-2 cursor-pointer" onClick={handleLogout}>
                                <span className="text-black text-xl mr-1">logout</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Navigation */}
            <div className="bg-white md:border-b">
                <div className="container mx-auto px-4">
                    <div className="flex gap-12">
                        {/* Users NavLink */}
                        <NavLink to={'/admin'}>
                            <div className="flex gap-2 h-16 hover:-translate-y-5 hover:font-bold duration-500 items-center -mb-px">
                                <FaUser />
                                <p className='text-lg focus:outline-none'>Users</p>
                            </div>
                        </NavLink>
                        {/* Workshops NavLink */}
                        <NavLink to={'/admin/workshops'}>
                            <div className="flex gap-2 h-16 hover:-translate-y-5 hover:font-bold duration-500 items-center -mb-px">
                                <GrWorkshop />
                                <p className='text-lg'>Workshops</p>
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
            {/* Outlet for nested routes */}
            <Outlet />
        </div>
    );
}

export default Admin;
