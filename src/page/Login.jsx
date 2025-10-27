import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const {backendUrl,setToken}=useContext(AppContext)

  const [state, setState] = useState("register");

  const navigate=useNavigate()

  

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
     if(state=="register"){
         const { data } = await axios.post(backendUrl + "/api/user/register", {
        name,
        email,
        password,
      });
      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);

      } else {
        console.error(data.message);
      }
     }else{
        const {data}= await axios.post(backendUrl+"/api/user/login",{
            email,
            password
        });

         if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        navigate('/')

      } else {
        console.error(data.message);
      }



     }
    } catch (error) {
      console.log(error);
    }
  };

  return (
   <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 rounded-3xl">
  <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
    {state === "register" ? (
      <form onSubmit={submitHandler} type="submit" className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Register</h2>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg cursor-pointer transition-all"
        />

        <p className="text-sm text-gray-600 text-center mt-2">
          Already have an account?
          <button
            onClick={() => setState("login")}
            className="text-blue-600 hover:underline ml-1"
            type="button"
          >
            Login
          </button>
        </p>
      </form>
    ) : (
      <form onSubmit={submitHandler} className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Login</h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg cursor-pointer transition-all"
        />

        <p className="text-sm text-gray-600 text-center mt-2">
          Don’t have an account?
          <button
            onClick={() => setState("register")}
            className="text-blue-600 hover:underline ml-1"
            type="button"
          >
            Register here
          </button>
        </p>
      </form>
    )}
  </div>
</div>

  );
};

export default Login;
