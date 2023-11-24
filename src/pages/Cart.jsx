import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CartItem from '../components/CartItem'; // Assuming CartItem component is in the same directory
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const [total,setTotal]=useState(0)

  const fetchCartItems = async () => {
    try {
      const {data} = await axios.get('http://localhost:7000/cart',{
        withCredentials: true
      });
      console.log(data)
      setCartItems(data); // Assuming response.data contains cart items array
     
      
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    
    fetchCartItems();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // Calculate total price whenever cartItems change
    calculateTotalPrice();
    // eslint-disable-next-line
  }, [cartItems]);

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    cartItems.forEach((cartItemData) => {
      cartItemData.cartItems.forEach((item) => {
        const product = item.product;
        const quantity = item.productquantity;

        totalPrice += product.price * quantity;
      });
    });

    setTotal(totalPrice);
  };


  


  
 

  const handleDeleteAllItems = async () => {
    try {
      await axios.delete('http://localhost:7000/cart/deleteAllCartItems',{withCredentials:true});
      setCartItems([]);
    } catch (error) {
      console.error('Error deleting all cart items:', error);
    }
  };

  return (
    <div className={`container mx-auto py-8 ${cartItems.length === 0 ? 'h-screen' : 'h-screen'}`}>
      {cartItems.length === 0 ? (
        <div className="p-6 text-center">
          <p className="text-gray-500 text-2xl">Your cart is empty.</p>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>
          <div className="bg-white shadow-lg rounded-lg">
            <div className="p-6">
            {cartItems.map((cartItemData) => (
        <div key={cartItemData._id}>
          {/* Pass each cart item data to the CartItem component */}
          {cartItemData.cartItems.map((item) => (
           
            <CartItem key={item._id} item={item}  fetchCartItems={fetchCartItems} calculateTotalPrice={calculateTotalPrice} />
          ))}
        </div>
      ))}
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-between items-center">
              <button
                className="text-red-500 text-sm hover:text-red-700 focus:outline-none"
                onClick={handleDeleteAllItems}
              >
                Remove All Items
              </button>
              <span className="text-lg font-semibold">
                Total:  {total} {/* Calculate total price here based on cartItems */}
              </span>
              {cartItems.length > 0 ? (
                <Link to="/placeorder">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none">
                    Checkout
                  </button>
                </Link>
              ) : (
                <button className="bg-blue-300 text-white px-4 py-2 rounded-lg cursor-not-allowed opacity-50 focus:outline-none" disabled>
                  Checkout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
