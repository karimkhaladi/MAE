import React from 'react'
import { useEffect,useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import { FaCirclePlus } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
function Workshops() {
  const [workshops,setWorkshops]=useState()

  useEffect(() => {
      axios.get('/api/workshops',{withCredentials:true})
      .then(res=>
          {
          setWorkshops(res.data)})
  }
  , [workshops]); 
  const handelDelete =(value)=>{
    const filtredworkshop=workshops.filter(index=> index!=value)
    setWorkshops(filtredworkshop)
    axios.delete('/api/delete/workshop/'+value)
      .then(res=>console.log(res))
      .catch(err=>console.log(err))
      
  }
  return (
    <div>
        {workshops?
            
                <section className="antialiased  mt-20 px-4">
                <div className="flex flex-col justify-center h-full">
                    <div className="w-80 md:w-full max-w-4xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
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
                                                <div className="font-semibold text-center">Date Deb</div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-center">Date Fin</div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-center">Delete</div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm divide-y divide-gray-100">
                                        {
                                            workshops.map((workshop,index)=>(
                                                <tr key={index}>
                                                    <Link to={`/admin/${workshop._id}`}>
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
                                                    <td className='pl-10 text-xl' onClick={(e)=>(handelDelete(workshop._id))}>
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
                <Link to={"/admin/newworkshop"}
                className="mt-6 items-center flex gap-10 w-80 mx-auto select-none rounded-lg bg-[#168859] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 hover:shadow-lg">
                  <FaCirclePlus size={25} />
                  <p>Add workshop</p> 
                </Link>
            </section>
            :null
        }
        
    </div>
  )
}

export default Workshops