import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { deleteStore, getStoreDetail, updateStore } from "../../redux/actions/actionsStore";
import { deleteProductStoreAssociation, getProductsAssociatedToStore, getStoresAssociatedToProduct } from "../../redux/actions/actionsRelation"; 


const StoreDetail = () => {
  const { storeId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storeDetail = useSelector((state) => state.storeDetail);
  const productsAssociated = useSelector((state) => state.productsAssociated) || { data: [] };
  const [modalOpen, setModalOpen] = useState(false);
  const [updatedStore, setUpdatedStore] = useState({
    name: "",
    city: "",
    address: ""
  });

  useEffect(() => {
    dispatch(getStoreDetail(storeId));
    dispatch(getProductsAssociatedToStore(storeId));
  }, [dispatch, storeId]);

  useEffect(() => {
    setUpdatedStore({
      name: storeDetail.name || "",
      city: storeDetail.city || "",
      address: storeDetail.address || ""
    });
  }, [storeDetail]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedStore({
      ...updatedStore,
      [name]: value
    });
  };

  const handleSubmit = () => {
    dispatch(updateStore(storeId, updatedStore));
    setModalOpen(false);
    navigate('/stores');
  };

  const handleDelete = () => {
    dispatch(deleteStore(storeId));
    navigate('/stores');
  };

  const handleDeleteStoreAssociated = (productId, storeId) => {
    dispatch(deleteProductStoreAssociation(productId, storeId));    
    navigate('/stores')
  }
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Intl.DateTimeFormat('es-ES', options).format(new Date(dateString));
  };

  return (
    <div className="container mx-auto pt-8 px-4">
      {storeDetail && (
        <div className="flex flex-col items-center">
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
                    City
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
                    Created
                  </th>
                </tr>
              </thead>
              <tbody className="bg-slate-900 divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{storeDetail.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm  text-white">{storeDetail.city}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm  text-white">{storeDetail.address}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm  text-white">{formatDate(storeDetail.createdAt)}</div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-4">
              <Link to={'/stores'}>
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
                onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Update Store</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={updatedStore.name}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={updatedStore.city}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={updatedStore.address}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
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
    {/* </div>
  );
}; */}

      {/*  Productos asociados */}
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-4 bg-black text-white">Products Associated to Store</h2>
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
                Type
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
                    Actions
                  </th>
            </tr>
          </thead>
          <tbody className="bg-slate-900 divide-y divide-gray-200">
          {productsAssociated && productsAssociated.data && productsAssociated.data.map(product => (
          <tr key={product.id}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-white">{product.name}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm  text-white">{product.type}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm  text-white">{product.price}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="bg-gray-600 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => handleDeleteStoreAssociated(product.id, storeId)}
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

export default StoreDetail;
