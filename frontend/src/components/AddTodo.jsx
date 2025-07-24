import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const AddTodo = () => {
  const [todoData, setTodoData] = useState({
    title: '',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Handle input change for title
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

    // if we want to send plain text then we can send plain text like this
   // const plainText = todoData.description.replace(/<[^>]+>/g, '').trim();
   
    const plainText = todoData.description.trim()

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

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { hasErrors, plainText} = validate();
    if (hasErrors) return;

    try {
      const res = await axios.post(
        'http://localhost:8000/todo/addtodo',
        // {
        //   ...todoData ,
        //   description: plainText, 
        // },
        todoData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Todo added successfully!");
        setTodoData({ title: '', description: '' });
        navigate('/');
      }
    } catch (error) {
      const errMessage =
        error?.response?.data?.message || 'Something went wrong while adding the todo.';
      toast.error(errMessage);
    }
  };

  return (
    <div className="row m-5 d-flex align-items-center justify-content-center">
      <div style={{ borderRadius: '10px' }} className="col-12 col-sm-6 bg-secondary-subtle p-5">
        <h2 className="text-center mb-3">Add Todo</h2>
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
            <div style={{ textAlign: 'right' }} className="form-text">At least 6 char!</div>
            {errors.title && <div className="invalid-feedback">{errors.title}</div>}
          </div>

          {/* Description Field */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <ReactQuill
              value={todoData.description}
              onChange={(value) => setTodoData((prev) => ({ ...prev, description: value }))}
              theme="snow"
              className={errors.description ? 'is-invalid' : ''}
            />
            <div style={{ textAlign: 'right' }} className="form-text">At least 15 char!</div>
            {errors.description && (
              <div className="invalid-feedback d-block">{errors.description}</div>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button type="submit" className="btn btn-sm btn-outline-danger">
              Add Todo
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddTodo;
