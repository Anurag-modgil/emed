import axios from "axios";

import {
  FIND_PRODUCTS_BY_CATEGORY_REQUEST,
  FIND_PRODUCTS_BY_CATEGORY_SUCCESS,
  FIND_PRODUCTS_BY_CATEGORY_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  FIND_PRODUCTS_BY_SALT_REQUEST,
  FIND_PRODUCTS_BY_SALT_SUCCESS,
  FIND_PRODUCTS_BY_SALT_FAILURE,
  SEARCH_PRODUCTS_REQUEST,
  SEARCH_PRODUCTS_SUCCESS,
  SEARCH_PRODUCTS_FAILURE
} from "./ActionType";
import api, { API_BASE_URL } from "../../../config/api";

export const findProducts = (reqData) => async (dispatch) => {
  const { minPrice, maxPrice, minDiscount, stock, category, search, sort, pageNumber, pageSize } = reqData;
  console.log('search search search', search);
  let categoryCondition = ''
  let searchParam = ''
  if (category !== '' && category !== 'all' && category !== null && category !== undefined) {
    categoryCondition = `&category=${category}`
  }
  if (search !== '' && search !== null && search !== undefined) {
    searchParam = `&search=${search}`
  }
  try {
    dispatch({ type: FIND_PRODUCTS_BY_CATEGORY_REQUEST });

    const { data } = await api.get(
      `/api/products?minPrice=${minPrice}&maxPrice=${maxPrice}&page=${pageNumber}&pageSize=${pageSize}&minDiscount=${minDiscount}&stock=${stock}${searchParam}${categoryCondition}`
    );

    dispatch({
      type: FIND_PRODUCTS_BY_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FIND_PRODUCTS_BY_CATEGORY_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const searchProducts = (query) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_PRODUCTS_REQUEST });

    const { data } = await api.get(`/api/products/search/${query}`);
    // console.log("search products>>", data)
    dispatch({
      type: SEARCH_PRODUCTS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: SEARCH_PRODUCTS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
export const findProductsBySalt = (salt) => async (dispatch) => {
  try {
    const response = await fetch(`/api/products/salt/${salt}`);
    const data = await response.json();
    dispatch({ type: "FETCH_PRODUCTS_BY_SALT_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "FETCH_PRODUCTS_BY_SALT_FAILURE", error });
    throw error;
  }
};


export const findProductById = (reqData) => async (dispatch) => {
  try {
    dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });

    const { data } = await api.get(`/api/products/id/${reqData.productId}`);

    console.log("products by  id : ", data);
    dispatch({
      type: FIND_PRODUCT_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FIND_PRODUCT_BY_ID_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });

    const { data } = await api.post(
      `${API_BASE_URL}/api/admin/products/`,
      product.data
    );

    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: data,
    });

    console.log("created product ", data);
    return data
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProduct = (productId, productData) => async (dispatch) => {
  // console.log("action product", productData)
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const { data } = await api.put(
      `${API_BASE_URL}/api/admin/products/${productId}`,
      productData
    );
    // console.log("update product ",data)
    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data,
    });
    return data;
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  console.log("delete product action", productId)
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    let { data } = await api.delete(`/api/admin/products/${productId}`);

    console.log("delete product ", data)

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: productId,
    });

    console.log("product delte ", data)
  } catch (error) {
    console.log("catch error ", error)
    dispatch({
      type: DELETE_PRODUCT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
