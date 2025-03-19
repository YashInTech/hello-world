import React, { useState, useEffect, Fragment } from 'react';
import verified from '@/assets/verified.png';
import { Link, useParams } from 'react-router-dom';

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(false);
  const { id, token } = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `http://localhost:3000/users/${id}/verify/${token}`;

        const response = await fetch(url);

        if (response.ok) {
          setValidUrl(true);
        } else {
          setValidUrl(false);
        }
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };

    verifyEmailUrl();
  }, [id, token]);

  return (
    <Fragment>
      {validUrl ? (
        <div>
          <img src={verified} alt='verified' />
          <h1>Successfully!</h1>
          <Link to='/login'>
            <button className='bg-blue-500 text-white px-4 py-2 rounded'>
              Go to Login
            </button>
          </Link>
        </div>
      ) : (
        <h1>
          Invalid or expired link. Please request a new verification email.
        </h1>
      )}
    </Fragment>
  );
};

export default EmailVerify;
