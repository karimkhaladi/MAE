import React from 'react'
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react'
import axios from 'axios';

function Cour() {
    const {cour}=useParams();
    const [cours,setCours]=useState()
    console.log(cour)
    useEffect(()=>{
        axios.get("/api/cour/"+cour)
        .then((res)=>setCours(res.data))
        .catch((err)=>console.log(err))
    },[])
    
  return (
    <div>
      {cours?
        <div>
            <embed src={`http://localhost:8000/pdf/${cours.filename}`} width="100%" height="900px" />
        </div>
        :null
    }
    </div>
  )
}

export default Cour