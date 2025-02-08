import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../Storage/Authslice";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogin = () => {
    if (username && password) {
      // Mock login credentials
      if (username === "testuser" && password === "password123") {
        const userData = {
          user_id: 1, // Mock user ID
          username: username,
        };

        dispatch(login(userData)); // Pass user ID and username to Redux
        navigate("/"); // Redirect to home page
      } else {
        alert("Invalid credentials");
      }
    }
  };

  return (
   <div className="container mx-auto"> 
    <Navbar></Navbar>
     <div className="p-4 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-6">
        <h2 className="text-2xl font-bold ">Login</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="border px-2 py-1 rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border px-2 py-1 rounded ml-2"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
        >
          Login
        </button>
      </div>
    </div>
   </div>
  );
};

export default Login;
