import React from 'react'
import Footer from '../components/Footer/Footer'
import NavBar from '../components/Navbar/NavBar'
import SignUp from '../components/AuthComponent/SignUp'

const SignUpPage = () => {
  return (
    <div className='container'>

      <NavBar />
      <div className='mainAuth'>
        <SignUp />
      </div>
      <Footer />
    </div>
  )
}

export default SignUpPage