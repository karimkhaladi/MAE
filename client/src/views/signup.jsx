import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
 const [email, setEmail] = useState('');
 const [name, setName] = useState('');
 const [password, setPassword] = useState('');
 const [phonenumber, setPhonenumber] = useState('');
 const [state, setState] = useState('');
 const [file, setFile] = useState(null);
 const [confirmPassword, setConfirmPassword] = useState('');
 const [errs, setErr] = useState({});
 const navigate = useNavigate();

 function isPasswordStrong(password) {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
 }

 function isNameValid(name) {
    const nameRegex = /^[a-zA-Z]{4,}$/;
    return nameRegex.test(name);
 }

 function isPhoneNumberValid(phoneNumber) {
    const phoneNumberRegex = /^\d{8}$/;
    return phoneNumberRegex.test(phoneNumber);
 }

 function isStateValid(state) {
    const stateRegex = /^[a-zA-Z]{4,}$/;
    return stateRegex.test(state);
 }

 const registerUser = (e) => {
    e.preventDefault();

    if (!isPasswordStrong(password)) {
      setErr({ ...errs, password: "Password must be at least 8 characters long, contain an uppercase letter, a symbol, and a digit." });
      return;
    }

    if (!isNameValid(name)) {
      setErr({ ...errs, name: "Your Name must be at least 4 characters long and without symbols or digits." });
      return;
    }

    if (!isPhoneNumberValid(phonenumber)) {
      setErr({ ...errs, phonenumber: "Phone number must be exactly 8 digits." });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErr({ ...errs, email: "Please enter a valid email address." });
      return;
    }

    if (!isStateValid(state)) {
      setErr({ ...errs, state: "State must be at least 4 characters long and without symbols or digits." });
      return;
    }

    if (password !== confirmPassword) {
      setErr({ ...errs, confirmPassword: "Password and Confirm Password do not match." });
      return;
    }

    if (!file) {
      setErr({ ...errs, file: "Please upload an image." });
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("name", name);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("phonenumber", phonenumber);
    formData.append("state", state);
    formData.append("image", file);

    axios.post("/api/register", formData, { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true })
      .then(res => {
        console.log(res);
        navigate('/login');
        alert("Your account has been created successfully.");
      })
      .catch(err => {
        setErr(err.response.data.errors);
      });
 };

 return (
    <div className="px-4 items-center container mx-auto relative flex flex-col mt-10 mb-10 text-gray-700 xl:shadow-2xl shadow-black xl:w-5/12 py-10 rounded-xl bg-clip-border">
      <img src="https://www.entreprises-magazine.com/wp-content/uploads/2020/10/MAE-assurances-696x385.jpg" className='w-52' alt="" />
      <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 mb-10">
        Sign Up
      </h4>
      <form onSubmit={registerUser} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Your Name
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
          {errs.name && <p className="text-red-500 text-xs italic">{errs.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Your Email
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="name@mail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          {errs.email && <p className="text-red-500 text-xs italic">{errs.email}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phonenumber">
            Phone Number
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phonenumber" type="text" placeholder="Phone Number" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} />
          {errs.phonenumber && <p className="text-red-500 text-xs italic">{errs.phonenumber}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
            State
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="state" type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
          {errs.state && <p className="text-red-500 text-xs italic">{errs.state}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errs.password && <p className="text-red-500 text-xs italic">{errs.password}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="confirmPassword" type="password" placeholder="********" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          {errs.confirmPassword && <p className="text-red-500 text-xs italic">{errs.confirmPassword}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
            Upload File
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="file" type="file" onChange={(e) => setFile(e.target.files[0])} />
          {errs.file && <p className="text-red-500 text-xs italic">{errs.file}</p>}
        </div>
        <div className="flex items-center justify-between">
        <button
        className="mt-6 block w-full select-none rounded-lg bg-[#168859] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="submti">            Sign Up
          </button>
        </div>
      </form>
    </div>
 );
}

export default Signup;
