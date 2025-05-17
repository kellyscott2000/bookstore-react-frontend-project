/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import pic1 from "../book.jpg";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Book = ({ Toggle }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [newId, setnewId] = useState("");
  const [newName, setnewName] = useState("");
  const [newCategory, setnewCategory] = useState("");
  const [newPrice, setnewPrice] = useState("");
  const [newDescription, setnewDescription] = useState("");
  const [newImage, setnewImage] = useState("");
  const [viewMode, setViewMode] = useState(false);

  const bookData = [
    {
      id: 3,
      name: "Battle on buka street",
      category: "Literature",
      price: 30,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: 3,
      name: "Battle on buka street",
      category: "Literature",
      price: 30,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: 3,
      name: "Battle on buka street",
      category: "Literature",
      price: 30,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ];
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

  const handleEdit = (id) => {
    handleShow();
    axios
      .get(`https://localhost:7054/api/Book/${id}`)
      .then((result) => {
        setnewName(result.data.name);
        setnewCategory(result.data.category);
        setnewDescription(result.data.description);
        setnewPrice(result.data.price);
        setnewImage(result.data.image);
        setnewId(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDelete = (id) => {
    if (window.confirm("Do you want to delete this book record?") === true) {
      axios
        .delete(`https://localhost:7054/api/Book/${id}`)
        .then((result) => {
          if (result.status === 200) {
            getData();
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };
  const handleView = (id) => {
    handleShow();
    axios
      .get(`https://localhost:7054/api/Book/${id}`)
      .then((result) => {
        setnewName(result.data.name);
        setnewCategory(result.data.category);
        setnewDescription(result.data.description);
        setnewPrice(result.data.price);
        setnewImage(result.data.image);
        setnewId(id);
      })
      .catch((error) => {
        console.log(error);
      });
    setViewMode(true);
  };

  const handleUpdate = () => {
    const url = `https://localhost:7054/api/Book/${newId}`;
    const data = {
      id: newId,
      name: newName,
      category: newCategory,
      price: newPrice,
      description: newDescription,
      image: newImage,
    };
    axios
      .put(url, data)
      .then((result) => {
        getData();
        clear();
        handleClose();
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  const clear = () => {
    setnewCategory("");
    setnewDescription("");
    setnewImage("");
    setnewName("");
    setnewPrice("");
  };

  return (
    <div className="px-3">
      <Navbar Toggle={Toggle} />
      <div className="container-fluid">
        <Link to="/addBook">
          <button className="bg-primary rounded text-white border-0">
            Add Book
          </button>
        </Link>
        <div className="row g-3 my-2">
          {data && data.length > 0
            ? data.map((item, index) => {
                return (
                  <div className="col-md-3 p-1" key={index}>
                    <div className="p-3 bg-white h-100 shadow-sm d-block justify-content-around align-items-center rounded">
                      <div>
                        <h5 className="fs-5">{index + 1}</h5>
                        <img
                          src={item.image}
                          alt="book"
                          className="img-fluid"
                        />
                        <h5 className="fs-5">{item.name}</h5>
                        <p className="fs-7">{item.category}</p>
                        <p className="fs-7">GH₵{item.price}</p>
                      </div>
                      <div className="d-flex">
                        <button
                          className="border-0 p-0 bg-transparent"
                          onClick={() => handleEdit(item.id)}
                        >
                          <i
                            className="bi bi-pencil-square p-3 fs-1"
                            style={{ color: "blue", cursor: "pointer" }}
                          ></i>
                        </button>
                        <button
                          className="border-0 p-0 bg-transparent"
                          onClick={() => handleView(item.id)}
                        >
                          <i
                            className="bi bi-view-stacked p-3 fs-1"
                            style={{ color: "green", cursor: "pointer" }}
                          ></i>
                        </button>
                        <button
                          className="border-0 p-0 bg-transparent"
                          onClick={() => handleDelete(item.id)}
                        >
                          <i
                            className="bi bi-trash  p-3 fs-1"
                            style={{ color: "red", cursor: "pointer" }}
                          ></i>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            : "Loading.."}
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {viewMode ? "View Book Details" : "Edit Book Details"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="mt-4">
            <div className="form-group">
              <div className=" mb-3">
                <label className="mb-2 fs-4">Book Title</label>
                <input
                  disabled={viewMode}
                  defaultValue={newName}
                  type="text"
                  className="form-control"
                  placeholder="Enter book title"
                  onChange={(e) => setnewName(e.target.value)}
                />
              </div>

              <div className=" mb-3">
                <label className="mb-2 fs-4">Category</label>
                <input
                  disabled={viewMode}
                  placeholder="Enter book category"
                  value={newCategory}
                  type="text"
                  className="form-control"
                  onChange={(e) => setnewCategory(e.target.value)}
                />
              </div>

              <div className=" mb-3">
                <label className="mb-2 fs-4">Description</label>
                <textarea
                  disabled={viewMode}
                  placeholder="Enter book description"
                  value={newDescription}
                  className="form-control"
                  onChange={(e) => setnewDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <div className="row">
                  <div className="col-md-6">
                    <label className="mb-2 fs-4">Price</label>
                    <input
                      disabled={viewMode}
                      placeholder="Enter price"
                      value={newPrice}
                      type="text"
                      className="form-control"
                      onChange={(e) => setnewPrice(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="mb-2 fs-5">Image</label>
                    <input
                      disabled={viewMode}
                      type="text"
                      value={newImage}
                      className="form-control"
                      onChange={(e) => setnewImage(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {!viewMode && (
            <Button variant="primary" onClick={handleUpdate}>
              Save Changes
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Book;
