import React from 'react'
import Footer from "./Component/footer"
import Navbar from "./Component/navbar"
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
        <Navbar />
            <Outlet/>
        <Footer />
    </div>
  )
}

export default Layout