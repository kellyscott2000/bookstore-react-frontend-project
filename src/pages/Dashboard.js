import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function Dashboard({ Toggle }) {
  const [data, setData] = useState([]);


  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href="/"
    } else {
      getData();
    }
  }, []);
  const getData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://localhost:7054/api/Book", {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="px-3 ">
      <Navbar Toggle={Toggle} />
      <div className="container-fluid">
        <div className="row g-3 my-2">
          <div className="col-md-3 p-1">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div>
                <h3 className="fs-2">{data.length}</h3>
                <p className="fs-5">Available Book(s)</p>
              </div>
              <i className="bi bi-book p-3 fs-1"></i>
            </div>
          </div>
        </div>
      </div>
      <table className="table caption-top bg-white rounded mt-2">
        <caption className="text-white fs-4">Available books</caption>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Category</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((book, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{book.name}</td>
              <td>{book.category}</td>
              <td>{book.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
