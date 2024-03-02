import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { endpoint } from "../../components/config/endpoints";

export const associateProductToStore = (productId, storeId) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${endpoint}product/${productId}/store/${storeId}`);
      // console.log(response);
      if (response.data.success === false) {
        toast.error(`${response.data.error}`);
        return;
      }
      dispatch({
        type: "ASSOCIATE_PRODUCT_TO_STORE",
        payload: {
          productId: productId,
          storeId: storeId
        },
      });
      toast.success('Product associated to store successfully');
    } catch (error) {
      console.error('Error associating product to store: ', error);
      toast.error('An error occurred while associating product to store');
    }
  };
};

export const associateStoreToProduct = (storeId, productId) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${endpoint}product/${productId}/store/${storeId}`);
      // console.log(response);
      if (response.data.success === false) {
        toast.error(`${response.data.error}`);
        return;
      }
      dispatch({
        type: "ASSOCIATE_STORE_TO_PRODUCT",
        payload: {
          storeId: storeId,
          productId: productId
        },
      });
      toast.success('Store associated to product successfully');
    } catch (error) {
      console.error('Error associating store to product: ', error);
      toast.error('An error occurred while associating store to product');
    }
  };
};

export const updateProductStoreAssociation = (productId, storeId) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${endpoint}product/${productId}/stores`, { storeId });
      // console.log(response);
      if (response.data.success === false) {
        toast.error(`${response.data.error}`);
        return;
      }
      dispatch({
        type: "UPDATE_PRODUCT_STORE_ASSOCIATION",
        payload: {
          productId: productId,
          storeId: storeId
        },
      });
      toast.success('Product-store association updated successfully');
    } catch (error) {
      console.error('Error updating product-store association: ', error);
      toast.error('An error occurred while updating product-store association');
    }
  };
};

export const deleteProductStoreAssociation = (productId, storeId) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${endpoint}product/${productId}/store/${storeId}`);
      // console.log(response);
      if (response.data.success === false) {
        toast.error(`${response.data.error}`);
        return;
      }
      dispatch({
        type: "DELETE_PRODUCT_STORE_ASSOCIATION",
        payload: {
          productId: productId,
          storeId: storeId
        },
      });
      toast.success('Product-store association deleted successfully');
      return
    } catch (error) {
      console.error('Error deleting product-store association: ', error);
      toast.error('An error occurred while deleting product-store association');
    }
  };
};


export const getStoresAssociatedToProduct = (productId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${endpoint}product/${productId}/stores`);
      if (response.data.success === false) {
        toast.error(`${response.data.error}`);
        return;
      }
      dispatch({
        type: "GET_STORES_ASSOCIATED_TO_PRODUCT",
        payload: {
          productId: productId,
          stores: response.data
        },
      });
    } catch (error) {
      console.error('Error getting stores associated to product: ', error);
      toast.error('An error occurred while getting stores associated to product');
    }
  };
};

export const getProductsAssociatedToStore = (storeId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${endpoint}product/${storeId}/products`);
      if (response.data.success === false) {
        toast.error(`${response.data.error}`);
        return;
      }
      dispatch({
        type: "GET_PRODUCTS_ASSOCIATED_TO_STORE",
        payload: {
          storeId: storeId,
          products: response.data
        },
      });
    } catch (error) {
      console.error('Error getting stores associated to product: ', error);
      toast.error('An error occurred while getting stores associated to product');
    }
  };
};
