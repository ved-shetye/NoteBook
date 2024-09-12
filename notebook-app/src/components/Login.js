import React,{useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import Loader from './Loader';

export default function Login(props) {
  const {showAlert}=props;
  const navigate = useNavigate();
  const [loginCred,setLoginCred]=useState({email:"",password:""});
  const [lodingState,setLodingState] = useState(false);

  const handleChange = (e)=>{
    setLoginCred({...loginCred,[e.target.name]:e.target.value});
  }
  const loginSubmit = async(e)=>{
    e.preventDefault();
    try {
      setLodingState(true);
    const url = `${process.env.REACT_APP_LINK}/api/auth/login`;
    const headers = {
        "Content-Type":"application/json"
    }
    const response = await axios.post(url,loginCred,{headers});
    const json = await response.data;
    // console.log(response.status);
    setLodingState(false);
    if (response.status===200) {
      localStorage.setItem("token",json.authToken);
      navigate("/");
      showAlert(json.success,"You have logged in successfully");
      // console.log(json.success,json.name,json.email);
    }
    } catch (error) {
      setLodingState(false);
      setLoginCred({email:"",password:""});
      showAlert(false,"Invalid username or password. Please try again.");
    }
    
}
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md sm:w-96">
            <h2 className="text-2xl font-semibold mb-6">Login To Your account</h2>
            <form onSubmit={loginSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={loginCred.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-black"
                  placeholder="Enter your email "
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={loginCred.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-black"
                  placeholder="Enter your password"
                  required
                />
              </div>
              { lodingState && <Loader/>}
              <div className="mb-6">
                <button
                  disabled = {lodingState}
                  type="submit"
                  className={`w-full ${lodingState?"hidden":" "} bg-gray-800 text-white font-semibold py-2 rounded-lg hover:ring focus:outline-none`}
                >
                  Login
                </button>
              </div>
              <p className="text-sm text-gray-600">
                Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
              </p>
            </form>
          </div>
        </div>
      );
}
