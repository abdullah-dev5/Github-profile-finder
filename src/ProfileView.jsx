import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { SlUserFollowing } from "react-icons/sl";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { SlUserFollow } from "react-icons/sl";

const ProfileView = () => {
  const location = useLocation();
  const [user, setUser] = useState(location.state?.fetchedData || {});

  return (
    <>
      <div className="m-1 mx-20  my-20  flex flex-col justify-center gap-5 rounded ">
        <div className=" flex flex-row justify-start basis-96  gap-5 flex-nowrap  h-96 p-4 bg-gray-100 border-2 border-black rounded-md shadow-lg ">
          <div className="h-88 w-96 flex flex-col gap-2 items-center bg-gray-300 p-1 rounded-lg shadow-md px-1">
            <img
              className="m-1 h-96 w-96 object-cover rounded "
              src={user.avatar_url}
              alt=""
            />
            <output className="text-md font-mono font-medium text-black  p-2 ">
              {user.login}
            </output>
          </div>
          <div className=" p-2 flex  flex-col gap-5  justify-between bg-gray-300  rounded  ">
            <div>
              <h1 className="p-2 text-3xl  font-semibold">{user.name} </h1>
              <p className="p-2 text-lg">
                {" "}
                {user.bio} <br />{" "}
              </p>
            </div>
            <div className="flex flex-row justify-start gap-5 text-lg font-mono">
              <div className=" flex flex-row justify-center gap-2 px-2 ">
                <HiBuildingOffice2 size="2em" />

                <h1>Company : {user.company} </h1>
              </div>
              <div className="flex flex-row justify-start gap-3">
                <SlUserFollow size="2em" />
                <h1> Follower : {user.followers} </h1>
              </div>
              <div className="flex flex-row justify-center gap-3">
                <SlUserFollowing size="2em" />
                <h1> Following : {user.following} </h1>
              </div>
            </div>

            <div className=" w-44 h-14 border-slate-600 border-1/2 justify-center text-center items-center border-2 rounded-lg p-2 shadow-lg hover:bg-slate-600 hover:text-white ">
              <a href={user.html_url} className="btn btn-outline">
                Visit Github Profile{" "}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileView;
