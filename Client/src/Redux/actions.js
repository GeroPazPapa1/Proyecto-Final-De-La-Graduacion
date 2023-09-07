import axios from "axios";

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
  const endpoint = "http://localhost:3001/car";
  return async (dispatch) => {
    try {
      const { data } = await axios(endpoint);
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
  const userCreate = "http://localhost:3001/user/create";
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
  const carId = `http://localhost:3001/car/detail/${id}`
  if (id) {
    return async function (dispatch) {
      try {
        const detail = await axios.get(carId);
        dispatch({
          type: 'GET_DETAIL',
          payload: detail.data
        })
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    }
  }
  return {
    type: 'RESET_DETAIL',
  }
};
export const resetDetail = () => {
  return {
    type: 'RESET_DETAIL',
  };
}


//----------------------------------------------------------------

export const searchByQuery = (queryParams) => {
  const endpoint = `http://localhost:3001/car/search?${new URLSearchParams(
    queryParams
  ).toString()}`;
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

export const brandByQuery = () => {
  const endpoint = "http://localhost:3001/car/brand";
  return async (dispatch) => {
    try {
      const { data } = await axios(endpoint);
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
  const endpoint = "http://localhost:3001/car/color";
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
  const endpoint = "http://localhost:3001/car/location";
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

export const locationLoadedTrue = () => {
  return {
    type: "LOCATION_LOADED",
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

export const orderFilters = (order) => {
  return {
    type: "SORT_FILTER",
    payload: order,
  };
};