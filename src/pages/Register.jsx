import React, { useState } from 'react'
import {Link,useNavigate} from "react-router-dom"
import axios from "axios"
import { toast} from "react-toastify"



const Register = () => {

  const [showPassword, setShowPassword] = useState(false);
  const navigate=useNavigate()
  const [user, setUser] = useState({
    email: '',
    password: '',
    phoneNumber: '',
    name: '',
  });

   const generateError=(err)=>{
       
    toast.error(err,
      {position: "bottom-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    })
   }
  
   const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }



   const handleSubmit=async(e)=>{
    e.cancelable && e.preventDefault()

          try {

          

            const {data}=await axios.post("https://air-conditioner-backend.onrender.com/user/register",user,{withCredentials:true})

            console.log(data);

            if(data){

              if(data.errors){

                const {email,password}=data.errors;

                if(email){ 
                  generateError(email)
                }
                else if(password)
                {

                generateError(password);
                }
                
              }
              else{


                toast.success('🦄 Registered Succesfully', {
                  position: "top-center",
                  autoClose: 4000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  });

                setTimeout(() => {
                  navigate("/")
                }, 4000); 

                 

                
               
              }

            }

           
      
             
          }  catch (error) {
            if (error.response && error.response.status === 404) {
              console.error('Resource not found');
              // Handle 404 error specifically
            } else {
              console.error('An error occurred:', error.message);
              // Handle other errors
            }
          }
   }


  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200 font-serif bg-opacity-50">
  <div className="bg-white p-4 md:p-12 lg:p-16 rounded-md border-t-2 border-indigo-500    w-full sm:max-w-md sm:h-auto">

    <h2 className="text-2xl font-bold mb-4">Register</h2>

    <form onSubmit={(event) => handleSubmit(event)} className="flex flex-col gap-5 transition-all duration-300  delay-300 transform hover:scale-105 hover:shadow-lg hover:p-5">

    <div className="flex flex-col gap-2">
        <label id="name" className="text-sm">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter Your Name"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          className="p-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 placeholder-top-0 transition-all duration-300 hover:border-indigo-700 hover:shadow-md"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label id="email" className="text-sm">Email</label>
        <input
          type="text"
          name="email"
          placeholder="Enter Your Email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="p-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 placeholder-top-0 transition-all duration-300 hover:border-indigo-700 hover:shadow-md"
        />
      </div>

      <div className="flex flex-col relative gap-2">
        <label id="password" className="text-sm">Password</label>
        <input
          type={showPassword ? "text":"password"}
          name="password"
          placeholder="Enter Your Password"
          onChange={(e) => setUser({ ...user, password: e.target.value})}
          className="p-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 placeholder-top-0 transition-all duration-300 hover:border-indigo-700 hover:shadow-md"
        />
        <button
    type="button"
    onClick={togglePasswordVisibility}
    className="absolute top-8 right-6 text-indigo-500 focus:outline-none"
  >
    {showPassword ? '🙊' : '🙈'}
  </button>
      </div>
      <div className="flex flex-col gap-2">
        <label id="phoneNumber" className="text-sm">Phone-Number</label>
        <input
          type="text"
          name="phoneNumber"
          placeholder="Enter Your Number"
          onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
          className="p-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 placeholder-top-0 transition-all duration-300 hover:border-indigo-700 hover:shadow-md"
        />
      </div>

      <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md text-sm uppercase transform transition-transform   delay-75 hover:scale-105 hover:shadow-lg">Submit</button>

      <span className="text-sm">
        Already have an account? <Link to="/login" className="text-indigo-500 hover:underline">Login</Link>
      </span>

    </form>

  </div>
</div>
  )
}

export default Register;