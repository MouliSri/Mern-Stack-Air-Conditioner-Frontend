import React ,{useState}from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const Card = ({ productData }) => {

  const [isInCart, setIsInCart] = useState(false); // State to track if the product is already in the cart
  
  const handleAddToCart = async () => {
    try {

    
       

      // Your newItem object creation logic remains unchanged
      const newItem = {
        product: productData._id,
        productquantity: 1 // Assuming the default quantity is 1 when adding to the cart
      };

      // Make a GET request to check if the product is already in the cart
      const {data} = await axios.get(`https://air-conditioner-backend.onrender.com/cart/checkCartItem/${productData._id}`,{withCredentials:true});

     

      if (data.isInCart) {
        // If the product is already in the cart, set isInCart to true
        setIsInCart(true);
        toast.warning('Product already exists in the cart', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        
      } else {
        toast.success('Product added to cart', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // If the product is not in the cart, proceed to add it
        const addResponse = await axios.post('https://air-conditioner-backend.onrender.com/cart/addToCart', {
          cartItems: [newItem],
          user: '' // Replace with the user ID or any user identification information
        },{ withCredentials: true });

       

        console.log('Product added to cart:', addResponse.data);
        console.log(isInCart)
      }
    
     
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle the 400 Bad Request error here
        toast.warning('Please Login First To Add Item To The Cart', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        // Display an error message or perform any necessary actions
      } else {
        // Handle other types of errors (e.g., network errors)
        console.error('An error occurred:', error.message);
      }
    }
  };


  

  return (
    
    <div  key={productData.id} className='w-80  h-auto mt-5 bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300'>
      <Link to={`/products/${productData._id}`}>
      <img
        src={productData.image}
        alt='ac'
        className='w-full h-48 object-cover object-center transform hover:scale-105 transition duration-300'
      />
      </Link>
      <div className='p-4'>
        <h5 className='text-xl font-semibold text-gray-900'>{productData.name}</h5>
        <p className='text-sm text-gray-600 mt-1'>{productData.description}</p>
        
        <div className='flex justify-between items-center mt-4'>
          {productData.discountedPrice ? (
            <div className="flex items-center">
              <span className="text-lg font-bold text-gray-500 line-through">${productData.price}</span>
              <span className="text-lg font-bold text-blue-700 ml-2">${productData.discountedPrice}</span>
            </div>
          ) : (
            <span className="text-lg font-bold text-blue-700">${productData.price}</span>
          )}

          <button  onClick={handleAddToCart} className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white transform hover:scale-105 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out">
            Add to cart
          </button>
          <ToastContainer />
        </div>
      </div>

    </div>
 
  );
};

export default Card;
