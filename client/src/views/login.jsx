import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from '../Component/Alert';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const loginuser = () => {
    axios.post("/api/login", { email, password }, { withCredentials: true })
      .then(response => {
        if (response.status === 200) {
          // If login is successful, show a success alert
          setSuccessMessage(`Welcome ${email}!`);
          // Navigate to the profile page after a short delay
          setTimeout(() => {
            navigate('/profil');
          }, 1000);
        } else {
          // Show an error alert if credentials are incorrect
          setErr('Try again later.');
        }
      })
      .catch(err => {
        // Show an error alert for network or other issues
        console.error(err);
        setErr('Check your credentials.');
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
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img src="https://www.mae.tn/sites/default/files/styles/max_1300x1300/public/youtube/LMqqO_7031g.jpg?itok=n9VIGNRz" alt="background" className="w-full h-full object-cover" />
      </div>

      <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">

        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">Log in to your account</h1>

          <form onSubmit={(e) => { e.preventDefault(); loginuser(); }} className="mt-6">
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email Address"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full block bg-[#168859] hover:bg-[#05f792] text-white font-semibold rounded-lg px-4 py-3 mt-6"
            >
              Log In
            </button>
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

          <p className="mt-8">
            Need an account? <Link to={'/create_account'} className="text-blue-500 hover:text-blue-700 font-semibold">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
