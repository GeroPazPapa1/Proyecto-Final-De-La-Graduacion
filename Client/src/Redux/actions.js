import axios from "axios";
import { enqueueSnackbar } from "notistack";

export const addToCart = (product) => {
  return {
    type: "ADD_TO_CART",
    payload: product,
  };
};

export const addToFav = (product) => {
  return {
    type: "ADD_TO_FAV",
    payload: product,
  };
};

export const removeFromFav = (product) => {
  return {
    type: "REMOVE_FAV",
    payload: product,
  };
};

export const deleteProduct = (product) => {
  return {
    type: "DELETE_PRODUCT",
    payload: product,
  };
};

export const emptyCart = () => {
  return {
    type: "EMPTY_CART",
  };
};

export const purchaseProducts = (product) => {
  return {
    type: "PURCHASE_PRODUCTS",
    payload: product,
  };
};

export const getAllCars = () => {
  const endpoint = "/car";
  return async (dispatch) => {
    try {
      const { data } = await axios(endpoint);
      console.log(data);
      return dispatch({
        type: "GET_ALL_CARS",
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const register = (payload) => {
  const userCreate = "/user/create";
  return async function (dispatch) {
    const response = await axios.post(userCreate, payload);
    return response;
  };
};

export const setUserId = (userId) => {
  return {
    type: "SET_USER_ID",
    payload: userId,
  };
};
export const setUserType = (userType) => {
  return {
    type: "SET_USER_TYPE",
    payload: userType,
  };
};

export const setCart = (cartItems) => {
  return {
    type: "SET_CART",
    payload: cartItems,
  };
};

export const getDetail = (id) => {
  const carId = `/car/detail/${id}`;
  if (id) {
    return async function (dispatch) {
      try {
        const detail = await axios.get(carId);
        dispatch({
          type: "GET_DETAIL",
          payload: detail.data,
        });
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };
  }
  return {
    type: "RESET_DETAIL",
  };
};
export const resetDetail = () => {
  return {
    type: "RESET_DETAIL",
  };
};

//----------------------------------------------------------------

export const searchByQuery = (queryParams) => {
  const endpoint = `/car/search?${new URLSearchParams(queryParams).toString()}`;
  return async (dispatch) => {
    try {
      const { data } = await axios(endpoint);
      return dispatch({
        type: "SEARCH_BY_QUERY",
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const searchByQueryFilters = (queryParamsF) => {
  const endpoint = `/user/dashboard/filter?${new URLSearchParams(
    queryParamsF
  ).toString()}`;
  return async (dispatch) => {
    try {
      const { data } = await axios(endpoint);
      return dispatch({
        type: "SEARCH_BY_QUERYFILTERS",
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const brandByQuery = () => {
  const endpoint = "/car/brand";
  return async (dispatch) => {
    try {
      const { data } = await axios(endpoint);
      console.log(data, "brands");
      return dispatch({
        type: "GET_ALL_BRAND",
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const colorByQuery = () => {
  const endpoint = "/car/color";
  return async (dispatch) => {
    try {
      const { data } = await axios(endpoint);
      return dispatch({
        type: "GET_ALL_COLORS",
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const locationByQuery = () => {
  const endpoint = "/car/location";
  return async (dispatch) => {
    try {
      const { data } = await axios(endpoint);
      return dispatch({
        type: "GET_ALL_LOCATIONS",
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getDashboard = (loggedUser) => {
  const endpoint = "/user/dashboard/users";
  const config = loggedUser;
  return async (dispatch) => {
    try {
      const { data } = await axios(endpoint, config);
      console.log(data);
      return dispatch({
        type: "GET_ALL_USERS",
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteUserWithID = (id) => {
  const endpoint = `/user/dashboard/users/${id}`;
  return async (dispatch) => {
    try {
      const { status, data } = await axios.delete(endpoint);
      if (status === 200) {
        enqueueSnackbar("Successfully deleted user", { variant: "success" });
      }
      return dispatch({
        type: "DELETED_USER",
        payload: data,
      });
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        if (status === 403) {
          enqueueSnackbar("Can't remove admin", { variant: "error" });
        }
      }
    }
  };
};

export const editPutUser = (id, type, ban) => {
  const endpoint = `/user/dashboard/users/${id}`;
  return async (dispatch) => {
    try {
      const { status, data } = await axios.put(endpoint, {
        status: type,
        ban: ban,
      });
      if (status === 200) {
        enqueueSnackbar("User edited successfully", { variant: "success" });
      }
      return dispatch({
        type: "EDITED_USER",
        payload: data,
      });
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        if (status === 403) {
          enqueueSnackbar("User not found", { variant: "error" });
        }
      }
    }
  };
};

export const locationLoadedTrue = () => {
  return {
    type: "LOCATION_LOADED",
    payload: true,
  };
};

export const usersLoadedTrue = () => {
  return {
    type: "USERS_LOADED",
    payload: true,
  };
};

export const brandLoadedTrue = () => {
  return {
    type: "BRAND_LOADED",
    payload: true,
  };
};

export const cardsLoadedTrue = () => {
  return {
    type: "CARDS_LOADED",
    payload: true,
  };
};

export const colorsLoadedTrue = () => {
  return {
    type: "COLORS_LOADED",
    payload: true,
  };
};

export const applyFilters = (filters) => {
  return {
    type: "APPLY_FILTER",
    payload: filters,
  };
};

export const applyFilterDb = (filters) => {
  return {
    type: "APPLY_FILTERS_Db",
    payload: filters,
  };
};

export const orderFilters = (order) => {
  return {
    type: "SORT_FILTER",
    payload: order,
  };
};
//------------------------------------------------------------------------

export const postReview = (data) => {
  const endpoint = "/review/";
  return async (dispatch) => {
    try {
      const response = await axios.post(endpoint, data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
};

export const getReviews = (carId) => {
  const endpoint = `/review/${carId}`;
  if (carId) {
    return async (dispatch) => {
      try {
        const { data } = await axios.get(endpoint);
        dispatch({
          type: "REVIEWS_CAR",
          payload: data,
        });
      } catch (error) {
        console.error(error);
      }
    };
  }
  return {
    type: "RESET_REVIEWS",
  };
};

export const resetReview = () => {
  return {
    type: "RESET_REVIEWS",
  };
};

export const deleteReview = (idReview) => {
  const endpoint = `/review/${idReview}`;
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(endpoint);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateReview = (newData) => {
  const endpoint = "/review/";
  return async (dispatch) => {
    try {
      const { data } = await axios.put(endpoint, newData);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
};

export const addMenuOption = (option) => {
  return {
    type: "ADD_MENU_OPTION",
    payload: option,
  };
};
