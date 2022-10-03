import {
  REMOVE_EXPENSE,
  ADD_EXPENSE,
  EDIT_EXPENSE,
  SUBMIT_EXPENSE_EDITED,
  REQUEST_FAILURE,
  REQUEST_SUCCESS,
  IS_FETCHING,
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
    return { ...state, loading: true };
  case REQUEST_FAILURE:
    return { ...state, error: payload.error, loading: false };
  case REQUEST_SUCCESS:
    return {
      ...state,
      currencies: Object.entries(payload)
        .map(([currency]) => currency)
        .filter((currency) => currency !== 'USDT'),
      loading: false,
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== payload.id),
    };
  case ADD_EXPENSE:
    return {
      ...state, expenses: [...state.expenses, payload],
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      idToEdit: payload,
      isEditing: true,
    };
  case SUBMIT_EXPENSE_EDITED:
    return {
      ...state,
      expenses: [...state.expenses.map((expense) => {
        if (expense.id === payload.id) {
          return {
            ...expense,
            value: payload.value,
            description: payload.description,
            tag: payload.tag,
            currency: payload.currency,
            method: payload.method,
          };
        }
        return expense;
      })],
      isEditing: false,
      idToEdit: '',
    };
  default:
    return state;
  }
}

export default wallet;
