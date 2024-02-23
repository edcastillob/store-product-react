import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom"; 
import { deleteProduct, getProductDetail, updateProduct } from "../../redux/actions/actions";
import noImage from "../../assets/no-image.png";
import { deleteProductStoreAssociation, getStoresAssociatedToProduct } from "../../redux/actions/actionsRelation"; 

const ProductDetail = () => {
  const { productId } = useParams(); 
  const dispatch = useDispatch();  
  const navigate= useNavigate();
  const productDetail = useSelector((state) => state.productDetail);
  const storesAssociated = useSelector((state) => state.storesAssociated) || { data: [] };

  const [modalOpen, setModalOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: "",
    price: "",
    type: ""
  });

  useEffect(() => {
    dispatch(getProductDetail(productId));
    dispatch(getStoresAssociatedToProduct(productId));
  }, [dispatch, productId, updateProduct]);

  useEffect(() => {
    setUpdatedProduct({
      name: productDetail.name || "",
      price: productDetail.price || "",
      type: productDetail.type || ""
    });
  }, [productDetail]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name' && /^[a-zA-Z\s]*$/.test(value)) {
        setUpdatedProduct({
          ...updateProduct,
          [name]: value
        });
      }
      if (name === 'price' && !isNaN(value)) {
        setUpdatedProduct({
            ...updateProduct,
            [name]: value
          });
        }
      if (name === 'type' ) {
        setUpdatedProduct({
            ...updateProduct,
            [name]: value
          });
        }
  };

  const handleSubmit = () => {
    dispatch(updateProduct(productId, updatedProduct));
    setModalOpen(false);
    dispatch(getProductDetail(productId));

  };

  const handleDelete = (productId) => {  
    dispatch(deleteProduct(productId))
    navigate('/products')
  }

  const handleDeleteStoreAssociated = (productId, storeId) => {
    dispatch(deleteProductStoreAssociation(productId, storeId));
    dispatch(getProductDetail(productId));
    dispatch(getStoresAssociatedToProduct(productId)); 
  };
  return (
    <div className="container mx-auto pt-8 px-4">
      {productDetail && (
        <div className="flex flex-col items-center">
          <img
            src={productDetail.image || noImage}
            alt={productDetail.name}
            className="w-full h-auto object-cover object-center"
            style={{width:'20%'}}
          />
          <div className="mt-4">
            <table className="min-w-full divide-y divide-gray-600">
              <thead className="bg-slate-400">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                  >
                    Type
                  </th>
                </tr>
              </thead>
              <tbody className="bg-slate-900 divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{productDetail.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm  text-white">{`$${productDetail.price}`}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm  text-white">{productDetail.type}</div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-4">
              <Link to={'/products'}>
                <button className="bg-gray-600 hover:bg-gray-950 text-white font-bold py-2 px-4 mr-4 rounded focus:outline-none focus:shadow-outline">
                  Back
                </button>
              </Link>
              <button 
                onClick={() => setModalOpen(true)}
                className="bg-gray-600 hover:bg-gray-950 text-white font-bold py-2 px-4 mr-4 rounded focus:outline-none focus:shadow-outline"
              >
                Update
              </button>
              <button className="bg-gray-600 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => handleDelete(productId)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Update Product</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={updatedProduct.name} 
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                <input 
                  type="text" 
                  id="price" 
                  name="price" 
                  value={updatedProduct.price} 
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                <select 
                  id="type" 
                  name="type" 
                  value={updatedProduct.type} 
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="No_perecedero">No perecedero</option>
                  <option value="Perecedero">Perecedero</option>
                </select>
              </div>
              <div className="mt-4">
                <button 
                  type="submit"
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 mr-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Save Changes
                </button>
                <button 
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/*  las tiendas asociadas */}
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-4 bg-black text-white">Stores Associated to Product</h2>
        <table className="min-w-full divide-y divide-gray-600">
          <thead className="bg-slate-400">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
              >
                Address
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
              >
                Created At
              </th>
              <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                  >
                    Actions
                  </th>
            </tr>
          </thead>
          <tbody className="bg-slate-900 divide-y divide-gray-200">
          {storesAssociated && storesAssociated.data && storesAssociated.data.map(store => (
          <tr key={store.id}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-white">{store.name}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm  text-white">{store.address}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm  text-white">{store.createdAt}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="bg-gray-600 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => handleDeleteStoreAssociated(productId, store.id)}
                      >
                        Delete
                      </button>
                    </td>
          </tr>
        ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductDetail;
