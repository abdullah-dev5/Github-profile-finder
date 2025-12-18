import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useUserStore from "./Store";

const Home = () => {
  const {
    searchUser,
    fetchedUser,
    history,
    favorites,
    setSearchUser,
    setFetchedUser,
    addToHistory,
    removeFromHistory,
    removeFavorite,
  } = useUserStore();
  const navigate = useNavigate();

  const fetchGit = () => {
    if (!searchUser.trim()) return;
    axios
      .get(`https://api.github.com/users/${searchUser.trim()}`)
      .then((response) => {
        setFetchedUser(response.data);
        addToHistory(response.data);
      })
      .catch((error) => console.error(error));
  };
  console.log("Address from git api", fetchedUser)
  
  const redirectProfile = () => {
    navigate("/profileview", { state: { fetchedData: fetchedUser, searchUser: fetchedUser?.login } });
  };

  const totalSearches = history.length;
  const uniqueLocations = new Set(
    history
      .map((h) => h.location && h.location.trim().toLowerCase())
      .filter(Boolean)
  ).size;

  return (
    <React.Fragment>
      <div className="pt-24 pb-24 px-4 mx-auto max-w-6xl flex flex-col gap-8">
        {/* Hero + search */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-left space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
              Explore GitHub profiles in a cleaner way.
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-md">
              Search any GitHub username to quickly see their profile, key stats, and top
              repositories. Your recent searches are saved for easy access.
            </p>
            <ul className="text-xs sm:text-sm text-slate-600 space-y-1 list-disc list-inside">
              <li>Instant profile lookup</li>
              <li>Recent searches and favorites</li>
              <li>Top repositories at a glance</li>
            </ul>
          </div>

          <div className="relative isolate overflow-hidden bg-white px-6 py-8 text-center shadow-lg rounded-xl sm:px-8">
            <p className="mx-auto max-w-2xl text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
              Find a GitHub user
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
                className="mx-auto mt-6 relative bg-white max-w-md flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-lg focus-within:border-gray-300"
              >
                <input
                  id="search-bar"
                  placeholder="Enter a GitHub username (e.g. torvalds)"
                  name="q"
                  className="px-4 sm:px-6 py-2 w-full rounded-md flex-1 outline-none bg-white text-slate-900"
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
            {fetchedUser.login && (
              <div className="mt-6 mx-auto card shadow-sm bg-slate-50 w-full max-w-md rounded-lg">
                <div className="flex items-center gap-3 p-4">
                  <img
                    src={fetchedUser.avatar_url}
                    alt="avatar"
                    className="rounded-full w-12 h-12"
                  />
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-slate-900">{fetchedUser.login}</p>
                    {fetchedUser.name && (
                      <p className="text-xs text-slate-600 truncate">{fetchedUser.name}</p>
                    )}
                  </div>
                  <button
                    className="btn btn-primary btn-sm whitespace-nowrap"
                    onClick={redirectProfile}
                  >
                    View
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent searches & favorites */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-5">
            <h2 className="text-lg font-semibold text-slate-900 mb-2">Recent searches</h2>
            {history.length === 0 ? (
              <p className="text-sm text-slate-500">
                You haven&apos;t searched for any profiles yet. Start by entering a username
                above.
              </p>
            ) : (
              <div className="flex gap-3 overflow-x-auto py-1">
                {history.slice(0, 6).map((item) => (
                  <div
                    key={item.login}
                    className="relative flex flex-col items-center min-w-[72px]"
                  >
                    <img
                      src={item.avatar_url}
                      alt={item.login}
                      className="w-12 h-12 rounded-full object-cover mb-1"
                    />
                    <button
                      type="button"
                      onClick={() => removeFromHistory(item.login)}
                      className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] leading-none shadow hover:bg-red-600"
                      aria-label={`Remove ${item.login} from recent`}
                    >
                      ×
                    </button>
                    <span className="text-[11px] text-slate-700 truncate max-w-[72px]">
                      {item.login}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-md p-5">
            <h2 className="text-lg font-semibold text-slate-900 mb-2">Favorites</h2>
            {favorites.length === 0 ? (
              <p className="text-sm text-slate-500">
                Mark profiles as favorites from the profile page to see them here.
              </p>
            ) : (
              <div className="flex flex-wrap gap-3">
                {favorites.slice(0, 6).map((item) => (
                  <a
                    key={item.login}
                    href={item.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="relative flex items-center gap-2 px-3 py-2 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100"
                  >
                    <img
                      src={item.avatar_url}
                      alt={item.login}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-xs font-medium text-slate-800">{item.login}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        removeFavorite(item.login);
                      }}
                      className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center rounded-full bg-red-500 text-white text-[9px] leading-none shadow hover:bg-red-600"
                      aria-label={`Remove ${item.login} from favorites`}
                    >
                      ×
                    </button>
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-md p-5 lg:col-span-2">
            <h2 className="text-lg font-semibold text-slate-900 mb-2">Your usage</h2>
            <p className="text-xs text-slate-600 mb-3">
              A quick summary of how you&apos;ve been using this app.
            </p>
            <div className="flex flex-wrap gap-3 text-xs">
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-800">
                Total searched profiles: {totalSearches}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-800">
                Favorites: {favorites.length}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-800">
                Locations found: {uniqueLocations}
              </span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
