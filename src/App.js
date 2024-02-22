import './App.css';
import HomeCompo from './Components/HomeCompo';
import { ToastContainer } from 'react-toastify';
import LazyLoading from './Components/LazyLoading';

function App() {
  return (
    <>
      <LazyLoading>

        <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />
      <HomeCompo />

      </LazyLoading>
    </>
  );
}

export default App;
