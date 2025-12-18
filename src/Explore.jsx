import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useUserStore from "./Store";

const defaultUsers = ["torvalds", "gaearon", "sindresorhus", "yyx990803", "hadley"];

const Explore = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setFetchedUser, addToHistory } = useUserStore();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const results = await Promise.all(
          defaultUsers.map((u) =>
            axios
              .get(`https://api.github.com/users/${u}`)
              .then((res) => res.data)
              .catch(() => null)
          )
        );
        setUsers(results.filter(Boolean));
      } catch (e) {
        setError("Unable to load example users right now.");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const openInApp = (user) => {
    setFetchedUser(user);
    addToHistory(user);
    navigate("/profileview", { state: { fetchedData: user, searchUser: user.login } });
  };

  if (loading) {
    return (
      <div className="pt-24 pb-24 flex justify-center items-center">
        <p className="text-lg font-medium text-slate-800">Loading profiles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 pb-24 flex justify-center items-center">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24 px-4 mx-auto max-w-6xl flex flex-col gap-6">
      <div className="bg-white rounded-xl shadow-md p-5">
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-1">
          Explore notable GitHub users
        </h1>
        <p className="text-sm text-slate-600">
          Click any card to open their profile inside this app or visit them directly on GitHub.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {users.map((user) => (
          <div
            key={user.login}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-3"
          >
            <div className="flex items-center gap-3">
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-slate-900">
                  {user.name || user.login}
                </p>
                <p className="text-xs text-slate-600">@{user.login}</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 line-clamp-3">
              {user.bio || "No bio available."}
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] text-slate-700">
              <span className="px-2 py-0.5 rounded-full bg-slate-100">
                Followers: {user.followers}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100">
                Repos: {user.public_repos}
              </span>
              {user.location && (
                <span className="px-2 py-0.5 rounded-full bg-slate-100">
                  {user.location}
                </span>
              )}
            </div>
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={() => openInApp(user)}
                className="flex-1 px-3 py-1 rounded-md bg-black text-white text-xs hover:bg-gray-800"
              >
                View in app
              </button>
              <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
                className="flex-1 px-3 py-1 rounded-md border border-slate-300 text-xs text-slate-700 text-center hover:bg-slate-50"
              >
                Open on GitHub
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;


