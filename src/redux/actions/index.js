import {
  SUBMIT_LOGIN,
  IS_FETCHING,
  REQUEST_SUCCESS,
  REQUEST_FAILURE,
} from './actionTypes';

// Actions
export const isFetching = () => ({
  type: IS_FETCHING,
});

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

export const requestApi = () => async (dispatch) => {
  try {
    dispatch(isFetching());
    const apiResponse = await requestApiCurrency();
    dispatch(requestSuccess(apiResponse));
  } catch (error) {
    dispatch(requestFailure(error));
  }
};
