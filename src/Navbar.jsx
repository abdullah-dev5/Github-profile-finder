import React from 'react'
import {NavLink, Link } from 'react-router-dom'
import { FaGithub } from "react-icons/fa6";


const Navbar = () => {
  return (
    <React.Fragment>
        <nav className=' fixed top-0 w-full h-16   p-1 px-2 bg-slate-600 flex flex-row  justify-between font-semibold cursor-pointer '>
           <div  className='m-2  p-1 flex gap-5 text-white justify-center scale-95 hover:scale-100 hover:text-mono ' >  <FaGithub size="2em" />
            <h1 className=' font-thin text-xl '>GitHub Profile Finder</h1>
           </div>
           <ul className=' m-2 p-1 flex gap-2 justify-center text-white font-thin'>
                <NavLink style={({isActive}) => {return isActive ? {color : "red"} : {} }}
                 to ="/"  className='btn btn-ghost btn-md rounded-btn hover:bg-slate-700 text-center rounded p-1 '
                
                 >HOME</NavLink>
                <NavLink style={({isActive}) => {return isActive ? {color : "red"} : {} }} 
                to ="/history" className='btn btn-ghost btn-md rounded-btn hover:bg-slate-700 text-center rounded p-1 '
                >HISTORY</NavLink>
                <NavLink style={({isActive}) => {return isActive ? {color : "red"} : {} }}
                 to ="/about" className='btn btn-ghost btn-md rounded-btn hover:bg-slate-700 text-center rounded p-1 '
                >ABOUT</NavLink>
           </ul>
        </nav>

    </React.Fragment>
  )
}

export default Navbar