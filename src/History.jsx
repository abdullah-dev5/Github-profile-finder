import React,{useState} from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import axios from 'axios'
const History = () => {
    const [profileCard ,setProfileCard] = useState([])
  return (
    <React.Fragment>
        <div className='m-2 h-full w-11/12 my-24 bg-gray-200 overflow-y-auto '>
            I'm A History Div
        <div>
            Cards 
            {

           }
        </div>
        </div>

        <Footer/>
    </React.Fragment>
  )
}

export default History