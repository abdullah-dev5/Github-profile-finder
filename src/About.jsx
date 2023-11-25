import React from 'react'

const About = () => {
  return (
        <React.Fragment>   
        
     <div className='m-10 p-5 my-20 flex-1-1-auto flex-col justify-center  items-center gap-10'>
        <h1 className='m-10 font-semibold text-6xl'>Github Finder</h1>
        <p className='mb-4 text-2xl font-light m-10'>A React app to search GitHub profiles and see profile details.
        This project is part of the MERN BootCamp.
        </p>
        <div className='mx-56 m-10 p-10 shadow-md text-center' >

          <a className='text-semibold border-b-2 rounded p-2' href="https://github.com/abdullah-dev5/Github-profile-finder">Visit my Repository</a>
            </div>  
   </div>
   </React.Fragment>

    )
}

export default About