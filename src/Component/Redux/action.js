import {
  fetchDataMenu,
  fetchDataItem,
  fetchDataAccountCode,
  fetchDataCollector,
  fetchDataCustomer,
  fetchDataCashAccount,
} from "./api";

export const FETCH_MENU_REQUEST = "FETCH_MENU_REQUEST";
export const FETCH_MENU_SUCCESS = "FETCH_MENU_SUCCESS";
export const FETCH_MENU_FAILURE = "FETCH_MENU_FAILURE";

export const fetchMenu = (userId) => async (dispatch) => {
  dispatch({ type: FETCH_MENU_REQUEST });

  try {
    // Log the user ID to the console for verification
    console.log("Fetching data for user ID:", userId);

    const data = await fetchDataMenu(userId);

    // Log the fetched data to the console
    console.log("Fetched data:", data);

    dispatch({ type: FETCH_MENU_SUCCESS, payload: data });
  } catch (error) {
    // Log the error to the console for debugging
    console.error("Error fetching data:", error);

    dispatch({ type: FETCH_MENU_FAILURE, payload: error.message });
  }
};

export const FETCH_ITEM_REQUEST = "FETCH_ITEM_REQUEST";
export const FETCH_ITEM_SUCCESS = "FETCH_ITEM_SUCCESS";
export const FETCH_ITEM_FAILURE = "FETCH_ITEM_FAILURE";

export const fetchItem = () => async (dispatch) => {
  dispatch({ type: FETCH_ITEM_REQUEST });

  try {
    const data = await fetchDataItem();
    console.log("Data fetched for fetchItem:", data);
    dispatch({ type: FETCH_ITEM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_ITEM_FAILURE, payload: error.message });
  }
};

export const FETCH_COLLECTOR_REQUEST = "FETCH_COLLECTOR_REQUEST";
export const FETCH_COLLECTOR_SUCCESS = "FETCH_COLLECTOR_SUCCESS";
export const FETCH_COLLECTOR_FAILURE = "FETCH_COLLECTOR_FAILURE";

export const fetchCollector = () => async (dispatch) => {
  dispatch({ type: FETCH_COLLECTOR_REQUEST });

  try {
    const data = await fetchDataCollector();
    console.log("Data fetched for fetchItem:", data);
    dispatch({ type: FETCH_COLLECTOR_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_COLLECTOR_FAILURE, payload: error.message });
  }
};

export const FETCH_CASHACCOUNT_REQUEST = "FETCH_CASHACCOUNT_REQUEST";
export const FETCH_CASHACCOUNT_SUCCESS = "FETCH_CASHACCOUNT_SUCCESS";
export const FETCH_CASHACCOUNT_FAILURE = "FETCH_CASHACCOUNT_FAILURE";

export const fetchCashAccount = () => async (dispatch) => {
  dispatch({ type: FETCH_CASHACCOUNT_REQUEST });

  try {
    const data = await fetchDataCashAccount();
    console.log("Data fetched for fetchItem:", data);
    dispatch({ type: FETCH_CASHACCOUNT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_CASHACCOUNT_FAILURE, payload: error.message });
  }
};
export const FETCH_CUSTOMER_REQUEST = "FETCH_CUSTOMER_REQUEST";
export const FETCH_CUSTOMER_SUCCESS = "FETCH_CUSTOMER_SUCCESS";
export const FETCH_CUSTOMER_FAILURE = "FETCH_CUSTOMER_FAILURE";

export const fetchCustomer = () => async (dispatch) => {
  dispatch({ type: FETCH_CUSTOMER_REQUEST });

  try {
    const data = await fetchDataCustomer();
    console.log("Data fetched for fetchItem:", data);
    dispatch({ type: FETCH_CUSTOMER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_CUSTOMER_FAILURE, payload: error.message });
  }
};
export const FETCH_ACCOUNT_REQUEST = "FETCH_ACCOUNT_REQUEST";
export const FETCH_ACCOUNT_SUCCESS = "FETCH_ACCOUNT_SUCCESS";
export const FETCH_ACCOUNT_FAILURE = "FETCH_ACCOUNT_FAILURE";

export const fetchAccount = () => async (dispatch) => {
  dispatch({ type: FETCH_ACCOUNT_REQUEST });

  try {
    const data = await fetchDataAccountCode();
    console.log("Data fetched for :", data);
    dispatch({ type: FETCH_ACCOUNT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_ACCOUNT_FAILURE, payload: error.message });
  }
};
