import React from 'react';
import useUserStore from "./Store";

const About = () => {
  const { locationFetched } = useUserStore();
 
   
  return (
<>
    <div className="pt-24 pb-24 px-6 flex flex-col items-center justify-center gap-10">
      <h1 className="font-semibold text-4xl sm:text-5xl text-center text-slate-900">Github Profile Finder</h1>
      <p className="text-lg sm:text-2xl font-light text-center max-w-3xl text-slate-700">
        A React app to search GitHub profiles and view profile details. This project is part of the MERN BootCamp.
      </p>
      
      <div className="shadow-md p-8 sm:p-10 rounded-lg text-center bg-white max-w-2xl">
        <a
          href="https://github.com/abdullah-dev5/Github-profile-finder"
          className="text-blue-500 font-semibold hover:underline"
        >
          Visit my Repository
        </a>
      </div>
    </div>

</>
);
};

export default About;
