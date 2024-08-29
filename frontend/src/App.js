import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Audio } from 'react-loader-spinner';
import Home from './pages/home/Home';
import Login from './pages/auth-container/Login';

function App() {
  const token = localStorage.getItem('token');
  const loader = useSelector((state) => state.loader.loader);

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {loader ?
        <div className='loader-container'>
          <Audio
            color="blue"
            height={110}
            width={110}
            ariaLabel="three-circles-rotating"
          />
        </div>
        :
        <div></div>
      }
      {!token ?
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        :
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
      }
    </div>
  );
}

export default App;
