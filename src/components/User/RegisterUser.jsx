import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/actions/actionsUser';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";



const RegisterUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {

    const { name, value } = e.target;
    if (name === 'firstName' && /^[a-zA-Z\s]*$/.test(value)) {
        setUserData({
          ...userData,
          [name]: value
        });
      }
    if (name === 'lastName' && /^[a-zA-Z\s]*$/.test(value)) {
        setUserData({
          ...userData,
          [name]: value
        });
      }
      if (name === 'username') {
        setUserData({
          ...userData,
          [name]: value
        });
      }
      if (name === 'password') {
        setUserData({
          ...userData,
          [name]: value
        });
      }
      if (name === 'email') {
        setUserData({
          ...userData,
          [name]: value
        });
      }
      

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.firstName && userData.lastName && userData.username && userData.email && userData.password) {
      dispatch(registerUser(userData))
      setUserData({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: ''
      });
      navigate('/login')
    } else {
      toast.info('All fields are required');
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-8 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700 font-bold mb-2">First Name:</label>
          <input type="text" id="firstName" name="firstName" value={userData.firstName} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">Last Name:</label>
          <input type="text" id="lastName" name="lastName" value={userData.lastName} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username:</label>
          <input type="text" id="username" name="username" value={userData.username} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email:</label>
          <input type="email" id="email" name="email" value={userData.email} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password:</label>
          <input type="password" id="password" name="password" value={userData.password} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <button type="submit" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Agregar</button>
      </form>
    </div>
  );
};

export default RegisterUser;
