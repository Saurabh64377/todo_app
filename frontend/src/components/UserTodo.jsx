import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import DomPurify from 'dompurify'

const UserTodo = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate()
  const fetchTodo = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:8000/todo/usertodo', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setTodos(res.data.usersTodo || []);
    } catch (error) {
      const err = error?.response?.data?.message || 'Something went wrong!';
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8000/todo/deletetodo/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setTodos((prev) => prev.filter((todo) => todo._id !== id));
      }
    } catch (error) {
      const err = error?.response?.data?.message || 'Something went wrong!';
      toast.error(err);
    }
  };

  const handleEdit= (id)=>{
      navigate(`/edittodo/${id}`)
   
  }

  useEffect(() => {
    fetchTodo();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 fw-bold">📋 User Todos</h1>
      <Link to={'/addtodo'}>
        <button className='btn btn-outline-danger mb-2'>User Todo+</button>
      </Link>

      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : todos && todos.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-hover table-striped align-middle">
            <thead className="table-dark">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <tr key={todo._id}>
                  <td style={{textTransform:'capitalize'}}>{todo.title}</td>
                  <td style={{textTransform:'capitalize'}}><div
                      
                      dangerouslySetInnerHTML={{
                        __html: DomPurify.sanitize(todo.description),
                      }}
                    /></td>
                  <td onClick={()=>handleEdit(todo._id)} className='text-success'><CiEdit size={25} /></td>
                  <td onClick={() => handleDelete(todo._id)} className='text-danger'>
                    <MdDeleteForever size={25} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-success text-center fs-5">
          🚫 User Had Not Any TODO
        </div>
      )}
    </div>
  );
};

export default UserTodo;
