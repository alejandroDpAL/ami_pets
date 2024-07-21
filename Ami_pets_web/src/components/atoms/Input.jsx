import React from 'react';

const Input = ({ type, placeholder }) => (
  <input
    type={type}
    placeholder={placeholder}
    className="w-11/12 px-4 bg-yellow-200 h-14 py-2 my-2 mx-5 text-xl placeholder:text-gray-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
  />
);

export default Input;
