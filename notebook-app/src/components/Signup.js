import axios from 'axios';
import React,{useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import Loader from './Loader';

export default function Signup(props) {
    const {showAlert}=props;
    const navigate = useNavigate();
    const [signCred,setSignCred]=useState({name:"",email:"",password:"",cpassword:""});
    const [lodingState,setLodingState] = useState(false);

    const handleChange = (e)=>{
      setSignCred({...signCred,[e.target.name]:e.target.value});
    }
    const handleSubmit=async(e)=>{
    e.preventDefault();
    if (signCred.password!==signCred.cpassword) {
      setSignCred({
        password:"",
        cpassword:""
      });
      showAlert(false,"Password doesnt match!");
    }
    else {
      try {
        setLodingState(true);
        const url = `${process.env.REACT_APP_LINK}/api/auth/createUser`;
        const headers = {
          "Content-Type":"application/json"
        }
        const requestBody={
          name:signCred.name,
          email:signCred.email,
          password:signCred.password
        }
        const response = await axios.post(url,requestBody,{headers});
        const json = await response.data;
        setLodingState(false);
  
        if (json.success) {
          localStorage.setItem("token",json.authToken);
          navigate("/");
          showAlert(json.success,"Account created successfully");
        }
      } catch (error) {
        setLodingState(false);
        setSignCred({email:"",password:""});
        showAlert(false,"Invalid username or password. Please try again.");
      }
    }
    }
      return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
          <div className="bg-white p-10 rounded-lg shadow-md sm:w-96">
            <h2 className="text-2xl font-semibold mb-6">Create a new account</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={signCred.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-black"
                  placeholder="Name"
                  required
                  minLength={6}
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={signCred.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-black"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={signCred.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-black"
                  placeholder="New Password"
                  required
                  minLength={8}
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  id="cpassword"
                  name="cpassword"
                  value={signCred.cpassword}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-black"
                  placeholder="Confirm Password"
                  required
                  minLength={8}
                />
              </div>
              { lodingState && <Loader/>}
              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full bg-gray-800 text-white font-semibold py-2 rounded-lg hover:ring focus:outline-none"
                >
                  Sign Up
                </button>
              </div>
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-500 hover:underline">
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      );
}
