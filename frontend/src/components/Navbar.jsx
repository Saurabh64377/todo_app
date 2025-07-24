import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { dataProvider } from '../context/ContextProvider';


const Navbar = () => {
  const { isloggedin, setIsLoggedin ,setUserName,userName} = useContext(dataProvider);

  const handleLogout = () => {
    // localStorage.removeItem('token');
    localStorage.clear()
    setIsLoggedin(false);
    setUserName('')
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
      <div className="container-fluid px-4">
        <Link className="navbar-brand fw-bold " >
          TODOS
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Left Links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {isloggedin && (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `nav-link fw-semibold ${isActive ? 'active text-danger' : ''}`
                    }
                  >
                    All Todos
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/allusers"
                    className={({ isActive }) =>
                      `nav-link fw-semibold ${isActive ? 'active text-danger' : ''}`
                    }
                  >
                    All Users
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/usertodo"
                    className={({ isActive }) =>
                      `nav-link fw-semibold ${isActive ? 'active text-danger' : ''}`
                    }
                  >
                    User Todos
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          

          {/* Auth Buttons */}
          <ul className="navbar-nav mb-2 mb-lg-0">
            {!isloggedin ? (
              <>
                <li className="nav-item">
                  <Link to="/login" className="btn btn-sm btn-outline-success ">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="btn btn-sm btn-outline-primary my-1 my-lg-0 mx-lg-1">
                    Register
                  </Link>
                </li>
              </>
            ) : (
             <>
              <li className="nav-item">
                <button
                  
                  className="btn btn-sm text-bg-success text-capitalize"
                >
                  {userName}
                </button>
              </li>
               <li className="nav-item">
                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-outline-danger my-1 my-lg-0 mx-lg-1"
                >
                  Logout
                </button>
              </li>
             </>
              
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
