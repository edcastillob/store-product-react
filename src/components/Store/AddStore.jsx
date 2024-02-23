import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import { postStore } from '../../redux/actions/actionsStore';


const AddStore = () => {
  const dispatch = useDispatch();

  const [storeData, setStoreData] = useState({
    name: '',
    city: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ( /^[a-zA-Z\s]*$/.test(value)) {
        setStoreData({
          ...storeData,
          [name]: value
        });
      }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(storeData.city.length !== 3){
      toast.info('City must be 3 characters')
    }else{
        storeData.city= storeData.city.toUpperCase()
    }
    if (storeData.name && storeData.city && storeData.address) {
      dispatch(postStore(storeData))
      setStoreData({
        name: '',
        city: '',
        address: ''
      });
    } else {
      toast.info('All fields are required')      
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-8 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add Store</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
          <input type="text" id="name" name="name" value={storeData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block text-gray-700 font-bold mb-2">City:</label>
          <input type="text" id="city" name="city" value={storeData.city} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Address:</label>
          <input type="text" id="address" name="address" value={storeData.address} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add</button>
      </form>
    </div>
  );
};

export default AddStore;
