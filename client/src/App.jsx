import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import EmailVerify from './pages/EmailVerify';
import { ToastContainer } from 'react-toastify';
import HelloWorld from './pages/HelloWorld';
import RefreshHandler from './RefreshHandler';
import { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to='/home' />;
  };
  return (
    <>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/helloworld'
          element={<PrivateRoute element={<HelloWorld />} />}
        />
        <Route path='/email-verify' element={<EmailVerify />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
