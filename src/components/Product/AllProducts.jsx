import React, { useEffect } from "react";
import noImage from '../../assets/no-image.png'
import { useDispatch, useSelector } from "react-redux";
import { allProducts } from "../../redux/actions/actions";
import { Link } from "react-router-dom";

const AllProducts = () => {

    const dispatch = useDispatch();

      useEffect(() => {
        dispatch(allProducts());
      }, []);
      const products = useSelector((state) => state.products);
        
  return (
    <div className="container mx-auto pt-1 sm:pt-2 px-2 sm:px-2 md:px-2 lg:px-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <Link
            title="Detail Product"
            to={`/product/${product.id}`}>
            <img
              src={product.image || noImage}
              alt={product.name}
              className="w-full h-48 object-cover object-center"
            />
            </Link>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-2">{`$${product.price}`}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
