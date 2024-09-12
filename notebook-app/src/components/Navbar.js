import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  let location = useLocation();
  let  loggedIn = localStorage.getItem("token");
  // console.log(loggedIn?"Hello":"world");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    // Add a resize event listener to close the mobile menu when the screen size becomes larger
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="bg-gray-800 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row md:justify-between md:items-center relative">
        {/* Brand name centered for mobile view */}
        <Link
          to="/"
          className="text-white text-2xl font-bold text-start md:text-left"
        >
          NoteBook
        </Link>
        <div className="md:flex space-x-4 mt-4 md:mt-0 hidden">
          <Link to="/" className={`${location.pathname==="/"?"text-black font-bold bg-gray-100 transition duration-300 ease-out transform scale-105":"text-white"} rounded-2xl px-3 py-1`}>
            Home
          </Link>
          {/* <Link to="/about" className={`${location.pathname==="/about"?"text-black font-bold bg-gray-100 transition duration-300 ease-out transform scale-105":"text-white"} rounded-2xl px-3 py-1`}>
            About us
          </Link> */}
          {!loggedIn && <Link to="/login" className={`${location.pathname==="/login"|| location.pathname==="/signup"?"text-black font-bold bg-gray-100 transition duration-300 ease-out transform scale-105":"text-white"} rounded-2xl px-3 py-1`}>
            Log in
          </Link>}
          {loggedIn && <Link to="/profile" className={`${location.pathname==="/profile"?"text-black font-bold bg-gray-100 transition duration-300 ease-out transform scale-105":"text-white"} rounded-2xl px-3 py-1`}>
            Profile
          </Link>}
        
        </div>
        {/* Toggle button at top-right for mobile view */}
        <button
          onClick={toggleMobileMenu}
          className="absolute p-1 top-0.5 right-4 md:hidden text-white focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="bg-gray-800 mt-2">
            <Link to="/" className={`block py-2 px-4  rounded-2xl ${location.pathname==="/"?"text-black bg-slate-50":"text-white"} `} onClick={toggleMobileMenu}>
              Home
            </Link>
            {/* <Link to="/about" className="block py-2 px-4 text-white" onClick={toggleMobileMenu}>
              About us
            </Link> */}
            {!loggedIn && <Link to="/login" className={`block py-2 px-4  rounded-2xl ${location.pathname==="/login"|| location.pathname==="/signup"?"text-black bg-slate-50":"text-white"} `} onClick={toggleMobileMenu}>
              Log in
            </Link>}
            
            {loggedIn && <Link to="/profile" className={`block py-2 px-4  rounded-2xl ${location.pathname==="/profile"?"text-black bg-slate-50":"text-white"} `} onClick={toggleMobileMenu}>
              Profile
            </Link>}
            
          </div>
        )}
      </div>
    </nav>
  );
}
