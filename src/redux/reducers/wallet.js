import {
  IS_FETCHING,
  REQUEST_FAILURE,
  REQUEST_SUCCESS,
} from '../actions/actionTypes';
// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  loading: false,
};

function wallet(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case IS_FETCHING:
    return {
      ...state,
      loading: true,
    };
  case REQUEST_FAILURE:
    return {
      ...state,
      error: payload.error,
      loading: false,
    };
  case REQUEST_SUCCESS:
    return {
      ...state,
      currencies: Object.entries(payload)
        .map(([currency]) => currency)
        .filter((currency) => currency !== 'USDT'),
      loading: false,
    };
  default:
    return state;
  }
}

export default wallet;
