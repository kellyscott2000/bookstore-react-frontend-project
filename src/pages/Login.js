import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    console.log("Data sent to server:", data);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = "https://localhost:7054/api/Test/Login";

    try {
      const response = await axios.post(url, data, config);
      console.log("Response from server:", response.data);

      const token = response.data.Token;
      localStorage.setItem("token", token);
      alert("Login successful!");
      window.location.href = '/dashboard'
      
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid Credentials");
    }
  };

  return (
        <div className="container">
          <div className="row justify-content-center align-items-center min-vh-100">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title text-center">Login</h2>
                  {/* <form> */}
                  <div className="mb-3">
                    <label  className="form-label">
                      Username
                    </label>
                    <input
                      required
                      type="text"
                      className="form-control"
                      value={username}
                      placeholder="Enter username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label  className="form-label">
                      Password
                    </label>
                    <input
                      required
                      type="password"
                      className="form-control"
                      value={password}
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="d-grid gap-2">
                    <button
                      onClick={handleLogin}
                      // type="submit"
                      className="btn btn-primary"
                    >
                      Login
                    </button>
                  </div>
                  {/* </form> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Login;
