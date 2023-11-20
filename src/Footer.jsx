import React from 'react'
import { FiCodepen } from "react-icons/fi";
const Footer = () => {
  return (
    <React.Fragment>
    
        <footer className=  "h-24 w-full fixed bottom-0 footer p-10 bg-gray-700 text-primary-content footer-center ">

            <div className='flex justify-center text-center text-white  '>
              <div className='h-20 w-20 -py-5' >
              <FiCodepen className='h-10 w-20' />
              </div>
                <p></p> Copyright © 2023 All rights reserved
            </div>

        </footer>
    </React.Fragment>
  );
}

export default Footer