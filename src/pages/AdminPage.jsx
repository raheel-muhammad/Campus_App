import React from 'react'
import AdminDashBoard from '../components/AdminDashBoard/AdminDashBoard'
import NavBar from '../components/Navbar/NavBar'
import Footer from '../components/Footer/Footer'

const AdminPage = () => {
  return (
    <div>
      <NavBar />
      <AdminDashBoard />
      <Footer />

    </div>
  )
}

export default AdminPage