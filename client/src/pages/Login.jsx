import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '@/utils';
import { LuEye, LuEyeClosed } from 'react-icons/lu';

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      handleError('All fields are required');
      return;
    }
    try {
      const url = 'http://localhost:3000/auth/login';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);
        setTimeout(() => {
          navigate('/helloworld');
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

  const [Password, setPassword] = useState(false);

  return (
    <div className='flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 to-indigo-700'>
      <div className='bg-white p-10 rounded-lg shadow-2xl w-full max-w-lg'>
        <h2 className='text-3xl font-bold text-center text-gray-800 mb-6'>
          Login to Your Account
        </h2>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              type='email'
              placeholder='Enter Email...'
              value={loginInfo.email}
              name='email'
              autoFocus
              onChange={handleChange}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Password
            </label>
            <div className='relative'>
              <input
                onChange={handleChange}
                type={Password ? 'text' : 'password'}
                autoFocus
                name='password'
                placeholder='Enter Password...'
                value={loginInfo.password}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none pr-10'
              />
              <div
                className='absolute inset-y-0 right-3 flex items-center cursor-pointer'
                onClick={() => setPassword(!Password)}
              >
                {Password ? (
                  <LuEye className='h-6 w-6 text-gray-500' />
                ) : (
                  <LuEyeClosed className='h-6 w-6 text-gray-500' />
                )}
              </div>
            </div>
          </div>
          <button
            type='submit'
            className='w-full py-3 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500'
          >
            Login
          </button>
          <span className='block text-center text-sm text-gray-800'>
            New User?{' '}
            <Link to='/login' className='text-blue-500 underline'>
              Sign Up
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
