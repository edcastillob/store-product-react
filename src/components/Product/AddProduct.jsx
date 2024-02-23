import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postProduct } from '../../redux/actions/actions';
import { toast } from "react-toastify";


const AddProduct = () => {
  const dispatch = useDispatch();

  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [dataProduct, setDataProduct] = useState({
    name: '',
    price: '',
    type: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name' && /^[a-zA-Z\s]*$/.test(value)) {
        setDataProduct({
          ...dataProduct,
          [name]: value
        });
      }
      if (name === 'price' && !isNaN(value)) {
        setDataProduct({
          ...dataProduct,
          [name]: value
        });
      }
      if (name === 'type' ) {
        setDataProduct({
          ...dataProduct,
          [name]: value
        });
      }

  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'images');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/prodelevatepf/image/upload', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      setDataProduct({
        ...dataProduct,
        image: data.secure_url
      });
      setIsImageUploaded(true);
    } catch (error) {
      console.error('Error uploading image: ', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dataProduct.name && dataProduct.price && dataProduct.type) {   
      dispatch(postProduct(dataProduct))
      setDataProduct({
        name: '',
        price: '',
        type: '',
        image: ''
      })
    } else {
      toast.info('The name, price and type of products are mandatory')
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-8 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
          <input type="text" id="name" name="name" value={dataProduct.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price:</label>
          <input type="text" id="price" name="price" value={dataProduct.price} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="type" className="block text-gray-700 font-bold mb-2">Type:</label>
          <select id="type" name="type" value={dataProduct.type} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500">
            <option value="">Seleccione</option>
            <option value="No_perecedero">No perecedero</option>
            <option value="Perecedero">Perecedero</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Image:</label>
          <input type="file" id="image" name="image" onChange={handleFileChange} className="w-full" />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
      </form>
      
    </div>
  );
};

export default AddProduct;
