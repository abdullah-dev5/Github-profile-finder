import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { SlUserFollow, SlUserFollowing } from "react-icons/sl";
import { FaStar } from "react-icons/fa";
import useUserStore from "./Store";


const ProfileView = () => {
  const location = useLocation();
  const { favorites, toggleFavorite } = useUserStore();
  const [user, setUser] = useState(location.state?.fetchedData || {});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [repos, setRepos] = useState([]);
  const [reposLoading, setReposLoading] = useState(false);

  // Use the first letter of the username as a simple fallback avatar
  const displayInitial = user?.login ? user.login.charAt(0).toUpperCase() : "?";

  useEffect(() => {
    if (!user.login && location.state?.searchUser) {
      // Fetch user data if not already provided but we have a username
      fetchUserData(location.state.searchUser);
    } else {
      setLoading(false);
    }
  }, [user.login, location.state]);

  const fetchUserData = (username) => {
    setLoading(true);
    fetch(`https://api.github.com/users/${username}`)
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

  useEffect(() => {
    if (!user.login) return;
    setReposLoading(true);
    fetch(`https://api.github.com/users/${user.login}/repos?sort=updated&per_page=5`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }
        return response.json();
      })
      .then((data) => {
        setRepos(data);
        setReposLoading(false);
      })
      .catch(() => {
        setRepos([]);
        setReposLoading(false);
      });
  }, [user.login]);

  if (loading) {
    return (
      <div className="pt-24 pb-24 flex justify-center items-center">
        <p className="text-lg font-medium text-slate-800">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 pb-24 flex justify-center items-center">
        <p className="text-red-600 font-medium">Error: {error}</p>
      </div>
    );
  }

  const isFavorite = user.login
    ? favorites.some((item) => item.login === user.login)
    : false;

  const badges = [];
  if (user.followers > 1000) {
    badges.push("Popular");
  }
  if (user.public_repos > 50) {
    badges.push("Code machine");
  }
  if (user.created_at) {
    const created = new Date(user.created_at);
    const years = (Date.now() - created.getTime()) / (1000 * 60 * 60 * 24 * 365);
    if (years < 1) {
      badges.push("Rising star");
    }
  }

  return (
    <div className="pt-24 pb-24 flex flex-col justify-center items-center mx-4 sm:mx-6 lg:mx-20 gap-5 bg-slate-50">
      <div className="card w-full max-w-4xl bg-white shadow-xl rounded-2xl">
        <div className="card-body flex flex-col md:flex-row gap-6">
          {/* Left column – avatar + username */}
          <div className="flex flex-col items-center md:w-1/3 bg-gray-50 rounded-xl p-5 shadow-sm">
            {user.avatar_url ? (
              <img
                className="rounded-full w-40 h-40 sm:w-44 sm:h-44 object-cover ring-4 ring-white shadow-md"
                src={user.avatar_url}
                alt={`${user.login}'s avatar`}
              />
            ) : (
              <div className="rounded-full w-40 h-40 sm:w-44 sm:h-44 flex items-center justify-center bg-slate-200 text-slate-700 text-4xl font-semibold shadow-md">
                {displayInitial}
              </div>
            )}
            <h2 className="card-title mt-4 text-center text-base sm:text-lg text-slate-900">
              @{user.login || "unknown"}
            </h2>
          </div>

          {/* Right column – details */}
          <div className="flex-grow p-4 sm:p-5 bg-white rounded-xl md:bg-gray-50 md:shadow-inner">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900">
                  {user.name || user.login}
                </h1>
                <p className="text-sm text-slate-600">@{user.login}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-1">
                <span className="px-3 py-1 text-xs rounded-full bg-slate-100 text-slate-800">
                  Followers: {user.followers}
                </span>
                <span className="px-3 py-1 text-xs rounded-full bg-slate-100 text-slate-800">
                  Following: {user.following}
                </span>
                <span className="px-3 py-1 text-xs rounded-full bg-slate-100 text-slate-800">
                  Repos: {user.public_repos}
                </span>
              </div>
            </div>

            {badges.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {badges.map((badge) => (
                  <span
                    key={badge}
                    className="px-3 py-1 text-[11px] rounded-full bg-amber-100 text-amber-900 font-medium"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}

            <p className="mt-3 font-mono whitespace-normal text-sm text-slate-800">
              {user.bio || "No bio available"}
            </p>
            <p className="mt-2 font-mono whitespace-normal text-sm text-slate-700">
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
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={user.html_url}
                className="btn btn-outline btn-sm md:btn-md"
              >
                Visit GitHub Profile
              </a>
              <button
                type="button"
                onClick={() => toggleFavorite(user)}
                className={`btn btn-sm md:btn-md ${
                  isFavorite ? "btn-secondary" : "btn-outline"
                }`}
              >
                {isFavorite ? "Remove from favorites" : "Add to favorites"}
              </button>
            </div>
            <div className="mt-6 border-t border-gray-300 pt-4">
              <h3 className="text-xl font-semibold mb-2">Top Repositories</h3>
              {reposLoading && (
                <p className="text-sm text-slate-700">Loading repositories...</p>
              )}
              {!reposLoading && repos.length === 0 && (
                <p className="text-sm text-slate-700">
                  No public repositories available or unable to load them.
                </p>
              )}
              {!reposLoading && repos.length > 0 && (
                <div className="space-y-3">
                  {repos.map((repo) => (
                    <a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="block p-3 rounded-lg bg-white/70 hover:bg-white shadow-sm border border-gray-200"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-semibold text-slate-900 truncate">
                          {repo.name}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-600">
                          <FaStar className="text-yellow-500" />
                          {repo.stargazers_count}
                        </span>
                      </div>
                      {repo.description && (
                        <p className="text-xs text-slate-600 line-clamp-2">
                          {repo.description}
                        </p>
                      )}
                      {repo.language && (
                        <span className="mt-2 inline-block text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-white">
                          {repo.language}
                        </span>
                      )}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
