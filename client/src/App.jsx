import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import EmailVerify from './pages/EmailVerify';
import { ToastContainer } from 'react-toastify';
import HelloWorld from './pages/HelloWorld';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/helloworld' element={<HelloWorld />} />
        <Route path='/users/:id/verify/:token' element={<EmailVerify />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
