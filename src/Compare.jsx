import React, { useState } from "react";
import axios from "axios";

const emptyUser = {
  login: "",
  name: "",
  avatar_url: "",
  followers: 0,
  following: 0,
  public_repos: 0,
  html_url: "",
  location: "",
};

const Compare = () => {
  const [userAName, setUserAName] = useState("");
  const [userBName, setUserBName] = useState("");
  const [userA, setUserA] = useState(emptyUser);
  const [userB, setUserB] = useState(emptyUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUser = async (username) => {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    return response.data;
  };

  const handleCompare = async (e) => {
    e.preventDefault();
    const a = userAName.trim();
    const b = userBName.trim();
    if (!a || !b) return;
    if (a.toLowerCase() === b.toLowerCase()) {
      setError("Please enter two different usernames.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const [dataA, dataB] = await Promise.all([fetchUser(a), fetchUser(b)]);
      setUserA(dataA);
      setUserB(dataB);
    } catch (err) {
      console.error(err);
      setError("Unable to load one or both users. Please check the usernames.");
    } finally {
      setLoading(false);
    }
  };

  const winnerClass = (a, b) => {
    if (a === b) return "bg-slate-100";
    return a > b ? "bg-green-100" : "bg-red-100";
  };

  return (
    <div className="pt-24 pb-24 px-4 mx-auto max-w-6xl flex flex-col gap-8">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-2">
          Compare two GitHub users
        </h1>
        <p className="text-sm text-slate-600 mb-4">
          See who has more followers, repositories, and other basic stats.
        </p>
        <form
          onSubmit={handleCompare}
          className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center"
        >
          <input
            type="text"
            placeholder="First username"
            className="px-4 py-2 rounded-lg border border-slate-300 outline-none text-sm"
            value={userAName}
            onChange={(e) => setUserAName(e.target.value)}
          />
          <span className="text-center text-xs font-medium text-slate-500">vs</span>
          <input
            type="text"
            placeholder="Second username"
            className="px-4 py-2 rounded-lg border border-slate-300 outline-none text-sm"
            value={userBName}
            onChange={(e) => setUserBName(e.target.value)}
          />
          <button
            type="submit"
            className="mt-2 md:mt-0 md:col-span-3 w-full md:w-auto justify-self-start px-6 py-2 rounded-lg bg-black text-white text-sm font-semibold hover:bg-gray-800"
            disabled={loading}
          >
            {loading ? "Comparing..." : "Compare"}
          </button>
        </form>
        {error && (
          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>

      {(userA.login || userB.login) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-5">
            {userA.login ? (
              <>
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={userA.avatar_url}
                    alt={userA.login}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-slate-900">
                      {userA.name || userA.login}
                    </p>
                    <p className="text-xs text-slate-600">@{userA.login}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className={`flex justify-between px-3 py-2 rounded-lg ${winnerClass(userA.followers, userB.followers)}`}>
                    <span>Followers</span>
                    <span className="font-semibold">{userA.followers}</span>
                  </div>
                  <div className={`flex justify-between px-3 py-2 rounded-lg ${winnerClass(userA.following, userB.following)}`}>
                    <span>Following</span>
                    <span className="font-semibold">{userA.following}</span>
                  </div>
                  <div className={`flex justify-between px-3 py-2 rounded-lg ${winnerClass(userA.public_repos, userB.public_repos)}`}>
                    <span>Public repos</span>
                    <span className="font-semibold">{userA.public_repos}</span>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-sm text-slate-500">
                Enter a username on the left to see stats.
              </p>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-md p-5">
            {userB.login ? (
              <>
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={userB.avatar_url}
                    alt={userB.login}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-slate-900">
                      {userB.name || userB.login}
                    </p>
                    <p className="text-xs text-slate-600">@{userB.login}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className={`flex justify-between px-3 py-2 rounded-lg ${winnerClass(userB.followers, userA.followers)}`}>
                    <span>Followers</span>
                    <span className="font-semibold">{userB.followers}</span>
                  </div>
                  <div className={`flex justify-between px-3 py-2 rounded-lg ${winnerClass(userB.following, userA.following)}`}>
                    <span>Following</span>
                    <span className="font-semibold">{userB.following}</span>
                  </div>
                  <div className={`flex justify-between px-3 py-2 rounded-lg ${winnerClass(userB.public_repos, userA.public_repos)}`}>
                    <span>Public repos</span>
                    <span className="font-semibold">{userB.public_repos}</span>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-sm text-slate-500">
                Enter a username on the right to see stats.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Compare;


