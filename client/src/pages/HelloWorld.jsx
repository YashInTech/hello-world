import { handleError, handleSuccess } from '../utils'; // Corrected import path
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import blank from '../assets/blank.png';
import { BiLoaderAlt } from 'react-icons/bi'; // Importing the loading icon

function HelloWorld() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [hello, setHello] = useState('');
  const [profileImage, setProfileImage] = useState({ myFile: '' }); // Initialize the profileImage state
  const [loadingImage, setLoadingImage] = useState(false); // State to track image loading
  const navigate = useNavigate();

  // Function to fetch the image
  const fetchImage = async () => {
    setLoadingImage(true); // Start loading image
    try {
      const response = await fetch('http://localhost:3000/images');
      const data = await response.json();
      if (data.length > 0) {
        setProfileImage({ myFile: data[0].myFile }); // Assuming we want the first image
      }
    } catch (error) {
      console.error('Error fetching image:', error);
    } finally {
      setLoadingImage(false); // End loading image
    }
  };

  useEffect(() => {
    fetchImage(); // Fetch the image when the component mounts
  }, []);

  // Function to create profile by uploading image
  const createProfile = async (newImage) => {
    try {
      const url = 'http://localhost:3000/upload';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the content type as JSON
        },
        body: JSON.stringify({ myFile: newImage }), // Send the Base64 encoded image as JSON
      });

      if (response.ok) {
        console.log('Image uploaded successfully!');
        fetchImage(); // Fetch the updated image after upload
      } else {
        console.log('Image upload failed!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logged Out!');
    setTimeout(() => {
      navigate('/'); // Redirect to home page
    }, 1000);
  };

  // Handle form submission for uploading image
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (profileImage.myFile) {
      createProfile(profileImage.myFile); // Passing the Base64 string to upload
      console.log('Image Uploaded!');
    } else {
      console.log('No image selected!');
    }
  };

  // Handle file upload and convert to base64
  const handleFileUpload = async (e) => {
    const file = e.target.files[0]; // Get the first file
    const base64 = await convertToBase64(file); // Convert the file to Base64
    setProfileImage({ ...profileImage, myFile: base64 }); // Store the Base64 string in the state
  };

  // Fetch hello message from the server
  const fetchHelloWorld = async () => {
    try {
      const url = 'http://localhost:3000/helloworld';
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
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

      <form onSubmit={handleSubmit} className='mt-6'>
        <div className='flex flex-col items-center mb-6'>
          <label htmlFor='file-upload' className='cursor-pointer mb-4'>
            {/* Image container with transparent background and gradient when loading */}
            <div
              className={`relative w-32 h-32 rounded-full border-4 border-white ${
                loadingImage
                  ? 'bg-gradient-to-r from-blue-400 to-blue-600'
                  : 'bg-transparent'
              } overflow-hidden`}
            >
              {loadingImage ? (
                <div className='absolute inset-0 flex justify-center items-center'>
                  <BiLoaderAlt className='animate-spin text-white' size={30} />
                </div>
              ) : null}
              {/* Display the image or fallback */}
              <img
                src={profileImage.myFile || blank}
                alt='profile'
                className='w-full h-full object-cover' // Make the image cover the full container
              />
            </div>
          </label>
          <input
            type='file'
            name='myFile'
            id='file-upload'
            accept='.jpeg, .png, .jpg'
            className='hidden'
            onChange={(e) => handleFileUpload(e)} // Handle file change
          />
        </div>

        <div className='flex justify-center'>
          <button
            type='submit'
            className='px-6 py-2 text-lg font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-200'
          >
            Submit
          </button>
        </div>
      </form>

      <button
        onClick={handleLogout}
        className='px-6 py-2 text-lg font-semibold text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700 transition duration-200 mt-8'
      >
        Logout
      </button>
    </div>
  );
}

export default HelloWorld;

// Function to convert file to base64
function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file); // Convert the file to base64
    fileReader.onload = () => {
      resolve(fileReader.result); // Resolve with the base64 string
    };
    fileReader.onerror = (error) => {
      reject(error); // Reject on error
    };
  });
}
