import React from 'react';
import Lottie from 'lottie-react';
import AnimationNotFound from './assets/AnimationNotFound.json'
function NotFound() {
  return (
    <div className='hero flex-1-1-auto flex-col justify-center '>
      <div className="m-2 my-20 text-center hero-content flex justify-center items-center">
        <div className="max-w-lg">
       <Lottie   animationData = {AnimationNotFound}/>
        </div>
      </div>
    </div>
  )
}

export default NotFound