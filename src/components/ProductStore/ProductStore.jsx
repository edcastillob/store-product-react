import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allProducts } from "../../redux/actions/actions";
import { allStores } from "../../redux/actions/actionsStore";
import { associateProductToStore } from "../../redux/actions/actionsRelation";


const AssociateProductsStores = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const stores = useSelector((state) => state.stores);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedStore, setSelectedStore] = useState("");

  useEffect(() => {
    dispatch(allProducts());
    dispatch(allStores());
  }, [dispatch]);

  const handleAssociation = () => {
    if (selectedProduct && selectedStore) {
      dispatch(associateProductToStore(selectedProduct, selectedStore));
      setSelectedProduct("");
      setSelectedStore("");
    } 
  };

  return (
    <div className="container mx-auto pt-8 px-4">
      <h2 className="text-lg font-bold mb-4 bg-black text-white">Associate Products and Stores</h2>
      <div className="flex flex-col">
        <label htmlFor="product" className="text-sm font-medium text-gray-700 mb-2">Select Product:</label>
        <select
          id="product"
          name="product"
          className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          onChange={(e) => setSelectedProduct(e.target.value)}
          value={selectedProduct}
        >
          <option value="">Select a Product</option>
          {products.map(product => (
            <option key={product.id} value={product.id}>{product.name}</option>
          ))}
        </select>
      </div>
      <div className="mt-4 flex flex-col">
        <label htmlFor="store" className="text-sm font-medium text-gray-700 mb-2">Select Store:</label>
        <select
          id="store"
          name="store"
          className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          onChange={(e) => setSelectedStore(e.target.value)}
          value={selectedStore}
        >
          <option value="">Select a Store</option>
          {stores.map(store => (
            <option key={store.id} value={store.id}>{store.name}</option>
          ))}
        </select>
      </div>
      <button 
        onClick={handleAssociation}
        className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Associate
      </button>
    </div>
  );
};

export default AssociateProductsStores;
