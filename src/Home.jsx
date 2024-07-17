import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useUserStore from "./Store";

const Home = () => {
  const { searchUser, fetchedUser, setSearchUser, setFetchedUser } = useUserStore();
  const navigate = useNavigate();

  const fetchGit = () => {
    console.log("Fetching Data from APIs");
    axios
      .get(`https://api.github.com/users/${searchUser}`)
      .then((response) => {
        console.log("Fetching from git : " + response.data);
        setFetchedUser(response.data);
       console.log( fetchedUser.location)
      })
      .catch((error) => console.error(error));
  };

  const redirectProfile = () => {
    navigate("/profileview", { state: { fetchedData: fetchedUser } });
  };

  return (
    <React.Fragment>
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 my-24 flex justify-center flex-col gap-6 text-center">
        <div className="relative isolate overflow-hidden bg-white px-6 py-10 text-center shadow-lg rounded-xl sm:px-16 dark:bg-gray-800">
          <p className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-4xl">
            Find greatness with our{" "}
            <span className="text-blue-800">GitHub</span> Profile Finder.
          </p>
          <form
            action="/search"
            onSubmit={(e) => {
              e.preventDefault();
              fetchGit();
            }}
          >
            <label
              htmlFor="search-bar"
              className="mx-auto mt-8 relative bg-white max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-lg focus-within:border-gray-300 dark:bg-gray-700"
            >
              <input
                id="search-bar"
                placeholder="your keyword here"
                name="q"
                className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white dark:bg-gray-600 dark:text-white"
                required
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
              />
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-3 bg-black border-black text-white active:scale-95 duration-100 border rounded-xl transition-all hover:bg-gray-800"
              >
                <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                  Search
                </span>
              </button>
            </label>
          </form>
        </div>
        {fetchedUser.login && (
          <div className="my-5 mx-auto card shadow-md bg-base-100 w-80 rounded-lg">
            <figure className="px-10 pt-10">
              <img
                src={fetchedUser.avatar_url}
                alt="avatar"
                className="rounded-full w-24 h-24"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{fetchedUser.login}</h2>
              <div className="card-actions">
                <button
                  className="btn btn-primary"
                  onClick={redirectProfile}
                >
                  Visit Profile
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Home;
