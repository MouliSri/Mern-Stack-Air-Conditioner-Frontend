import React, { useState } from 'react'

import { Link ,useNavigate} from 'react-router-dom'
import {CgMenuGridO}  from  'react-icons/cg'
import { CiBoxList , CiLogout} from "react-icons/ci";
import { LuUserCog2 } from "react-icons/lu";

import { useEffect } from 'react'
import axios from 'axios'





const Navbar = () => {

  const [menu,setMenu]=useState(false);
  const [loggedIn,setLoggedIn]=useState(false);
  const [isAccountVisible, setIsAccountVisible] = useState(false);
  const navigate=useNavigate();



    

 

  


  useEffect(() => {
    const getUser = async () => {
      try {
      
          const response = await axios.get("http://localhost:7000/user", { withCredentials: true });
  
       
          
          if (response.status === 200) {
            setLoggedIn(true);
          } else {
            setLoggedIn(false)
          }
        
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error('Resource not found');
          // Handle 404 error specifically
        } else {
          console.error('An error occurred:', error.message);
          // Handle other errors
        }
      }
    };

    getUser(); // Fetch user data when the component mounts

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

 


   function handleMenu(){
    setMenu(!menu);
   }

   function handleUser(){
    setIsAccountVisible(!isAccountVisible)
   }


   const handleLogOut=async()=>{

  
    try {
      const response =await axios.post("http://localhost:7000/user/logout",{},{withCredentials:true})

  
      //    console.log(response)

      // console.log(response.data.success); // Handle successful logout

      if(response.data.success){
        setLoggedIn(false)
        setIsAccountVisible(false);
        
        navigate("/login")
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
    // if (removeCookie) {
   
    // } else {
    //   // Handle the situation where removeCookie is undefined
    //   console.error("removeCookie is undefined");
    //   // Optionally, you can set a different fallback behavior here
    //   // For example, redirecting to the login page without removing the cookie
    //   navigate("/login");
    // }
  }

  return (
    <header className='bg-white font-[Poppins]'>
    <nav className='flex  justify-between h-20  items-center w-[92%] mx-auto'>

   <div className=' flex flex-row'>
   <Link to="/">  
   <h1 className='text-2xl  pt-2  font-[Agbalumo]  uppercase '>Air Conditoner</h1>
   </Link>
   </div>

   <div  className={`transition-all  z-50 ${menu?"top-[9%]":"top-[-100%]"} duration-1000 md:static absolute bg-white md:min-h-fit min-h-[30vh] left-0  md:w-auto w-full flex items-center px-5`}>
    <ul className='flex  md:flex-row flex-col md:items-center md:gap-[4vw] gap-8 '>
        <li className='hover:text-gray-500  rounded-md  p-3'>
         <Link to="/products" >Products</Link>  
        </li>
        <li className='hover:text-gray-500 rounded-md p-3'>
        <Link to="/about">About-Us</Link>
        </li>
        <li className='hover:text-gray-500  rounded-md  p-3'>
        <Link to='/contact' >Contact</Link> 
        </li>
        <li className='hover:text-gray-500 rounded-md  p-3'>
         <Link to="/cart" >Cart-Items</Link>  
        </li>
    </ul>

   </div>

   <div className='flex items-center  gap-1 md:gap-6 '>
   {!loggedIn ? 
   //if the user is not available
   (
            <button className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec] hover:shadow-lg">
              <Link to="/login"> Login </Link>
            </button>
          ):

  // if the user loggin
          (
            <div className='flex flex-col  items-center justify-center  '>


             <div  onClick={handleUser} >

              <h6 className="  px-5 py-2 rounded-md hover:bg-gray-300 hover:shadow-lg cursor-pointer mt-2 font-[Poppins] " >Account</h6>
             </div>
              
   {/* /// if account is clicked show options   */}
              {
                isAccountVisible ?  
                <div className='absolute   top-20  md:right-10 lg:right-24 z-50 bg-white p-4 border border-gray-300 rounded-lg shadow-lg'>
      
      <ul>
      <li className='hover:text-gray-500 rounded-md p-3 flex gap-3'>
       <CiBoxList />
          <Link to="/orders">My Orders</Link>
        </li>
        <li className='hover:text-gray-500 rounded-md p-3 flex gap-3'>
        <LuUserCog2 />
          <Link to="/updateuser">Update Profile</Link>
        </li>
        
        <li onClick={handleLogOut} className='hover:text-red-500 rounded-md p-3 flex gap-3'>
          <CiLogout   />
          <h1>Log Out</h1>
        </li>
      </ul>
    </div>
:<></>
         }
             
              
            </div>
          ) }

   </div>

   <div>
   <CgMenuGridO onClick={handleMenu} className='text-3xl cursor-pointer md:hidden'/>
   </div>

    </nav>
    </header>
  )
}

export default Navbar