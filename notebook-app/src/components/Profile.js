import axios from "axios";
import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Loader from './Loader'

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", date: "" });
  const [loaderState,setLoadingState] = useState(false);
  const getProfile = async () => {
    setLoadingState(true);
    const url = `${process.env.REACT_APP_LINK}/api/auth/getUserData`;
    const headers = {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    };
    const response = await axios.get(url, { headers });
    const json = await response.data;
    const originalDate = json.date;
    const dateObject = new Date(originalDate);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObject.getDate().toString().padStart(2, "0");
    const formattedDateTime = `${day}-${month}-${year}`;
    setUser({ name: json.name, email: json.email, date: formattedDateTime });
    setLoadingState(false);
  };

  const onLogout=()=>{
    localStorage.removeItem("token");
    navigate("/login");
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getProfile();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  },[]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white relative p-8 rounded-lg shadow-md sm:w-96">
        <h2 className="text-2xl font-semibold mb-6">Profile</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600 mb-1">Name:</label>
            <input
              type="text"
              value={user.name}
              // onChange={handleChange}
              className="w-full bg-gray-200 px-3 py-2 border rounded-lg focus:outline-none focus:border-black"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block bg-gray mb-1">Email:</label>
            <input
              type="text"
              value={user.email}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none bg-gray-200 focus:border-black"
              readOnly
            />
          </div>
          <div className="mb-10">
            <label htmlFor="name" className="block bg-gray mb-1">Account created on:</label>
            <input
              type="text"
              value={user.date}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none bg-gray-200 focus:border-black"
              readOnly
            />
          </div>
          { loaderState && <Loader/>}
          <div className="mb-6">
            <button
              disabled = {loaderState}
              type="submit"
              className={`bg-red-500 hover:bg-red-600 ${loaderState?"hidden":" "} absolute right-7 bottom-3.5 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none`}
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
