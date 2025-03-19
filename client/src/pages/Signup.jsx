import { handleError, handleSuccess } from '@/utils';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [signupInfo, setSignUpInfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpInfo({ ...signupInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      handleError('All fields are required');
      return;
    }
    try {
      const url = 'http://localhost:3000/auth/signup';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);

        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else if (error) {
        const details = error?.details[0]?.message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gradient-to-r from-green-400 to-green-600'>
      <div className='bg-white p-10 rounded-lg shadow-2xl w-full max-w-lg'>
        <h2 className='text-3xl font-bold text-center text-gray-800 mb-6'>
          Create an Account
        </h2>
        <form className='space-y-6' onSubmit={handleSubmit}>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Name
            </label>
            <input
              onChange={handleChange}
              autoFocus
              name='name'
              placeholder='Enter Name...'
              value={signupInfo.name}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              onChange={handleChange}
              type='email'
              autoFocus
              name='email'
              placeholder='Enter Email...'
              value={signupInfo.email}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Password
            </label>
            <input
              onChange={handleChange}
              type='password'
              autoFocus
              name='password'
              placeholder='Enter Password...'
              value={signupInfo.password}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none'
            />
          </div>
          <button
            type='submit'
            className='w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500'
          >
            Sign Up
          </button>
          <span className='block text-center text-sm text-gray-800'>
            Already have an account?{' '}
            <Link to='/login' className='text-blue-500 underline'>
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Signup;
