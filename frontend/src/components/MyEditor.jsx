import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const MyEditor = () => {
  const [value, setValue] = useState('');

  return (
    <div className="container mt-3">
      <h3>React Quill Editor</h3>
      <ReactQuill value={value} onChange={setValue} theme="snow" />
    </div>
  );
};

export default MyEditor;
