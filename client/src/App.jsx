
import   {Routes,Route} from 'react-router-dom'
import axios from "axios"
import { BrowserRouter } from 'react-router-dom'
import Login from "./views/login"
import Signup from "./views/signup"
import Admin from "./admin/admin"
import Main from "./views/main"
import Layout from "./layout"
import Users from './admin/users'
import Workshops from './admin/workshops'
import NewWorkshop from './admin/newworkshop'
import Adminlogin from './admin/adminlogin'
import Oneworkshop from './admin/oneworkshop'
import Addcours from './admin/addcours'
import Cour from './admin/Cour'
import AllWorkshops from './views/AllWorkshops'
import Workshop from './views/workshop'
import { useState } from 'react'
import Profil from './views/profil'
import QuizApp from './Component/Quiz'
axios.defaults.baseURL='http://localhost:8000'
function App() {
  const [user,setUser]=useState("")
const change =(newuserlogdin)=>{
  setUser(newuserlogdin)
}
console.log(user)
  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path="/login"  element={<Login change={change} />} />
          <Route path="/create_account" element={<Signup/>} />
          <Route path="/" element={<Layout />} >
            <Route path="/" element={<Main />}/>
            <Route path="/profil" element={<Profil />}/>
            <Route path="/quiz" element={<QuizApp />}/>
            <Route path='/Workshops' element={<AllWorkshops />} />  
            <Route path='/workshop/:id' element ={<Workshop />} />
            
          </Route>
          <Route path='/admin/login' element={<Adminlogin/>} />
          <Route path="/admin" element={<Admin />} >
            <Route index element={<Users />}/>
            <Route path='workshops' element={<Workshops />}/>
            <Route path='newworkshop' element={<NewWorkshop/>}/>
            <Route path=':id' element={<Oneworkshop/>}  />
            <Route path='newcour/:id' element={<Addcours/>} />
            <Route path='cour/:cour' element={<Cour />} />
          </Route>
      </Routes>  
    </BrowserRouter>
    </>
  )
}

export default App
