import React, { Suspense, lazy } from 'react'
import HomeCompo from './HomeCompo';
import { ToastContainer } from 'react-toastify';

const Main = lazy(() => import('./HomeCompo.js'))

export default function LazyLoading({ value }) {
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
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
        {/* <HomeCompo /> */}
        <Main data={value} />
      </Suspense>
    </div>
  )
}
