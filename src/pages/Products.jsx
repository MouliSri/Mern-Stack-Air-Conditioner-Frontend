import  Card  from '../components/Card'
import React ,{useEffect, useState}from 'react'
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

const Products = () => {

    const [showFilters, setShowFilters] = useState(false);
    const [filterCategory, setFilterCategory] = useState('All');
    const [datas,setDatas]=useState([])
    const [isLoading,setIsLoading]=useState(true)

    const getProducts=async()=>{

      try {
      
        const {data}=await axios.get("http://localhost:7000/products")

        setDatas(data)
        setIsLoading(false);
      

      } 
      catch (error) {
        console.log(error)
      }

    }

    
    useEffect(() => {
      // Simulating loading delay with a setTimeout
      const timeout = setTimeout(() => {
        getProducts();
      }, 1000);
  
      return () => clearTimeout(timeout); // Cleanup timeout on unmount
    }, []);

    
   


const categories = ['All', 'window', 'Premium','Portable']; // Example categories

const filteredProducts = filterCategory === 'All' ? datas : datas.filter(product => product.category.type === filterCategory);


  return (
    <div className='w-[92%] mx-auto h-full mt-6'>
     <h1 className='text-center text-2xl uppercase font-bold'>Products</h1>


   
     {/* Filter section */}
     <div className='flex justify-center mt-4'>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className='px-4 py-2 rounded-lg bg-gray-300 text-gray-700'
        >
          Show Options
        </button>
      </div>

      {/* Options window */}
      {showFilters && (
        <div className='flex sm:flex-row flex-col justify-center mt-4 sm:space-x-4 gap-2 sm:gap-0'>
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setFilterCategory(category)}
              className={`px-4 py-2 rounded-lg ${
                filterCategory === category ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

{ isLoading ? <div className='min-h-screen flex items-center justify-center'><ClipLoader color="#2160c0"  size={50} /></div>: <div className='grid  grid-cols-1  md:grid-cols-2 lg:grid-cols-3  gap-5 my-10'>

{filteredProducts.map((productData)=>  <Card key={productData.id} productData={productData} />
)}
</div>}

     

    </div>
  )
}

export default Products