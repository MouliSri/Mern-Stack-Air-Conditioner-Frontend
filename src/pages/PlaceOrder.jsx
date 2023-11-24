// PlaceOrder.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';



const PlaceOrder = () => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const navigate=useNavigate()

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const { data } = await axios.get('https://air-conditioner-backend.onrender.com/cart',{withCredentials:true});
        setCartItems(data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  useEffect(() => {
    calculateTotalPrice(cartItems);
  }, [cartItems]);

  const calculateTotalPrice = (cartItems) => {
    let totalPrice = 0;

    cartItems.forEach((cartItemData) => {
      cartItemData.cartItems.forEach((item) => {
        const product = item.product;
        const quantity = item.productquantity;

        totalPrice += product.price * quantity;
      });
    });

    setTotalPrice(totalPrice);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    const orderItems = cartItems.map((order) => {
      return order.cartItems.map((item) => {
        return {
          product: item.product._id, // Extract product ID
          quantity: item.productquantity // Extract product quantity
        };
      });
    }).flat();

    const orderData = {
      orderItems,
      address,
      city,
      zip,
      country,
      phone,
      totalPrice,
      user: '', // Replace with the actual user ID
    };

    try {
    
      const response = await axios.post('https://air-conditioner-backend.onrender.com/orders/addOrder', orderData,{withCredentials:true});
     
      if(!response){
        console.log("not added")
      }
      Swal.fire({
        icon: 'success',
        title: 'Order Placed Successfully!',
        text: 'Thank you for your order.',
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        // Redirect to products page after showing success message
        navigate("/products")
      });
    } catch (error) {
      console.error('Error placing order:', error);
      // Handle error scenarios
    }

    // Reset form fields after submission
    setAddress('');
    setCity('');
    setZip('');
    setCountry('');
    setPhone('');
    setTotalPrice(0);
  };

  return (
    <div className="container mx-auto my-8">
    <h1 className="text-2xl font-bold mb-4">Place Your Order</h1>
    
      
    
 
      <form onSubmit={handlePlaceOrder} className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">City:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">ZIP Code:</label>
          <input
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Country:</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        <div className="mt-4">
        <h2 className="text-lg font-semibold">Total Price: ${totalPrice}</h2>
      </div>

        <div className="container mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4">Payment Method: Cash on Delivery</h2>
      <p className="text-lg">
        We currently only support payment via cash on delivery for this order.
        Please have the exact amount ready when the delivery arrives.
      </p>
    </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default PlaceOrder;
