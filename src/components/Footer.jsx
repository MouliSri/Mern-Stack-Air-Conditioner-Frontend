import React from 'react';
import {BsInstagram ,BsFacebook ,BsTwitter ,BsLinkedin } from "react-icons/bs"
import {LuMailbox} from "react-icons/lu"
import {BiPhoneCall} from "react-icons/bi"


const Footer = () => {
  return (
    <footer id="contact" className="  bg-gray-900 text-white py-6 mt-auto  font-serif">
      <div className="container mx-auto text-center grid  sm:grid-cols-2 md:grid-cols-3  grid-cols-1 gap-6">
        
       

        <div className=" space-x-4   text-2xl my-5">

          <h2 className='text-lg font-[Agbalumo] mb-4 '>Social Links</h2>

          <div className=' flex flex-row justify-center items-center gap-5 pt-3'>
          <a href="https://instagram.com" className="text-white rounded-md  hover:text-indigo-800  " >
            <BsInstagram />
          </a>
          <a href="https://facebook.com" className="text-white rounded-md hover:text-blue-900">
           <BsFacebook />
          </a>
          <a href="https://twitter.com " className="text-white rounded-md hover:text-blue-600">
            <BsTwitter />
          </a>
          <a href="https://linkedin.com" className="text-white rounded-md hover:text-light-blue-900">
           <BsLinkedin />
          </a>
          </div>
        </div>

        <div className='text-center my-5'>
        <h2 className='text-lg font-[Agbalumo] mb-4 '>Address</h2>
     
        <p>&copy; 2023 Air Conditioners</p>
        <p>Iduvai , Tirupur 
          <br/>
         Tamilnadu , 641 687</p>
       
        </div>

        <div  className='my-5'>

        <h2 className='text-lg font-[Agbalumo] mb-4 '>Contact</h2>

       <div className=' flex  gap-5  justify-center items-center '>
        <LuMailbox  className='text-2xl'/>
        <h1 className=' font-serif'>Email » <span className='font-normal'><a href="mailto:mouli@gmail.com"> mouli@gmail.com </a> </span></h1>            
      </div>
       <div className='flex  gap-5 justify-center items-center mt-2 '>
        <BiPhoneCall  className='text-2xl'/>
        <h1>Mobile » <span> 7825010293 </span></h1>
        </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
