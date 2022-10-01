import { SUBMIT_LOGIN } from './actionTypes';
// Actions
const submitLogin = (payload) => ({
  type: SUBMIT_LOGIN,
  payload,
});

export default submitLogin;
