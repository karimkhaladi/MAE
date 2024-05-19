import React, { useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { useEffect } from "react"
import { useNavigate} from 'react-router-dom'
import axios from "axios"
import { Link } from 'react-router-dom';
import { LuPlus } from "react-icons/lu";
import { Carousel,IconButton ,Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,} from "@material-tailwind/react";
function AllWorkshops() {

  const [user,setUser]=useState()
  const navigate = useNavigate()

  useEffect(() => {
      axios.get('/api/profil',{withCredentials: true})
      .then(res=>
          {
            setUser(res.data)})
          .catch(err=>navigate('/'))
  }, []); 
  const [workshops,setWorkshops]=useState()
  
  useEffect(() => {
    axios.get('/api/workshops',{withCredentials: true})
    .then(res=>
      {
        setWorkshops(res.data)})
      }
      , []); 


  const enroll=(workshopp)=>{

    axios.patch(`/api/enroll/${user.user._id}`,{workshopp})
  }
return (
  <>
  
  {
    workshops?
    
    <div  className=' md:flex items-center justify-center container mx-auto  ' > 
    <div className="lg:grid xl:grid-cols-3 md:grid-cols-2 grid-rows-2 md:gap-5">
  
    {
      workshops.map((workshop,index)=>(
        <Card key={index} className="mt-20 w-96 h-96 mb-5">
              <CardHeader >
                  <img src={`http://localhost:8000/public/workshopimages/${workshop.filename}`} className='className="m-auto rounded-xl object-center h-full w-full object-cover"' alt="" />
              </CardHeader>
              
              <CardBody>
                <Typography variant="h5"  className="mb-2">
                  {workshop.titre}
                </Typography>
                <Typography>
                  {workshop.description}
                </Typography>
                
              </CardBody>
              <CardFooter className="pt-0 gap-4">
                <Typography variant="h5" className='flex gap-4 items-center justify-end' >
                {user ? (
          user.user.workshops.some(item => item === workshop._id) ? (
            <Link to={`/workshop/${workshop._id}`}>
              <Button className="bg-[#469924]">Show</Button>
            </Link>
          ) : (
            <Link to={`/workshop/${workshop._id}`}>
              <Button className="bg-[#469924]" onClick={() => enroll(workshop._id)}>
                Enroll
              </Button>
            </Link>
          )
        ) : null}
                </Typography>
              </CardFooter>
            </Card>
      ))
    }
    </div>
  </div>
  :null
}
</>
)
}

export default AllWorkshops