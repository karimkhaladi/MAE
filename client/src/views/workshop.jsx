import React from 'react'
import axios from 'axios'
import { useParams,Link } from 'react-router-dom';
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Users from '../admin/users';
function Workshop() {
  const {id}=useParams();
  const [cours,setcours]=useState([])
  const [pdf,setPdf]=useState("")
  const navigate = useNavigate()

    useEffect(()=>{
      axios.get("/api/allcours/"+id)
        .then((res)=>{
          setcours(res.data.cours)
          setPdf(res.data.cours[0].filename)
        }
      )
        .catch()
    },[])
    console.log(pdf)
    


const handellogout=(e)=>{
  e.preventDefault
  axios.post('/api/logout',{},{withCredentials: true})
  navigate('/')
  
}

const changepdf =(value)=>{
  setPdf(value)
}

  return (
    <>
    <Link to={`/quiz/${id}`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 ">
          Take Quiz
        </button>
    </Link>
      {
      cours.length!=0?
    <div className=' gap-12 container mx-auto mt-20 flex ' >
      {cours?
      <div className='bg-[#393c3f44] text-center w-52'>
      {
        cours.map((cour,index)=>(
<p className="p-3 text-green-500 cursor-pointer bg-green-100 hover:bg-green-300 hover:text-white hover:shadow-lg transition duration-300 ease-in-out transform  font-serif" onClick={(e) => changepdf(cour.filename)}>
    {cour.titre}
</p>


        ))
      }
      </div>
      :null
      
    }
    
        {
        cours?
<div className="mt-[-5] bg-white rounded-lg shadow-lg p-4 border border-green-500 hover:bg-green-100 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl hover:border-green-700">
                <embed src={`http://localhost:8000/pdf/`+pdf} width="1200px" height="900px" />
          </div>
        :null
      }
      
      </div>
      :null}
      </>
    )
}

export default Workshop