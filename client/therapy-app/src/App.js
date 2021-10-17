import React from 'react';
import './App.css';
import UploadVideo from './components/UploadVideo';

function App() {
  return (
    <div className="container">
      <h4 className='display-4 text-center mb-4'>
        Emotify
      </h4>

      <UploadVideo />
      
    </div>
  );
}

export default App;
