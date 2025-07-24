import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HashRouter, Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
const EditTodo = () => {
  const [todoData, setTodoData] = useState({
    title: '',
    description: ''
  });
   
  const {id} = useParams()

  useEffect(()=>{

    const fetchTodo = async()=>{
      try {

        const res = await axios.get(`http://localhost:8000/todo/findtodo/${id}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })

       if(res.data.success){
        const {title , description} = res.data.todo
         setTodoData({
          title,
          description
         })

       }
        
      } catch (error) {
        const errMessage =
      error?.response?.data?.message || 'Something went wrong while fetching the todo.';
    toast.error(errMessage);
        
      }
    }

    fetchTodo()

  },[id])

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodoData((prev) => ({ ...prev, [name]: value }));
  };

  // Validation function
  const validate = () => {
    const newErrors = {};

    if (!todoData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (todoData.title.length < 6) {
      newErrors.title = "Title must be at least 6 characters";
    }

    
    const plainText = todoData.description.trim();

    if (!plainText) {
      newErrors.description = "Description is required";
    } else if (plainText.length < 15) {
      newErrors.description = "Description must be at least 15 characters";
    }

    setErrors(newErrors);
     return {
      hasErrors: Object.keys(newErrors).length > 0,
      plainText,
    };
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
   const {hasErrors} = validate();
  if (hasErrors) return;

  try {
    const res = await axios.put(
      `http://localhost:8000/todo/edittodo/${id}`,
      todoData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    if (res.data.success) {
      toast.success(res.data.message || "Todo Edit successfully!");
      setTodoData({ title: '', description: '' });
      navigate('/');
    }

    
  } catch (error) {
    const errMessage =
      error?.response?.data?.message || 'Something went wrong while editing the todo.';
    toast.error(errMessage);
  }
};


  return (
    <div className="row m-5 d-flex align-items-center justify-content-center">
      <div style={{ borderRadius: '10px' }} className="col-12 col-sm-6 bg-secondary-subtle p-5">
        <h2 className="text-center mb-3">Edit Todo</h2>
        <form onSubmit={handleSubmit}>

          {/* Title Field */}
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              name="title"
              value={todoData.title}
              onChange={handleChange}
              type="text"
              className={`form-control ${errors.title ? 'is-invalid' : ''}`}
              id="title"
              autoComplete="off"
            />
            <div style={{textAlign:'right'}} className="form-text ">At least 6 char !</div>
            {errors.title && <div className="invalid-feedback">{errors.title}</div>}
          </div>

          {/* Description Field */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <ReactQuill
             value={todoData.description}
             className={errors.description ? 'is-invalid':''}
             onChange={(value) => setTodoData((prev) => ({ ...prev, description: value }))}
             theme='snow'
            />
            <div style={{textAlign:'right'}} className="form-text ">At least 15 char !</div>
            {errors.description && <div className="invalid-feedback">{errors.description}</div>}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button type="submit" className="btn btn-sm btn-outline-danger">
              Edit Todo
            </button>
     
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditTodo;
