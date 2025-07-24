import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import DomPurify from 'dompurify';
import ReactPaginate from 'react-paginate';
import './pagination.css';

const AllTodo = () => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  // Pagination State
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  // Calculate page-wise items
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredTodos.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredTodos.length / itemsPerPage);

  // For current page display
  const currentPage = Math.floor(itemOffset / itemsPerPage) + 1;

  useEffect(() => {
    fetchTodos();
  }, []);

  // Fetch all todos
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('http://localhost:8000/todo/alltodo', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const allTodo = data?.allTodo || [];
      setTodos(allTodo);
      setFilteredTodos(allTodo);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  // Search handler
  const handleSearch = () => {
    const trimmedQuery = query.trim().toLowerCase();
    if (!trimmedQuery) {
      toast.error('Please enter something to search.');
      return;
    }

    const results = todos.filter((todo) =>
      todo?.userId?.name?.toLowerCase().includes(trimmedQuery)
    );
    setFilteredTodos(results);
    setItemOffset(0); // Reset to first page
    setQuery('');
  };

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  // Pagination change handler
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredTodos.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 fw-bold">📋 All Todos</h1>

      {/* Top bar */}
      <div className="mb-3 d-flex align-items-center justify-content-between">
        <Link to="/addtodo">
          <button className="btn btn-outline-danger">Todo+</button>
        </Link>

        <div className="d-flex align-items-center">
          <div className="input-group">
            <input
              type="search"
              className="form-control"
              placeholder="Search by username..."
              aria-label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="input-group-text bg-white"
              onClick={handleSearch}
              style={{ cursor: 'pointer' }}
            >
              <FaSearch />
            </button>
          </div>
        </div>
      </div>

      {/* Table or Loader */}
      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : currentItems.length > 0 ? (
        <>
          <div className="table-responsive">
            <table className="table table-hover table-striped align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>User Name</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((todo) => (
                  <tr key={todo._id}>
                    <td style={{ textTransform: 'capitalize' }}>
                      {todo.title}
                    </td>
                    <td style={{ textTransform: 'capitalize' }}>
                      <div
                        className="quilll"
                        dangerouslySetInnerHTML={{
                          __html: DomPurify.sanitize(todo.description),
                        }}
                      />
                    </td>
                    <td style={{ textTransform: 'capitalize' }}>
                      {todo?.userId?.name || 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Info */}
          <div className="d-flex align-items-center justify-content-center">
            {/* <small className="text-muted">
              Page {currentPage} of {pageCount}
            </small> */}
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              previousLabel="<"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              containerClassName="pagination"
              activeClassName="active"
              previousClassName="page-prev"
              nextClassName="page-next"
              disabledClassName="disabled"
            />

          </div>
        </>
      ) : (
        <div className="alert alert-success text-center fs-5">
          🚫 No Todos Found
        </div>
      )}
    </div>
  );
};

export default AllTodo;
