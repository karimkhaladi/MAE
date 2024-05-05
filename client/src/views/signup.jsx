import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
function Signup() {
  const [name,setName ]=useState()
  const [email,setEmail]=useState()
  const [phonenumber,setPhonenumber]=useState()
  const [state,setState]=useState()
  const [password,setPassword]=useState()
  const [confirmPassword,setConfirmpassword]=useState()
  const [file, setFile] = useState()
  const [errs,setErr]=useState("")
  const navigate = useNavigate()

  
  function isNameValid(name) {
    // Regular expression to check for at least 4 characters, without symbols or digits
    const nameRegex = /^[a-zA-Z]{4,}$/;
    return nameRegex.test(name);
   }
   
   function isPhoneNumberValid(phoneNumber) {
    // Regular expression to check for exactly 8 digits
    const phoneNumberRegex = /^\d{8}$/;
    return phoneNumberRegex.test(phoneNumber);
   }
   
   function isStateValid(state) {
    const stateRegex = /^[a-zA-Z]{4,}$/;
    return stateRegex.test(state);
 }
 function isPasswordStrong(password) {
  // Regular expression to check for at least 8 characters, an uppercase letter, a symbol, and a digit
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return strongPasswordRegex.test(password);
}

  
const registeruser = (e) => {
  e.preventDefault();

  // Check if the name is valid
  if (!isNameValid(name)) {
    alert("Your Name must be at least 4 characters long and without symbols or digits.");
    return; // Prevent form submission
  }

  // Check if the email is valid
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Please enter a valid email address.");
    return; // Prevent form submission
  }

  // Check if the phone number is valid
  if (!isPhoneNumberValid(phonenumber)) {
    alert("Phone number must be exactly 8 digits.");
    return; // Prevent form submission
  }

  // Check if state is valid
  if (!isStateValid(state)) {
    alert("State must be at least 4 characters long and without symbols or digits.");
    return; // Prevent form submission
  }

  // Check if password and confirmPassword match
  if (password !== confirmPassword) {
    alert("Password and Confirm Password do not match.");
    return; // Prevent form submission
  }

  // Check if the password is strong enough
  if (!isPasswordStrong(password)) {
    alert("Password must be at least 8 characters long, contain an uppercase letter, a symbol, and a digit.");
    return; // Prevent form submission
  }

  // If all validations pass, proceed with form submission
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("phonenumber", phonenumber);
  formData.append("state", state);
  formData.append("password", password);
  formData.append("confirmPassword", confirmPassword);
  formData.append("image", file);

  axios.post("/api/register", formData, { headers: {'Content-Type': 'multipart/form-data'}}, {withCredentials: true})
    .then(res => {
      console.log(res);
      navigate('/login');
      alert(`Your account has been created successfully.`);
    })
    .catch(err => {
      setErr(err.response.data.errors);
    });
}


  return (
    <div  className=" px-4 items-center  container mx-auto relative flex flex-col mt-10 mb-10 text-gray-700  xl:shadow-2xl shadow-black xl:w-5/12 py-10 rounded-xl bg-clip-border">
      <img src="https://www.entreprises-magazine.com/wp-content/uploads/2020/10/MAE-assurances-696x385.jpg" className='w-52' alt="" />
      <h4  className="block font-sans text-2xl antialiased font-semibold
          leading-snug tracking-normal text-blue-gray-900 mb-10">
          Sign Up
      </h4>
      <form onSubmit={registeruser} className="max-w-screen-lg mb-2 w-80 sm:w-96">
          <div  className="flex flex-col gap-6 mb-1">
            <h6
                className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                Your Name
            </h6>
          <div  className="relative h-11 w-full min-w-[200px]">
              <input placeholder="Your Name"
                className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200
                bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 
                outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200
              placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900
                focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 
                disabled:border-0 disabled:bg-blue-gray-50" onChange={(e)=>{(setName(e.target.value))}} /> 
            {
                errs.name?
                <p className='text-[#ff1100]'>{errs.name.message}</p>
                :
                null
            }
      </div>
      
      <h6
        className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
        Your Email
      </h6>
      <div  className="relative h-11 w-full min-w-[200px]">
        <input placeholder="name@mail.com"
        onChange={(e)=>{(setEmail(e.target.value))}}
          className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
      {
          errs.email?
          <p className='text-[#ff1100]'>{errs.email.message}</p>
          :
          null
            }
      </div>
      <h6
        className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
        phonenumber
      </h6>
      <div  className="relative h-11 w-full min-w-[200px]">
      
        <input placeholder="phonenumber"
          className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200
          bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 
          outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200
            placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900
            focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0
              disabled:border-0 disabled:bg-blue-gray-50"
              onChange={(e)=>{(setPhonenumber(e.target.value))}} />
            {
                errs.phonenumber?
                <p className='text-[#ff1100]'>{errs.phonenumber.message}</p>
                :
                null
            }
      </div>
      <h6
        className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
        state
      </h6>
      <div  className="relative h-11 w-full min-w-[200px]">
      
        <input placeholder="state"
          className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200
          bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 
          outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200
            placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900
            focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0
              disabled:border-0 disabled:bg-blue-gray-50"
              onChange={(e)=>{(setState(e.target.value))}} />
            {
                errs.state?
                <p className='text-[#ff1100]'>{errs.state.message}</p>
                :
                null
            }
      </div>
      <h6
        className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
        Password
      </h6>
      <div  className="relative h-11 w-full min-w-[200px]">
        <input type="password" placeholder="********"
        onChange={(e)=>{(setPassword(e.target.value))}}
          className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
          {
                errs.password?
                <p className='text-[#ff1100]'>{errs.password.message}</p>
                :
                null
            }
      </div>
      <h6
        className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
        Confirm password
      </h6>
      <div  className="relative h-11 w-full min-w-[200px]">
        <input type="password" placeholder="********"
        onChange={(e)=>{(setConfirmpassword(e.target.value))}}
          className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
        {
                errs.confirmPassword?
                <p className='text-[#ff1100] '>{errs.confirmPassword.message}</p>
                :
                null
            }
      </div>
      <h6
        className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
        Upload file
      </h6>

      <input className="block w-full text-md text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" required onChange={e => setFile(e.target.files[0])}/>

    </div>
    <button
      className="mt-6 block w-full select-none rounded-lg bg-[#168859] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      type="submti">
      sign up
    </button>
  </form>
</div>  
  )
}

export default Signup