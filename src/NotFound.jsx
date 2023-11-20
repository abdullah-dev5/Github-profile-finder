import React from 'react';
function NotFound() {
  return (
    <div className='hero flex-1-1-auto flex-col justify-center '>
      <div className="m-2 my-20 text-center hero-content flex justify-center items-center">
        <div className="max-w-lg">
        <h1 className="text-8xl font-bold mb-8">
          Oops!
        </h1>
        <p className="text-5xl mb-8">
          404 - Page not found!
        </p>
        </div>
      </div>
    </div>
  )
}

export default NotFound