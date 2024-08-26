import { combineReducers } from "redux";
import {
  FETCH_MENU_REQUEST,
  FETCH_MENU_SUCCESS,
  FETCH_MENU_FAILURE,
  FETCH_ITEM_FAILURE,
  FETCH_ITEM_REQUEST,
  FETCH_ITEM_SUCCESS,
  FETCH_ACCOUNT_FAILURE,
  FETCH_ACCOUNT_REQUEST,
  FETCH_ACCOUNT_SUCCESS,
  FETCH_COLLECTOR_FAILURE,
  FETCH_COLLECTOR_REQUEST,
  FETCH_COLLECTOR_SUCCESS,
  FETCH_CUSTOMER_FAILURE,
  FETCH_CUSTOMER_REQUEST,
  FETCH_CUSTOMER_SUCCESS,
  FETCH_CASHACCOUNT_FAILURE,
  FETCH_CASHACCOUNT_REQUEST,
  FETCH_CASHACCOUNT_SUCCESS,
} from "./action";

const menuReducer = (
  state = { loading: false, data: [], error: null },
  action
) => {
  switch (action.type) {
    case FETCH_MENU_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_MENU_SUCCESS:
      return {
        ...state,
        loading: false,
        data: Array.isArray(action.payload) ? action.payload : [],
        error: null,
      };
    case FETCH_MENU_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const itemReducer = (
  state = { loading: false, data: null, error: null },
  action
) => {
  switch (action.type) {
    case FETCH_ITEM_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_ITEM_SUCCESS:
      console.log("Received data in reducer:", action.payload);
      return { ...state, loading: false, data: action.payload, error: null };
    case FETCH_ITEM_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
const collectorReducer = (
  state = { loading: false, data: null, error: null },
  action
) => {
  switch (action.type) {
    case FETCH_COLLECTOR_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_COLLECTOR_SUCCESS:
      console.log("Received data in reducer:", action.payload);
      return { ...state, loading: false, data: action.payload, error: null };
    case FETCH_COLLECTOR_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
const cashaccountReducer = (
  state = { loading: false, data: null, error: null },
  action
) => {
  switch (action.type) {
    case FETCH_CASHACCOUNT_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_CASHACCOUNT_SUCCESS:
      console.log("Received cashaccountReducer in reducer:", action.payload);
      return { ...state, loading: false, data: action.payload, error: null };
    case FETCH_CASHACCOUNT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
const customerReducer = (
  state = { loading: false, data: null, error: null },
  action
) => {
  switch (action.type) {
    case FETCH_CUSTOMER_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_CUSTOMER_SUCCESS:
      console.log("Received data in reducer:", action.payload);
      return { ...state, loading: false, data: action.payload, error: null };
    case FETCH_CUSTOMER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
const accountReducer = (
  state = { loading: false, data: null, error: null },
  action
) => {
  switch (action.type) {
    case FETCH_ACCOUNT_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_ACCOUNT_SUCCESS:
      console.log("Received data in reducer:", action.payload);
      return { ...state, loading: false, data: action.payload, error: null };
    case FETCH_ACCOUNT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  item: menuReducer,
  itemlist: itemReducer,
  AccountCodeList: accountReducer,
  collectorList: collectorReducer,
  customerList: customerReducer,
  cashAccountList: cashaccountReducer,
});

export default rootReducer;
