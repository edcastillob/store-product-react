import { DELETE_PRODUCT, GET_ALL_PRODUCTS, GET_PRODUCT_DETAIL, POST_PRODUCT, UPDATE_PRODUCT } from "./types";
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { endpoint } from "../../components/config/endpoints";




export const allProducts = () => {
    try {
      return async (dispatch) => {
        const { data } = await axios.get(`${endpoint}products/all`);  
        return dispatch({
          type: GET_ALL_PRODUCTS,
          payload: {
            products: data,
          },
        });
      };
    } catch (error) {
      throw new Error(error.message);
    }
  };

  export const postProduct = (productData) => {
    return async (dispatch) => {
      try {
        const response = await axios.post(`${endpoint}products/create`, productData);
        console.log(response)
        if(response.data.success == false){
          toast.error(`${response.data.error}`)
          return
        }
        const { data } = response;        
        dispatch({
          type: POST_PRODUCT,
          payload: {
            product: data,
          },
        });  
        toast.success('the product has been created successfully')

      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          alert(error.response.data.error);
        } else {
          alert('An unexpected error occurred.');
        }
      }
    };
  };

  export const getProductDetail = (productId) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`${endpoint}products/${productId}`);
        const { data } = response;
        dispatch({
          type: GET_PRODUCT_DETAIL,
          payload: {
            productDetail: data,
          },
        });
      } catch (error) {
        console.error('Error getting product detail: ', error);
        toast.error('An error occurred while fetching product detail');
      }
    };
  };
  
  export const updateProduct = (productId, updatedProductData) => {
    return async (dispatch) => {
      try {
        const response = await axios.put(`${endpoint}products/update/${productId}`, updatedProductData);
        console.log(response);
        if (response.data.success === false) {
          toast.error(`${response.data.error}`);
          return;
        }
        const { data } = response;        
        dispatch({
          type: UPDATE_PRODUCT,
          payload: {
            updatedProduct: data,
          },
        });  
        toast.success('The product has been updated successfully');
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          alert(error.response.data.error);
        } else {
          alert('An unexpected error occurred.');
        }
      }
    };
  };

  export const deleteProduct = (productId) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`${endpoint}products/${productId}`);
            console.log(response);
            if (response.data.success === false) {
                toast.error(`${response.data.error}`);
                return;
            }
            dispatch({
                type: DELETE_PRODUCT,
                payload: {
                    productId: productId,
                },
            });
            toast.success('The product has been deleted successfully');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                alert(error.response.data.error);
            } else {
                alert('An unexpected error occurred.');
            }
        }
    };
};