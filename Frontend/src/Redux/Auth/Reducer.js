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
  OTP_REQUEST,
  OTP_SUCCESS,
  OTP_FAILURE,
  USER_INFO_RESET,
  USER_INFO
} from "./ActionTypes";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  otp: null,
  timer: 0
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
      return { ...state, isLoading: true, error: null };
    case REGISTER_SUCCESS:
      return { ...state, isLoading: false };
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case LOGIN_SUCCESS:
      return { ...state, isLoading: false };
    case GET_USER_REQUEST:
      return { ...state, isLoading: true, error: null };
    case GET_USER_SUCCESS:
      return { ...state, isLoading: false, user: action.payload };
    case GET_USER_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case LOGOUT:
      localStorage.removeItem("jwt");
      return { ...state, jwt: null, user: null };
    case USER_INFO_RESET:
      return initialState.timer
    case USER_INFO:
      return { ...state, timer: action.payload.timer }
    case OTP_REQUEST:
      return { ...state, isLoading: true, error: null }
    case OTP_SUCCESS:
      return { ...state, isLoading: false, otp: action.payload }
    case OTP_FAILURE:
      return { ...state, isLoading: false, error: action.payload }
    default:
      return state;
  }
};

export default authReducer;