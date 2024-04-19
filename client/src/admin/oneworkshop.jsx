import React from 'react'
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react'
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom'
import { FaCirclePlus } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
function Oneworkshop() {
    const {id}=useParams();
    const [workshop,setWorkshop]=useState()
    useEffect(()=>{
        axios.get("/api/allcours/"+id)
        .then((res)=>setWorkshop(res.data))
        .catch((err)=>console.log(err))
    },[workshop])

    const handelDelete =(value)=>{
        setWorkshop("")
        axios.delete(`/api/delete/cour/${value}/${id}`)
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }
    console.log(workshop)
  return (
    <>
    {
    workshop?
        <div>
            <section className="antialiased mt-20 px-4">
                <div className="flex flex-col justify-center h-full">
                    <div className="w-80 md:w-full max-w-4xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                        <p className='text-xl p-5 font-bold'>{workshop.workshop.titre} cours</p>
                        <div className="p-3">
                            <div className="overflow-x-auto">
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
                                                <div className="font-semibold text-center">Delete</div>
                                            </th> 
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm divide-y divide-gray-100">
                                        {
                                            workshop.cours.map((cour,index)=>(
                                                <tr key={index}>
                                                    <Link to={`/admin/cour/${cour._id}`}>
                                                        <td className="p-2 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="font-medium text-gray-800">{cour.titre}</div>
                                                            </div>
                                                        </td>
                                                    </Link>
                                                        <td className="p-2 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="font-medium text-gray-800">{cour.description}</div>
                                                            </div>
                                                        </td>
                                                        <td className=' text-xl' onClick={(e)=>(handelDelete(cour._id))}>
                                                            <RiDeleteBin6Line />
                                                        </td>
                                                    
                                                </tr>
                                            )
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <Link to={"/admin/newcour/"+id}
                className="mt-6 items-center flex gap-10 w-80 mx-auto select-none rounded-lg bg-[#168859] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 hover:shadow-lg">
                  <FaCirclePlus size={25} />
                  <p className='text-lg'>Add Cour</p> 
                </Link>
            </section>
        </div>

    :null
}
    </>
  )
}

export default Oneworkshop