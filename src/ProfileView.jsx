import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { SlUserFollow, SlUserFollowing } from "react-icons/sl";


const ProfileView = () => {
  const location = useLocation();
  const [user, setUser] = useState(location.state?.fetchedData || {});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user.login) {
      // Fetch user data if not already provided
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [user.login]);

  const fetchUserData = () => {
    setLoading(true);
    fetch(`https://api.github.com/users/${location.state.searchUser}`)
      .then((response) => {
        if (response.ok) {
          console.log(response.data)
          return response.json();
        }
        throw new Error("Failed to fetch user data");
      })
      .then((data) => {
        setUser(data);
        console.log(data)
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setError(error.message);
        setLoading(false);
      });
  };

  if (loading) {
    return <p>Loading...</p>; // Optional: Add a loading indicator
  }

  if (error) {
    return <p>Error: {error}</p>; // Optional: Display error message
  }

  return (
    <div className="flex flex-col justify-center items-center my-20 mx-4 sm:mx-20 gap-5">
      <div className="card w-full max-w-4xl bg-base-100 shadow-xl">
        <div className="card-body flex flex-col md:flex-row gap-5">
          <div className="flex flex-col items-center md:w-1/3 bg-gray-300 rounded-lg p-4 shadow-md">
            <img
              className="rounded-full w-48 h-48 object-cover"
              src={user.avatar_url}
              alt="User Avatar"
            />
            <h2 className="card-title mt-4 text-center">{user.login}</h2>
          </div>
          <div className="flex-grow p-4 bg-gray-200 rounded-lg shadow-md">
            <h1 className="text-3xl font-semibold">{user.name}</h1>
            <p className="mt-2 font-mono whitespace-normal">
              {user.bio || "No bio available"}
            </p>
            <p className="mt-2 font-mono whitespace-normal">
              {user.location || "No location available"}
            </p>
            <div className="mt-4 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <HiBuildingOffice2 size="1.5em" />
                <p>Company: {user.company || "Not specified"}</p>
              </div>
              <div className="flex items-center gap-2">
                <SlUserFollow size="1.5em" />
                <p>Followers: {user.followers}</p>
              </div>
              <div className="flex items-center gap-2">
                <SlUserFollowing size="1.5em" />
                <p>Following: {user.following}</p>
              </div>
            </div>
            <div className="mt-6">
              <a
                href={user.html_url}
                className="btn btn-outline w-full md:w-auto"
              >
                Visit GitHub Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
