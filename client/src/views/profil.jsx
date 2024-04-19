import axios from 'axios';
import React from 'react'
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
function Profil() {
    const [user,setUser]=useState({})
  
    useEffect(() => {
        axios.get('/api/profil',{withCredentials: true})
        .then(res=>
            {
              setUser(res.data)})
            .catch(err=>setUser(""))
    }, []); 
    console.log(user.workshops)
  return (
    <>
    {
        user.user?
        <div className='mt-20 py-4 gap-20 px-4 container mx-auto text-xl flex flex-wrap  xl:flex-nowrap '>
            <img className='rounded-full w-36 h-36' src="https://www.cityguide-dubai.com/fileadmin/_processed_/3/3/csm_img-worlds-of-adventures-teaser_40e4184da1.jpg" alt="" />
            <div>
                <p>Name : {user.user.name}</p>
                <p>Email : {user.user.email}</p>
                

            </div>
                <div>
                <p>Your workshops</p>
                {
                    user.workshops?
                    <table className="table-auto w-full">
                                        <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                            <tr>
                                                <th className="p-2 whitespace-nowrap">
                                                    <div className="font-semibold text-left">Titre</div>
                                                </th>
                                                <th className="p-2 whitespace-nowrap">
                                                    <div className="font-semibold text-center">Description</div>
                                                </th>
                                                <th className="p-2 whitespace-nowrap">
                                                    <div className="font-semibold text-center">Date Deb</div>
                                                </th>
                                                <th className="p-2 whitespace-nowrap">
                                                    <div className="font-semibold text-center">Date Fin</div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm divide-y divide-gray-100">
                                                {
                                                    user.workshops.map((workshop,index)=>(
                                                        <tr key={index}>
                                                            <Link  to={'/workshop/'+workshop._id}>

                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="font-medium text-gray-800">{workshop.titre}</div>
                                                                </div>
                                                            </td>
                                                            </Link>
                                                        <td className="p-2 whitespace-nowrap">
                                                            <div className="text-left">{workshop.description}</div>
                                                        </td>
                                                        <td className="p-2 whitespace-nowrap">
                                                            <div className="text-left">{workshop.datedeb}</div>
                                                        </td>
                                                        <td className="p-2 whitespace-nowrap">
                                                            <div className="text-left">{workshop.datefin}</div>
                                                        </td>
                                                        
                                                    </tr>
                                                )
                                            )
                                        }
                            </tbody>
                </table>
                :null
            }
            </div>
        </div>

        :null
    }
    </>
  )
}

export default Profil;