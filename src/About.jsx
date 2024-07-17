import React from 'react';
import useUserStore from "./Store";

const About = () => {
  const { searchUser, fetchedUser,locationFetched } = useUserStore();
 
    console.log(fetchedUser)
    console.log("Searching"+searchUser)
    console.log("location getting "+locationFetched.longitude)

  return (
    <div className="flex flex-col items-center justify-center gap-10 py-20 px-10 ">
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
  );
};

export default About;
