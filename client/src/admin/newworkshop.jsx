import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
function NewWorkshop() {
  const [titre,setTitre]=useState()
  const [description,setDescription]=useState()
  const [datedeb,setDatedeb]=useState()
  const [datefin,setDatefin]=useState()
  const [photo,setPhoto]=useState()
  const navigate = useNavigate()
  const subform = (e) =>{
    e.preventDefault();
    const formData = new FormData()
    formData.append("titre",titre)
    formData.append("description",description)
    formData.append('photo', photo);
    formData.append("datedeb",datedeb)
    formData.append("datefin",datefin)

    
    axios.post("/api/workshops",formData,{ headers: {'Content-Type': 'multipart/form-data'}})
    .then(res=>{navigate('/admin/workshops')})
    .catch(err=>console.log(err))}
  return (
    <div className="p-6 bg-gray-100 flex items-center justify-center mt-10">
  <div className="container max-w-screen-lg mx-auto">
    <form onSubmit={subform}>

    <div>
      <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
          <div className="text-gray-600">
            <p className="font-medium text-lg">Workshop Details</p>
            <p>Please fill out all the fields.</p>
          </div>

          <div className="lg:col-span-2">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5 ">
              <div className="md:col-span-5">
                <label >Titre</label>
                <input type="text"  onChange={(e)=>setTitre(e.target.value)}  name="full_name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
              </div>

              <div className="md:col-span-5 mt-10">
                <label >Description</label>
                <input  onChange={(e)=>setDescription(e.target.value)}  type="text" name="email"  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"placeholder="" />
              </div>
          

              <div className="md:col-span-2 mt-10">
                <label>Date Debut</label>
                <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                  <input onChange={(e)=>setDatedeb(e.target.value)}  type='date' className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" />
                </div>
              </div>

              <div className="md:col-span-2 mt-10">
              <label>Date Fin</label>
                <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                  <input onChange={(e)=>setDatefin(e.target.value)}  type='date' className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" />
                </div>
              </div>  
              
              <div className="md:col-span-2 mt-10">
              <label >Upload Image</label>
                <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                  <input type='file' accept="image/*" onChange={(e)=>setPhoto(e.target.files[0])}  className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" />
                </div>
              </div>  
      
              <div className="md:col-span-5 text-right mt-10">
                <div className="inline-flex items-end">
                  <button className="bg-[#168859] hover:bg-[#1d4f3a] text-white font-bold py-2 px-4 rounded w-32" type='submit'>Submit</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    </form>
  </div>
</div>
  )
}

export default NewWorkshop