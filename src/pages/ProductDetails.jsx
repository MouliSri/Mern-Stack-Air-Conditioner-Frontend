// ProductDetails.js

import React, { useState ,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaCircle } from 'react-icons/fa';

const ProductDetails = () => {

    const { id } = useParams();
  
    const [productDetails, setProductDetails] = useState({})

       
    const [images, setImages] = useState({
        img1: "",
        img2: "",
        img3: "",
        img4: ""
       })
  
      const [activeImg, setActiveImage] = useState(images.img1)
  
      const [amount, setAmount] = useState(1);

      const fetchProductDetails = async () => {
        try {
          const { data } = await axios.get(`https://air-conditioner-backend.onrender.com/products/${id}`);
         
          // Update the state with received product data
          setProductDetails(data);

        // Set the images state based on the fetched data
         setImages(data.images.reduce((acc, curr, index) => {
        acc[`img${index + 1}`] = curr;
        return acc;
      }, {}));
  
      // Set the active image to img1 by default if available
      if (data.images.length > 0) {
        setActiveImage(data.image);
      }
        } catch (error) {
          console.log(error);
          // Handle error state or notification for failed fetch
        }
      };

      useEffect(() => {
        
        fetchProductDetails();
        // eslint-disable-next-line
  }, [id]); // Fetch data when the 'id' parameter changes


  const [isInCart, setIsInCart] = useState(false); // State to track if the product is already in the cart

  const handleAddToCart = async () => {
    try {
      // Your newItem object creation logic remains unchanged
      const newItem = {
        product: id,
        productquantity: 1 // Assuming the default quantity is 1 when adding to the cart
      };

      // Make a GET request to check if the product is already in the cart
      const {data} = await axios.get(`https://air-conditioner-backend.onrender.com/cart/checkCartItem/${id}`,{withCredentials:true});

      

      if (data.isInCart) {
        // If the product is already in the cart, set isInCart to true
        setIsInCart(true);
        console.log('Product already exists in the cart');
      } else {
        // If the product is not in the cart, proceed to add it
        const addResponse = await axios.post('https://air-conditioner-backend.onrender.com/cart/addToCart', {
          cartItems: [newItem],
          user: '' // Replace with the user ID or any user identification information
        },{ withCredentials: true });

        console.log('Product added to cart:', addResponse.data);
        console.log(isInCart)
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      // Handle errors if necessary
    }
  };
  
  

  // Render product details once fetched
  return (
    <div className='flex flex-col lg:flex-row gap-16 items-center mb-10 w-5/6 mx-auto'>
  <div className='flex flex-col gap-6 lg:w-2/4'>
    <img src={activeImg} alt='' className='w-full h-full aspect-square object-fit rounded-xl' />
    <div className='flex flex-col lg:flex-row justify-between h-24'>
      <div className='flex flex-row flex-wrap justify-center lg:justify-between gap-2 lg:gap-0 w-full'>
        <img src={images.img1} alt='' className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img1)} />
        <img src={images.img2} alt='' className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img2)} />
        <img src={images.img3} alt='' className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img3)} />
        <img src={images.img4} alt='' className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img4)} />
      </div>
    </div>
  </div>

    {/* ABOUT */}
    <div className='flex flex-col gap-4 lg:w-2/4 mt-20 sm:mt-0'>
        <div>
            <span className=' text-violet-600 font-semibold'>{productDetails.brand}</span>
            <h1 className='text-3xl font-bold'>{productDetails.name}</h1>
        </div>
        <p className='text-gray-700'>{productDetails.highLightText}</p>
        <p className='text-gray-700'>{productDetails.description}</p>
        <p className='text-gray-700 mt-2'>Colors Available: <div className='flex mt-2 gap-2'>{
  productDetails.colours && productDetails.colours.length > 0 ? (
    productDetails.colours.map((color, index) => (
      <FaCircle key={index} style={{ color: color, fontSize: 24 }} />
    ))
  ) : (
    <></>
  )
}</div></p>
        <p className='text-gray-700 mt-2'>
        Con un'ammortizzazione incredibile per sostenerti in tutti i tuoi chilometri, Invincible 3 offre un livello di comfort elevatissimo sotto il piede per aiutarti a dare il massimo oggi, domani e oltre. Questo modello incredibilmente elastico e sostenitivo, è pensato per dare il massimo lungo il tuo percorso preferito e fare ritorno a casa carico di energia, in attesa della prossima corsa.
        </p>
        <h6 className='text-2xl font-semibold'>${productDetails.price}</h6>
        <div className='flex  flex-col sm:flex-row  items-center gap-12'>
            <div className='flex flex-row items-center'>
                <button className='bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl' onClick={() => setAmount((prev) => prev - 1)}>-</button>
                <span className='py-4 px-6 rounded-lg'>{amount}</span>
                <button className='bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl' onClick={() => setAmount((prev) => prev + 1)}>+</button>
            </div>
            <button onClick={handleAddToCart} className='bg-red-100 hover:bg-red-400 text-white font-semibold py-3 px-16 rounded-xl h-full'>Add to Cart</button>
        </div>
    </div>
</div>
  );
};

export default ProductDetails;


  