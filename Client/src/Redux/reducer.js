const initialState = {
  cartList: [],
  favorites: [],
  purchasedProducts: [],
  allCarsID: [],
  detail: {},
  pageFiltered: [],
  userId: "",
  userType: "",
  pageFiltered: [],

  queryParams: {
    name: "",
    state: "",
    minPrice: "",
    maxPrice: "",
    brand: "",
    color: "",
    location: "",
  },
  filtereds: {
    byQueryOrigin: [],
    byQuery: [],
    brandQuery: [],
    colorQuery: [],
    locationQuery: [],
  },

  carsLoaded: false,
  brandLoaded: false,
  colorsLoaded: false,
  locationLoaded: false,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      const isProductInCart = state.cartList.some(
        (product) => product.name === action.payload.name
      );
      if (isProductInCart) {
        return state; // No hacer cambios si el producto ya está en el carrito
      }
      return {
        ...state,
        cartList: [...state.cartList, action.payload],
      };

    case "ADD_TO_FAV":
      const isProductInFav = state.favorites.some(
        (product) => product.name === action.payload.name
      );
      if (isProductInFav) {
        return state;
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case "REMOVE_FAV":
      return {
        ...state,
        favorites: state.favorites.filter(
          (product) => product.id !== action.payload
        ),
      };
    case "PURCHASE_PRODUCTS":
      // Agregar los productos comprados al estado purchasedProducts
      return {
        ...state,
        purchasedProducts: [...state.purchasedProducts, ...action.payload],
        cartList: [], // Vaciar el carrito después de la compra
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        cartList: state.cartList.filter(
          (product) => product.id !== action.payload
        ),
      };

    case "EMPTY_CART":
      return {
        ...state,
        cartList: [],
      };

    case "GET_ALL_CARS":
      return {
        ...state,
        allCars: action.payload,
        filtereds: {
          ...state.filtereds,
          byQueryOrigin: action.payload, // Actualiza byQueryOrigin con el valor de action.payload
        },
      };

    case "GET_ALL_BRAND":
      return {
        ...state,
        filtereds: {
          ...state.filtereds,
          brandQuery: action.payload, // Actualiza brandQuery con los valores de action.payload
        },
      };

    case "GET_ALL_LOCATIONS":
      return {
        ...state,
        filtereds: {
          ...state.filtereds,
          locationQuery: action.payload,
        },
      };

    case "GET_ALL_CARS_ID":
      console.log("New allCars state:", action.payload); // Consolear el valor de action.payload
      return {
        ...state,
        allCarsID: action.payload,
      };

    case "SEARCH_BY_QUERY":
      return {
        ...state,
        filtereds: {
          ...state.filtereds,
          byQuery: action.payload,
          byQueryOrigin: action.payload,
        },
      };

    case "GET_ALL_COLORS":
      return {
        ...state,
        filtereds: {
          ...state.filtereds,
          colorQuery: action.payload,
        },
      };

    case "LOCATION_LOADED":
      return {
        ...state,
        locationLoaded: action.payload,
      };

    case "COLORS_LOADED":
      return {
        ...state,
        colorsLoaded: action.payload,
      };

    case "CARDS_LOADED":
      return {
        ...state,
        carsLoaded: action.payload,
      };

    case "BRAND_LOADED":
      return {
        ...state,
        brandLoaded: action.payload,
      };

    case "SORT_FILTER":
      let sortedCars;

      if (action.payload === "Defect") {
        sortedCars = state.filtereds.byQueryOrigin.slice();
      } else if (action.payload === "Lower") {
        sortedCars = state.pageFiltered
          .slice()
          .sort((a, b) => a.price - b.price);
      } else if (action.payload === "Higher") {
        sortedCars = state.pageFiltered
          .slice()
          .sort((a, b) => b.price - a.price);
      } else {
        sortedCars = state.pageFiltered.slice();
      }

      return {
        ...state,
        pageFiltered: sortedCars,
      };

    case "APPLY_FILTER":
      let filteredData = null;
      if (action.payload === "originCars") {
        filteredData = state.allCars;
      } else if (action.payload === "queryCars") {
        filteredData = state.filtereds.byQuery;
      }
      return {
        ...state,
        pageFiltered: filteredData,
      };

    case "CREATE_USER":
      return {
        ...state,
      };
    case "SET_USER_ID":
      return {
        ...state,
        userId: action.payload,
      };
    case "SET_USER_TYPE":
      return {
        ...state,
        userType: action.payload,
      };
    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };
    case "RESET_DETAIL":
      return {
        ...state,
        detail: {}, // Restablecer los detalles a un objeto vacío
      };
    default:
      return state;
  }
}

export default rootReducer;
