import React,{useEffect,useState} from 'react'
import { Link} from 'react-router-dom'


import { Typography, Button} from "@material-tailwind/react"
import image2 from "../images/image2.jpg"

import {RiEBike2Line} from "react-icons/ri"
import {GiAutoRepair} from "react-icons/gi"

import axios from "axios"

import ProductCard from '../components/Card'

import LoadingPage from '../components/LoadingPage'


import {
  Card,
  CardBody,
} from "@material-tailwind/react";







const Home = () => {

    
  const [products,setProducts]=useState([])

    const [isVisible, setIsVisible] = useState(false);

    const [isLoading,setIsLoading]=useState(true)


    const getFeauturedData=async()=>{

      try {
      
        const {data}=await axios.get("https://air-conditioner-backend.onrender.com/products/get/isFeatured")
        setProducts(data)
        setIsLoading(false);
      } 
      catch (error) {
        console.log(error)
      }
    }

   
   
  
    useEffect(() => {
      const handleScroll = () => {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const threshold = windowHeight * 0.8;
  
        // Check if the element exists before accessing its offsetTop
        const element = document.getElementById('fade-in-element');
        if (element) {
          const elementOffsetTop = element.offsetTop;
          const isVisible = scrollTop > elementOffsetTop - threshold;
          setIsVisible(isVisible);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);


    useEffect(() => {
      // Simulating loading delay with a setTimeout
      const timeout = setTimeout(() => {
        getFeauturedData();
      }, 1000);
  
      return () => clearTimeout(timeout); // Cleanup timeout on unmount
    }, []);


 
 


  return (
     <div>{
      isLoading ? <LoadingPage />:( <div className="private">

     

      <div className="relative h-full  md:h-screen  sm:w-full w-auto z-0 ">
        <img
          src={image2}
          alt="pic1"
          className="h-full w-full object-fit"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center">
          <div className="w-3/4 text-center md:w-2/4">
       
            <Typography
              variant="h1"
              color="teal"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl text-teal-200"
            >
                 We’re the AIRxperts
             
            </Typography>


   
              <Button size="lg" color="white" variant="text" className='bg-teal-200 hover:text-teal-200'>
             <Link to="/products">  View Products </Link> 
              </Button>
    
          </div>
        </div>
      </div>


      <div className= "container my-20 "  id='product'>

        <h1 className='text-3xl font-serif text-gray-800 text-center'>Top Selling Products</h1>

       
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-20   mx-10 sm:mx-auto lg:ml-20'>

      

  
        { products.length>0 &&
          products.map((productData)=>  <ProductCard key={productData._id} productData={productData} />)
        }
            
      

        </div>

      


      </div>


      <div id="fade-in-element" className= {`fade-in from-top container my-20 text-center ${isVisible ? 'visible' : ''}`}>

      <h1 className='text-3xl font-serif text-gray-800' id='service'>Our Services</h1>
     
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  mt-5   gap-10  mx-auto md:ml-10 lg:ml-20'>

      <Card className="mt-6 w-96  md:w-auto mx-auto   hover:text-white  transition-transform duration-500 ease-in-out transform hover:bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105">
      <CardBody>
       <RiEBike2Line className="mb-4 h-12 w-12 text-gray-900  hover:translate-x-32 duration-1000" />
        
        <Typography variant="h5" className="mb-2 ">
           Doorstep Service  
        </Typography>
        <Typography className=''>
         From repairs to installations, our skilled professionals are ready to provide quality home services at your convenience. Schedule a service, and we'll take care of the rest
        </Typography>
      </CardBody>

    </Card>

    <Card className="mt-6 w-96 mx-auto hover:text-white md:w-auto transition-transform  duration-500 ease-in-out transform hover:bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105">
      <CardBody>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="mb-4 h-12 w-12 text-gray-900   hover:translate-x-32 duration-1000"
        >
          <path
            fillRule="evenodd"
            d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
            clipRule="evenodd"
          />
          <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
        </svg>
        <Typography variant="h5"  className="mb-2">
          Customer Support 
        </Typography>
        <Typography className=''>
          Call our customer support hotline at [7825010293] during our business hours to speak directly with a knowledgeable representative.
        </Typography>
      </CardBody>
    

      
    </Card>

    <Card className="mt-6 w-96 mx-auto md:w-auto hover:text-white transition-transform transform hover:scale-105 duration-500  ease-in-out  hover:bg-gradient-to-r from-purple-500 to-pink-500" >
      <CardBody>
        <GiAutoRepair className="mb-4 h-12 w-12 text-gray-900 hover:translate-x-32 duration-1000" />
        <Typography variant="h5"  className="mb-2">
          Air Conditioner Service
        </Typography>
        <Typography >
        Experience top-notch air conditioner services with [Your Company Name]. From routine maintenance to prompt repairs, we've got your comfort covered. Trust us for quick, reliable, and professional air conditioner services that ensure a cool and comfortable.
        </Typography>
      </CardBody>
  
      
    </Card>

    </div>

      </div>

    
      
      </div>)


    }
    </div> 
   
  )
}

export default Home