import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className='bg-blue-600 p-4 shadow-lg'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='text-white text-2xl font-semibold'>hello-world !</div>
        <div className='space-x-6'>
          <Link to='/' className='text-white font-medium hover:text-gray-300'>
            Home
          </Link>
          <Link
            to='/signup'
            className='text-white font-medium hover:text-gray-300'
          >
            Sign Up
          </Link>
          <Link
            to='/login'
            className='text-white font-medium hover:text-gray-300'
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
