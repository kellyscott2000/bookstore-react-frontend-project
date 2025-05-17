import React, { useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import Book from "./pages/Book";
import Dashboard from "./pages/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./components/Sidebar";
import "bootstrap-icons/font/bootstrap-icons.css";
import Register from "./pages/Register";
import AddBook from "./pages/AddBook";

function NavbarWrapper({ children, Toggle }) {
  const location = useLocation();
  const hiddenNavbarPaths = ["/", "/register"];
  const shouldShowNavbar = !hiddenNavbarPaths.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Sidebar Toggle={Toggle} />}
      {children}
    </>
  );
}

function App() {
  const [toggle, setToggle] = useState(true);
  const Toggle = () => {
    setToggle(!toggle);
  };

  return (
    <Router>
      <div className="container-fluid bg-secondary min-vh-100">
        <div className="row">
          {toggle && (
            <div className="col-4 col-md-2 bg-white vh-100 px-0 position-fixed">
              <NavbarWrapper Toggle={Toggle} />
            </div>
          )}
          {toggle && <div className="col-4 col-md-2"></div>}
          <div className="col p-0">
            <Routes>
              <Route path="/" element={<Login Toggle={Toggle} />} />
              <Route path="/book" element={<Book Toggle={Toggle} />} />
              <Route path="/register" element={<Register Toggle={Toggle} />} />
              <Route path="/addBook" element={<AddBook Toggle={Toggle} />} />
              <Route
                path="/dashboard"
                element={<Dashboard Toggle={Toggle} />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
