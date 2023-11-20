import React, { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import ProfileView from "./ProfileView";
import { data } from "autoprefixer";
const Home = () => {
  const [searchUser, setSearchUser] = useState("");
  const [fetched, setFetched] = useState({});
  const navigate = useNavigate();

  function fetchGit() {
    console.log("Fetchind Data from Apis");
    axios
      .get(`https://api.github.com/users/${searchUser}`)
      .then((data) => {
        console.log(data);
        setFetched(data);
      })
      .catch((error) => console.error(error));
  }
  function redirectProfile() {
    navigate("/profileview", { state: { fetchedData: fetched.data } });
  }

  return (
    <React.Fragment>
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 my-24  flex justify-center flex-col gap-2 text-center">
        <div className="relative isolate overflow-hidden bg-white px-6 py-10 text-center sm:px-16 sm:shadow-sm dark:bg-transparent">
          <p className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-4xl">
            Find greatness with our{" "}
            <span className="text-blue-800 ">GitHub</span> Profile Finder.
          </p>
          <form
            action="/search  "
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <label
              htmlFor="search-bar"
              className="mx-auto mt-8 relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
            >
              <input
                id="search-bar"
                placeholder="your keyword here"
                name="q"
                className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
                required
                value={searchUser}
                onChange={(e) => {
                  setSearchUser(e.target.value);
                }}
              />
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-3 bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all"
                onClick={fetchGit}
              >
                <div className="flex items-center transition-all opacity-1">
                  <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                    Search
                  </span>
                </div>
              </button>
            </label>
          </form>
        </div>
        {
          fetched.data &&
          <div className="my-5 mx-96 p-3 h-24 flex flex-row gap-3 justify-start items-center shadow-md bg-slate-100 w-80  rounded ">
          <div className="mx-5 rounded-full shadow w-14 h-14">
            <img
              src={
                fetched.data !== undefined ? fetched.data.avatar_url : "image"
              }
              alt="image"
            />
          </div>
          <div className=" text-xl p-1 flex flex-col gap-2 justify-center   w-50 h-20 ">
            <h1 className="font-semibold">
              {fetched.data !== undefined ? fetched.data.login : "UserName"}
            </h1>
            {<a  className="cursor-pointer text-thin"
            onClick={redirectProfile}>visit Profile</a>}
          </div>
        </div>}
      </div>
    </React.Fragment>
  );
};

export default Home;
