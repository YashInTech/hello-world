import { handleError, handleSuccess } from '@/utils';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HelloWorld() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [hello, setHello] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logged Out!');
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  const fetchHelloWorld = async () => {
    try {
      const url = 'http://localhost:3000/helloworld';
      const headers = {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      console.log(result);
      setHello(result.message);
    } catch (err) {
      handleError(err);
    }
  };
  useEffect(() => {
    fetchHelloWorld();
  }, []);

  return (
    <div className='flex flex-col justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-blue-600'>
      <h1 className='text-5xl font-extrabold text-white drop-shadow-lg mb-4'>
        Welcome! {loggedInUser}
      </h1>
      <h2 className='text-3xl font-semibold text-white'>
        {hello ? hello : 'Loading message...'}
      </h2>

      <button
        onClick={handleLogout}
        className='px-6 py-2 text-lg font-semibold text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700 transition duration-200 mt-8' // Added mt-4 for margin-top
      >
        Logout
      </button>
    </div>
  );
}

export default HelloWorld;
