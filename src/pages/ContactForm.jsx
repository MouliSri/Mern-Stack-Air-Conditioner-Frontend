// ContactForm.js

import React from 'react';

const ContactForm = () => {

  

  return (
    <form  className=" w-4/5 sm:w-full max-w-md mx-auto my-10">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
        <input type="text" id="name" name="name" className="border border-gray-300 rounded-md p-2 w-full"  />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
        <input type="email" id="email" name="email" className="border border-gray-300 rounded-md p-2 w-full"  />
      </div>
      <div className="mb-6">
        <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Message</label>
        <textarea id="message" name="message" className="border border-gray-300 rounded-md p-2 w-full h-32 resize-none" ></textarea>
      </div>
      <div className="flex justify-center">
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out">
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
