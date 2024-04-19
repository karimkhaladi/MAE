import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Adminlogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handelsubmit = (e) => {
        e.preventDefault();
        axios.post("/api/admin/login", { email, password }, { withCredentials: true })
            .then(res => {
                // Assuming the server sends a specific message or status code for incorrect credentials
                if (res.data.message === 'Incorrect credentials') {
                    alert('An error occurred. Please try again.');
                } else {
                    navigate('/admin');
                    alert('welecome admin');

                }
            })
            .catch(err => {
                // Handle any other errors
                console.log(err);
                alert('Wrong information');
            });
    };

    return (
        <div className='w-96 mx-auto mt-32'>
            <form className="mt-6" onSubmit={handelsubmit}>
                <div>
                    <label className="block text-gray-700">Admin</label>
                    <input onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder="Enter Email Address" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"/>
                </div>

                <div className="mt-10">
                    <label className="block text-gray-700">Password</label>
                    <input type="password" placeholder="Enter Password" onChange={(e) => { setPassword(e.target.value) }} className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-4 border focus:border-blue-500 focus:bg-white focus:outline-none"/>
                </div>
                <button type="submit" className="w-full block bg-[#168859] hover:bg-[#05f792 text-white font-semibold rounded-lg px-4 py-3 mt-6">Log In</button>
            </form>
        </div>
    );
}

export default Adminlogin;
