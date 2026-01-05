import React from 'react';
import Lottie from 'lottie-react';
import AnimationNotFound from './assets/AnimationNotFound.json'
function NotFound() {
  return (
    <div className='pt-24 pb-24 flex flex-col items-center justify-center'>
      <div className="m-2 text-center flex justify-center items-center">
        <div className="max-w-xs sm:max-w-md md:max-w-lg w-full">
       <Lottie   animationData = {AnimationNotFound}/>
          <p className="mt-4 text-lg font-semibold text-slate-900">
            Oops! We couldn&apos;t find that page or profile.
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Please check the URL or go back to the home page to search again.
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotFound