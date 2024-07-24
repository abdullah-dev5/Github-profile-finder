import React from 'react';
import useUserStore from "./Store";

const About = () => {
  const { locationFetched } = useUserStore();
 
   
  return (
<>    <div className="flex flex-col items-center justify-center gap-10 py-20 px-10 ">
      <h1 className="font-semibold text-6xl text-center">Github Profile Finder</h1>
      <p className="text-2xl font-light text-center max-w-3xl">
        A React app to search GitHub profiles and view profile details. This project is part of the MERN BootCamp.
      </p>
      
      <div className="shadow-md p-10 rounded-lg text-center bg-white max-w-2xl">
        <a
          href="https://github.com/abdullah-dev5/Github-profile-finder"
          className="text-blue-500 font-semibold hover:underline"
        >
          Visit my Repository
        </a>
      </div>
    </div>
    <div className="flex flex-col justify-center items-center my-20 mx-4 sm:mx-20 gap-5">
      <div className="card w-full max-w-4xl bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-semibold mb-4">Location</h2>
          <div className="bg-gray-200 text-black p-4 rounded-lg shadow-md">
            <p className="font-mono whitespace-normal">Values from stores</p>
            <p className="font-mono whitespace-normal">Longitude {locationFetched.longitude}</p>
            <p className="font-mono whitespace-normal">Longitude {locationFetched.latitude}</p>
            
            
         </div>
        </div>
      </div>
    </div>
</>
);
};

export default About;
