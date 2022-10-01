import { SUBMIT_LOGIN } from '../actions/actionTypes';
// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '',
};

function user(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case SUBMIT_LOGIN:
    return {
      email: payload.email,
    };
  default:
    return state;
  }
}

export default user;
