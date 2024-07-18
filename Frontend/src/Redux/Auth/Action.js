import axios from 'axios';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGOUT,
  USER_INFO,
  OTP_REQUEST,
  OTP_SUCCESS,
  OTP_FAILURE
} from './ActionTypes';
import api, { API_BASE_URL } from '../../config/api';
import notify from '../../utils/notify';
// Register action creators
const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (user) => ({ type: REGISTER_SUCCESS, payload: user });
const registerFailure = error => ({ type: REGISTER_FAILURE, payload: error });

export const register = userData => async dispatch => {
  dispatch(registerRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    const user = response.data;
    if (user.jwt) {
      sessionStorage.setItem('userEmail', JSON.stringify(userData.email));
      const data = { email: userData.email }
      const otpData = await axios.post(`${API_BASE_URL}/auth/signin/getotp`, data)
      if (otpData?.msg ===
        "OTP mail has been sent to your email.") {
        dispatch({
          type: USER_INFO,
          payload: {
            timer: 59,
          },
        });

      }
      // Now it will show the otp pop
    }
    dispatch(registerSuccess(user));
    return response;
  } catch (error) {
    dispatch(registerFailure(error.message));
  }
};

// Login action creators
const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = user => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = error => ({ type: LOGIN_FAILURE, payload: error });

export const login = userData => async dispatch => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
    const user = response.data;
    if (user.jwt) {
      sessionStorage.setItem('userEmail', JSON.stringify(userData.email));
      const data = { email: userData.email }
      const otpData = await axios.post(`${API_BASE_URL}/auth/signin/getotp`, data)
      if (otpData?.data?.msg ===
        "OTP mail has been sent to your email.") {
        dispatch({
          type: USER_INFO,
          payload: {
            timer: 59,
          },
        });
      }
    }
    // if(user.jwt) localStorage.setItem("jwt",user.jwt)
    dispatch(loginSuccess(user));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};



//  get user from token
export const getUser = (token) => {
  return async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const user = response.data;
      dispatch({ type: GET_USER_SUCCESS, payload: user });

    } catch (error) {
      const errorMessage = error.message;
      dispatch({ type: GET_USER_FAILURE, payload: errorMessage });
    }
  };
};

export const logout = (token) => {
  return async (dispatch) => {
    dispatch({ type: LOGOUT });
    localStorage.clear();
  };
};


// otp varification
const otpRequest = () => ({ type: OTP_REQUEST });
const otpSuccess = data => ({ type: LOGIN_SUCCESS, payload: data });
const otpFailure = error => ({ type: LOGIN_FAILURE, payload: error });
export const otpVarify = (userData) => async dispatch => {
  dispatch(otpRequest())
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signin/otpvalidation`, userData)
    if (response) {
      if (response?.data?.msg === "You are Logged In") {
        notify("success", "You are Logged in")
      }
      else if (response?.data?.msg === "OTP Expired") {
        notify("error", "One-Time-Password Expired")
      } else {
        notify("error", "Incorrect One-Time-Password");
      }
      return response;
    }
  } catch (error) {

  }

}