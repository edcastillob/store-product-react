
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import claro from '../../assets/claro.png';
import oscuro from '../../assets/oscuro.png';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const [productVisible, setProductVisible] = useState(false);
  const [storeVisible, setStoreVisible] = useState(false);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const navigate = useNavigate(); 

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setAccessToken(token);
  }, [navigate]); 
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleToggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleToggleProduct = () => {
    setProductVisible(!productVisible);
    setStoreVisible(false);
  };

  const handleToggleStore = () => {
    setStoreVisible(!storeVisible);
  };

  const handleLogOut = () => {
    localStorage.removeItem('accessToken');
    setAccessToken(null);
    navigate('/login');
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://edwarcastillo.netlify.app/" target="_blank" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://raw.githubusercontent.com/edcastillob/Countries-ProyectoIndividual/main/client/src/assets/ec.png" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Store-SystemProd</span>
        </a>
        <button
          onClick={handleToggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={menuVisible ? 'true' : 'false'}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className={`w-full md:block md:w-auto ${menuVisible ? '' : 'hidden'}`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
                <button className="theme-toggle" onClick={toggleDarkMode}>
                    <img src={darkMode ? oscuro : claro} alt={darkMode ? 'Modo Oscuro' : 'Modo Claro'} style={{width: '20%'}} />
                </button>
            </li>

            <li>
              <Link to="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page" onClick={handleToggleMenu}>Home</Link>
            </li>

            {accessToken && (
              <>
                <li className="relative group">
                  <button className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent focus:outline-none" onClick={handleToggleProduct}>
                    Product &nbsp;&nbsp;&nbsp;&nbsp;
                    <svg className="w-5 h-5 inline-block ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 011.414-1.414L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-.707.293z" />
                    </svg>
                  </button>
                  <ul className={`absolute left-0 mt-2 bg-white rounded-md shadow-lg ${productVisible ? 'block' : 'hidden'}`}>
                    <li><Link to="/products" className="block py-3 px-3  mb-1 text-white bg-black-700 rounded md:bg-gray-800 md:text-gray-700 md:p-0 dark:text-white md:dark:text-white-500" onClick={handleToggleProduct}>List Product</Link></li>
                    <li><Link to="/product" className="block py-3 px-3  text-white bg-black-700 rounded md:bg-gray-800 md:text-gray-700 md:p-0 dark:text-white md:dark:text-white-500" onClick={handleToggleProduct}>Add Product</Link></li>
                    <li><Link to="/associateProductToStore" className="block py-3 px-3 mt-1  text-white bg-black-700 rounded md:bg-gray-800 md:text-gray-700 md:p-0 dark:text-white md:dark:text-white-500" onClick={handleToggleProduct}>Product to Store</Link></li>
                  </ul>
                </li>

                <li className="relative group">
                  <button className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent focus:outline-none" onClick={handleToggleStore}>
                    Store &nbsp;&nbsp;&nbsp;&nbsp;
                    <svg className="w-5 h-5 inline-block ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 011.414-1.414L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-.707.293z" />
                    </svg>
                  </button>
                  <ul className={`absolute left-0 mt-2 bg-white rounded-md shadow-lg ${storeVisible ? 'block' : 'hidden'}`}>
                    <li><Link to="/stores" className="block py-3 px-3  mb-1 text-white bg-black-700 rounded md:bg-gray-800 md:text-gray-700 md:p-0 dark:text-white md:dark:text-white-500" onClick={handleToggleStore}>List Store</Link></li>
                    <li><Link to="/store" className="block py-3 px-3  text-white bg-black-700 rounded md:bg-gray-800 md:text-gray-700 md:p-0 dark:text-white md:dark:text-white-500" onClick={handleToggleStore}>Add Store</Link></li>
                    <li><Link to="/associateProductToStore" className="block py-3 px-3 mt-1 text-white bg-black-700 rounded md:bg-gray-800 md:text-gray-700 md:p-0 dark:text-white md:dark:text-white-500" onClick={handleToggleStore}>Store to product</Link></li>
                  </ul>
                </li>
                <li>
                  <button className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" onClick={handleLogOut}>LogOut</button>
                </li>
              </>
            )}

            {!accessToken && (
              <>
                <li>
                  <Link to="/register" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Register</Link>
                </li>
                <li>
                  <Link to="/login" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
