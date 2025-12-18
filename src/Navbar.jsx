import React from 'react'
import {NavLink, Link } from 'react-router-dom'
import { FaGithub } from "react-icons/fa6";


const Navbar = () => {
  return (
    <React.Fragment>
      <nav className="fixed top-0 z-20 w-full h-16 px-4 bg-white border-b border-slate-200 flex flex-row items-center justify-between font-semibold text-slate-900 shadow-sm">
        <div className="flex items-center gap-2">
          <FaGithub size="2em" />
          <h1 className="font-light text-lg sm:text-xl">GitHub Profile Finder</h1>
        </div>
        <ul className="flex gap-2 sm:gap-4 items-center text-xs sm:text-sm font-light">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-1 rounded-md transition-colors ${
                isActive
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`
            }
          >
            HOME
          </NavLink>
          <NavLink
            to="/explore"
            className={({ isActive }) =>
              `px-3 py-1 rounded-md transition-colors ${
                isActive
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`
            }
          >
            EXPLORE
          </NavLink>
          <NavLink
            to="/compare"
            className={({ isActive }) =>
              `px-3 py-1 rounded-md transition-colors ${
                isActive
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`
            }
          >
            COMPARE
          </NavLink>
          <NavLink
            to="/map"
            className={({ isActive }) =>
              `px-3 py-1 rounded-md transition-colors ${
                isActive
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`
            }
          >
            MAP
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `px-3 py-1 rounded-md transition-colors ${
                isActive
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`
            }
          >
            ABOUT
          </NavLink>
        </ul>
      </nav>
    </React.Fragment>
  );
}

export default Navbar