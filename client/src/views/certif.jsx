import React, { useState } from 'react';
import axios from 'axios'
import { useParams,Link } from 'react-router-dom';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import certif from '../photos/certif.png'
const Certif = () => {

  const {id}=useParams();
  const [workshop,setWorkshop]=useState();
  useEffect(()=>{
    axios.get("/api/oneworkshop/"+id)
      .then((res)=>{
        setWorkshop(res.data)
        
      }
    )  
    .catch()
  },[])

  const [user,setUser]=useState({})
  
    useEffect(() => {
        axios.get('/api/profil',{withCredentials: true})
        .then(res=>
            {
              setUser(res.data.user)})
            .catch(err=>setUser(""))
    }, []); 
  console.log(workshop)
  return(
    <>
    {
        user && workshop ?
        <>
            <div className=' container flex mx-auto text-center static '>
                <img src={certif} className='w-full h-screen relative  '  alt="" />
                <p className='fixed inset-y-80 left-10 right-10 text-6xl'  >{user.name}</p>
                <p className='fixed bottom-64 left-10 right-10 text-3xl'>Of {workshop.titre}</p>
            </div>
        </>
        :null
    }
    </>
  );
}
  export default Certif