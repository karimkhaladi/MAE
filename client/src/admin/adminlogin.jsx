import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import Alert from '../Component/Alert';

function Adminlogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const handelsubmit = (e) => {
        e.preventDefault();
        axios.post("/api/admin/login", { email, password }, { withCredentials: true })
            .then(res => {
                if (res.data.message === 'Incorrect credentials') {
                    // Show an error alert if credentials are incorrect
                    setErr('An error occurred. Please try again.');
                } else {
                    // If login is successful, show a success alert
                    setSuccessMessage('Welcome admin!');
                    // Navigate to the admin page after a short delay
                    setTimeout(() => {
                        navigate('/admin');
                    }, 1000);
                }
            })
            .catch(err => {
                // Show an error alert for network or other issues
                console.error(err);
                setErr('Wrong information');
            });
    };

    useEffect(() => {
        // Hide the error message after 3 seconds if present
        if (err) {
            const errorTimeout = setTimeout(() => {
                setErr('');
            }, 3000);
            // Cleanup function to clear the timeout
            return () => clearTimeout(errorTimeout);
        }
    }, [err]);

    useEffect(() => {
        // Hide the success message after 3 seconds if present
        if (successMessage) {
            const successTimeout = setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
            // Cleanup function to clear the timeout
            return () => clearTimeout(successTimeout);
        }
    }, [successMessage]);

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

            {err && (
                <Alert
                    message={err}
                    type="error"
                    onClose={() => setErr('')}
                />
            )}

            {successMessage && (
                <Alert
                    message={successMessage}
                    type="success"
                    onClose={() => setSuccessMessage('')}
                />
            )}
        </div>
    );
}

export default Adminlogin;
