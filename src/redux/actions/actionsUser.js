import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { endpoint } from "../../components/config/endpoints";



export const registerUser = (userData) => {

    return async (dispatch) => {
      try {
        const response = await axios.post(`${endpoint}users/register`, userData);
        if (response.data.success === true) {
          toast.success('User registered successfully');
        } else {
          toast.warning('A user already exists with that email or username.');
        }
      } catch (error) {
        console.error('Error registering user: ', error);
        toast.error('An error occurred while registering user');
      }
    };
  };




  export const loginUser = (userData) => {
    return async (dispatch) => {
      try {
        const response = await axios.post(`${endpoint}auth/login`, userData);
        if (response.data.accessToken && response.data.user) {
          const { accessToken, user } = response.data;
          localStorage.setItem('accessToken', accessToken);
          dispatch({
            type: "USER_LOGIN",
            payload: {
              accessToken: accessToken,
              user: user
            }
          });
          toast.success('Login successful');
        } else {
          toast.error('Login failed. Please check your credentials.');
        }
      } catch (error) {
        if (error.response) {
          const { data } = error.response;
          if (data && data.message) {
            toast.error(data.message);
          } else {
            toast.error('An error occurred during login');
          }
        } else {
          toast.error('An error occurred during login');
        }
      }
    };
  };
  
