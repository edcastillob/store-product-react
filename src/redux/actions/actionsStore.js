import axios from 'axios';
import { toast } from 'react-toastify';
import { GET_ALL_STORES, GET_STORE_DETAIL, POST_STORE, UPDATE_STORE, DELETE_STORE } from './types';
import { endpoint } from '../../components/config/endpoints';

export const allStores = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${endpoint}stores/all`);
      return dispatch({
        type: GET_ALL_STORES,
        payload: {
          stores: data,
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const getStoreDetail = (storeId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${endpoint}stores/${storeId}`);
      const { data } = response;
      dispatch({
        type: GET_STORE_DETAIL,
        payload: {
          storeDetail: data,
        },
      });
    } catch (error) {
      console.error('Error getting store detail: ', error);
      toast.error('An error occurred while fetching store detail');
    }
  };
};

export const postStore = (storeData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${endpoint}stores/create`, storeData);
      if (response.data.success === false) {
        toast.error(`${response.data.error}`);
        return;
      }
      const { data } = response;
      dispatch({
        type: POST_STORE,
        payload: {
          store: data,
        },
      });
      toast.success('The store has been created successfully');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert('An unexpected error occurred.');
      }
    }
  };
};

export const updateStore = (storeId, updatedStoreData) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${endpoint}stores/update/${storeId}`, updatedStoreData);
      if (response.data.success === false) {
        toast.error(`${response.data.error}`);
        return;
      }
      const { data } = response;
      dispatch({
        type: UPDATE_STORE,
        payload: {
          updatedStore: data,
        },
      });
      toast.success('The store has been updated successfully');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert('An unexpected error occurred.');
      }
    }
  };
};

export const deleteStore = (storeId) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${endpoint}stores/${storeId}`);
      if (response.data.success === false) {
        toast.error(`${response.data.error}`);
        return;
      }
      dispatch({
        type: DELETE_STORE,
        payload: {
          storeId: storeId,
        },
      });
      toast.success('The store has been deleted successfully');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert('An unexpected error occurred.');
      }
    }
  };
};
