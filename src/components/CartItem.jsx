import React, { useState } from 'react';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import axios from "axios"

const CartItem = ({ item , fetchCartItems,calculateTotalPrice }) => {
  const [quantity, setQuantity] = useState(item.productquantity);

 
  const increment = async () => {
    try {
      const updatedQuantity = quantity + 1;
      setQuantity(updatedQuantity);
      await updateCartItemQuantity(item._id, updatedQuantity);
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
    }
  };

  const decrement = async () => {
    if (quantity > 1) {
      try {
        const updatedQuantity = quantity - 1;
        setQuantity(updatedQuantity);
        await updateCartItemQuantity(item._id, updatedQuantity);
      } catch (error) {
        console.error('Error updating cart item quantity:', error);
      }
    }
  };

  const updateCartItemQuantity = async (itemId, updatedQuantity) => {
    try {
      await axios.put(
        `http://localhost:7000/cart/updateCartItem/${itemId}`,
        { productquantity: updatedQuantity },
        { withCredentials: true }
      );

      calculateTotalPrice()
      // After successful update, fetch updated cart items
      fetchCartItems();
    } catch (error) {
      throw new Error('Error updating cart item quantity:', error);
    }
  };
 

  // Access product details within item.product
  const product = item.product;

  const handleDeleteItem = async (id) => {
    try {
     
      await axios.delete(`http://localhost:7000/cart/deleteCartItem/${id}`,{withCredentials:true});
      // After successful deletion, fetch updated cart items
      fetchCartItems();
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  
  // Extract necessary details from the product object
  const { name, description, price, image } = product;

  return (
    <div className="flex items-center border-b border-gray-200 py-4">
      <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden mr-4">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col md:flex-row md:items-center w-full">
        <div className="md:w-2/3">
          <h2 className="text-lg font-semibold">{name}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
        <div className="flex items-center justify-between mt-4 md:w-1/3 md:mt-0">
          <div className="flex items-center">
            <button
              className="bg-blue-500 text-white px-4 py-1 rounded-lg focus:outline-none transform hover:scale-105 transition duration-300"
              onClick={decrement}
            >
              -
            </button>
            <span className="px-4 py-1 border border-gray-300">{quantity}</span>
            <button
              className="bg-blue-500 text-white px-4 py-1 rounded-lg focus:outline-none transform hover:scale-105 transition duration-300"
              onClick={increment}
            >
              +
            </button>
          </div>
          <div className="flex items-center">
            <span className="text-gray-700 mr-4">${price * quantity}</span>
            <MdOutlineDeleteOutline
              className={`text-red-500 text-xl cursor-pointer hover:text-red-600  hover:scale-110`}
              onClick={() => handleDeleteItem(item._id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
