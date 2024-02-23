import React, { useEffect } from "react";
import { allStores } from "../../redux/actions/actionsStore";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AllStores = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allStores());
  }, []);
  const stores = useSelector((state) => state.stores);
  return (
    <div className="container mx-auto pt-1 sm:pt-2 px-2 sm:px-2 md:px-2 lg:px-8">
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
              
            </th>
          </tr>
        </thead>
        <tbody className="bg-slate-900 divide-y divide-gray-200">
          {stores.map((store, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-white">{store.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm  text-white">{store.city}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm  text-white">{store.address}</div>
              </td>
            <Link
              title="Detail Product"
              to={`/store/${store.id}`}>
              <td className="px-6 py-4 whitespace-nowrap">
               <div className="text-sm  text-white">Detail</div>
              </td>
              </Link>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllStores;
