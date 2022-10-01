import {
  SUBMIT_LOGIN,
  REQUEST_SUCCESS,
  REQUEST_FAILURE,
  REMOVE_EXPENSE,
  ADD_EXPENSE,
  EDIT_EXPENSE,
  SUBMIT_EDIT,
} from './actionTypes';

// Actions

export const requestFailure = (error) => ({
  type: REQUEST_FAILURE,
  payload: error,
});

export const submitLogin = (payload) => ({
  type: SUBMIT_LOGIN,
  payload,
});

export const requestSuccess = (currencies) => ({
  type: REQUEST_SUCCESS,
  payload: currencies,
});

export const removeExpense = (expense) => ({
  type: REMOVE_EXPENSE,
  payload: expense,
});

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
});

export const editExpense = (id) => ({
  type: EDIT_EXPENSE,
  payload: id,
});

export const submitEdit = (payload) => ({
  type: SUBMIT_EDIT,
  payload,
});

export const requestApi = () => async (dispatch) => {
  try {
    const apiResponse = await requestApiCurrency();
    dispatch(requestSuccess(apiResponse));
  } catch (error) {
    dispatch(requestFailure(error));
  }
};
