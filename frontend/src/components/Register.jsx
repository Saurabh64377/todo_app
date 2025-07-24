import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast } from "react-toastify";
const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate()

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));

  };

  // Validation function
  const validate = () => {
    const newErrors = {};

    if (!userData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!userData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(userData.email)) {
      newErrors.email = "Email format is invalid";
    }

    if (!userData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (userData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
     setErrors(newErrors)
     return  Object.keys(newErrors).length > 0
  };

  // Handle form submit
   const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      return;
    }

    try {
      const res = await axios.post('http://localhost:8000/api/register', userData);

      if (res.data.success) {
        toast.success(res.data.message);
         setUserData({ name: '', email: '', password: '' });
        navigate('/login');
      } 
    } catch (error) {
      const errMessage =
        error?.response?.data?.message || 'Something went wrong during registration.';
      toast.error(errMessage);
    }
   
  };

  return (
    <div className="row m-5  d-flex align-items-center justify-content-center">
     <div style={{borderRadius:'10px'}} className="col-12 col-sm-6 bg-secondary-subtle p-5 ">

       <h2 className="text-center mb-3">Register User</h2>
      <form onSubmit={handleSubmit}>
        {/* Name field */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            name="name"
            value={userData.name}
            onChange={handleChange}
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            id="name"
            autoComplete="off"
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        {/* Email field */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            name="email"
            value={userData.email}
            onChange={handleChange}
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            id="email"
            autoComplete="off"
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        {/* Password field */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            name="password"
            value={userData.password}
            onChange={handleChange}
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            id="password"
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        {/* Submit button */}
        <div className="text-center"><button type="submit" className="btn btn-sm btn-outline-danger">
          Register User
        </button><Link to={'/login'} className='text-danger nav-link'>Already have an account</Link></div>
      </form>
     </div>
    </div>
  );
};

export default Register;
