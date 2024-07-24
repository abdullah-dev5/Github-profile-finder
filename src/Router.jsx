import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './Home'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import About from './About.jsx'
import NotFound from './NotFound.jsx'
import ProfileView from './ProfileView.jsx'
import Map from './Map.jsx'
const Router = () => {
  return (
    <>
    <Navbar/>
   <Routes>
    <Route  path='/' element = { <Home/>} />
    <Route  path='/map' element = { <Map/>} />
    

        <Route  path='/about' element = { <About/>} />
    <Route  path='/*' element = { <NotFound/>} />

   { <Route path='/profileview' element ={<ProfileView/>} /> }
   </Routes>
   <Footer/>
   </>
    )
}

export default Router