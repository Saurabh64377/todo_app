import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';


const Allusers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTodo = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:8000/api/alluser');
     
      setUsers(res.data.users);
    } catch (error) {
      const err = error?.response?.data?.message || 'Something went wrong!';
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 fw-bold">👨‍🎓All Users</h1>

      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status">
        
          </div>
         
        </div>
      ) : users && users.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-hover table-striped ">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className='text-capitalize'>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-success text-center fs-5">
          No users Found
        </div>
      )}
    </div>
  );
};

export default Allusers;
