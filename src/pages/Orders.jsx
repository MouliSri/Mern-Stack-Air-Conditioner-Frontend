import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('http://localhost:7000/orders', { withCredentials: true });
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const renderOrderStatus = (order) => {
    if (order.status === 'pending') {
      return (
        <div className="bg-yellow-200 text-yellow-800 rounded-md p-2 text-sm">
          <strong>In Progress</strong>
        </div>
      );
    }
    return (
      <div className="bg-green-200 text-green-800 rounded-md p-2 text-sm">
        <strong>Completed</strong>
      </div>
    );
  };

  return (
    <div className='h-auto bg-gray-100 font-[poppins]'>
      <div className="container mx-auto my-10 px-4 py-8">
        <h1 className="text-3xl font-semibold mb-6">Orders</h1>
        <div className="grid grid-cols-1  lg:grid-cols-2 gap-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white shadow-lg rounded-lg overflow-hidden  hover:scale-75 duration-500">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-2">Order ID: {order._id}</h2>
                {renderOrderStatus(order)}

                <div className="grid grid-cols-2 gap-4">
                  {order.orderItems.map((item) => (
                    <div key={item._id} className="flex flex-col sm:flex-row items-center space-x-4 mb-4">
                      {item.product && item.product.image ? (
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-36 h-36 rounded-full transition-transform duration-300 transform hover:scale-110"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-gray-200" /> // Placeholder or default image
                      )}
                      <p className="text-sm">{item.product ? item.product.name : 'Product Not Found'}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm mt-4">
                  <span className="font-semibold">Address:</span> {order.address}, {order.city}, {order.country}, {order.zip}
                  <br />
                  <span className="font-semibold">Phone:</span> {order.phone}
                  <br />
                  <span className="font-semibold">Total Price:</span> ${order.totalPrice}
                  <br />
                  <span className="font-semibold">Status:</span> {order.status}
                  <br />
                  <span className="font-semibold">Date Ordered:</span> {new Date(order.dateOrdered).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
     
    </div>
    </div>
  );
};

export default Orders;
