import axios from "axios";
import React, { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (value) => {
    setName(value);
  };
  const handleEmailChange = (value) => {
    setEmail(value);
  };
  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleSubmit = () => {
    const data = {
      Username: name,
      Email: email,
      Password: password,
    };
    const url = "https://localhost:7054/api/Test/Registration";
    axios
      .post(url, data)
      .then((result) => {
        console.log("Response:", result.data);
        alert(result.data);
        window.location.href = '/'
        
      })
      .catch((error) => {
      
        if (error.response) {
          console.log("Server response data:", error.response.data);
          if (error.response.data === "Username is already in use") {
            alert("Username is already in use. Please choose a different username.");
          }
        } else {
          alert("An error occurred: " + error.message);
        }
      });
  };

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center">
      <div className="col-md-6 mt-5">
        <h2 className="fs-3 text-light">Sign Up</h2>
        
          <div className="form-group">
            <label htmlFor="username" className="fs-5">
              Username
            </label>
            <input
              type="text"
              className="form-control "
              id="username"
              
              onChange={(e) => handleNameChange(e.target.value)}
              required
              // style={{ width: "50%" }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="fs-5">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              
              onChange={(e) => handleEmailChange(e.target.value)}
              required
              // style={{ width: "50%" }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="fs-5">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              
              onChange={(e) => handlePasswordChange(e.target.value)}
              required
              // style={{ width: "50%" }}
            />
          </div>
          <button
            type="submit"
            onClick={() => handleSubmit()}
            className="btn btn-primary mt-4"
          >
            Sign Up
          </button>
        
      </div>
    </div>
  );
};

export default Register;
