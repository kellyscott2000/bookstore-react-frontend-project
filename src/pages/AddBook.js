import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";


const AddBook = ({ Toggle }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

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
      const response =  {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      };
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  const handleSubmit = () => {
    const url = "https://localhost:7054/api/Book";
    const data = {
      name: name,
      category: category,
      price: price,
      description: description,
      image: image,
    };
    axios.post(url, data).then((result) => {
      window.location.href = '/book'
      
    }).catch((error) => {
      toast.error(error)
    })
  };

  return (
    <div className="px-3">
      <Navbar Toggle={Toggle} />
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-10 p-1">
          
            <div className="border p-3 rounded border-white py-4">
              <h4 className="text-white">Add New Book</h4>
              <form className="mt-4">
                <div className="form-group">
                  <div className=" mb-3">
                    <label className="mb-2 fs-4">Book Title</label>
                    <input
                      value={name}
                      type="text"
                      className="form-control"
                      placeholder="Enter book title"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className=" mb-3">
                    <label className="mb-2 fs-4">Category</label>
                    <input
                      placeholder="Enter book category"
                      value={category}
                      type="text"
                      className="form-control"
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </div>

                  <div className=" mb-3">
                    <label className="mb-2 fs-4">Description</label>
                    <textarea
                      placeholder="Enter book description"
                      value={description}
                      className="form-control"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <div className="row">
                      <div className="col-md-6">
                        <label className="mb-2 fs-4">Price</label>
                        <input
                          placeholder="Enter price"
                          value={price}
                          type="text"
                          className="form-control"
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="mb-2 fs-5">Image</label>
                        <input
                          type="text"
                          className="form-control"
                          value={image}
                          onChange={(e) => setImage(e.target.value)}
                          placeholder="Enter image url"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleSubmit()}
                  type="submit"
                  className="btn w-50 d-block mx-auto btn-primary mt-3"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
