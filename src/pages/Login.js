import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import submitLogin from '../redux/actions';

const MIN_PASSWORD_LENGTH = 6;

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState(
      {
        [name]: value,
      },
      this.verifyLogin,
    );
  };

  verifyLogin = () => {
    const { email, password } = this.state;
    const verifyEmail = email.endsWith('.com')
    && !email.startsWith('@') && email.includes('@');
    const verifyPassword = password.length >= MIN_PASSWORD_LENGTH;
    if (verifyEmail && verifyPassword) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  };

  loginSubmit = (event, state) => {
    event.preventDefault();
    const { history, submitLoginInfo } = this.props;
    submitLoginInfo(state);
    history.push('/carteira');
  };

  render() {
    const { handleChange, loginSubmit, state } = this;
    const { email, password, isDisabled } = state;

    return (
      <div>
        <form>
          <input
            type="email"
            name="email"
            value={ email }
            data-testid="email-input"
            onChange={ handleChange }
          />
          <input
            type="password"
            name="password"
            value={ password }
            data-testid="password-input"
            onChange={ handleChange }
          />
          <button
            type="submit"
            disabled={ isDisabled }
            onClick={ (event) => loginSubmit(event, state) }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  submitLoginInfo: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  submitLoginInfo: (state) => dispatch(submitLogin(state)),
});
export default connect(null, mapDispatchToProps)(Login);
