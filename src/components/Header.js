import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import integerValue from '../helpers/integerValue';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const total = expenses.reduce(
      (accumulator, amount) => {
        const { currency, exchangeRates, value } = amount;
        const expenseValue = Number(value);
        const currencyValue = Number(exchangeRates[currency].ask);
        return accumulator + ((expenseValue * currencyValue));
      },
      0,
    );

    return (
      <header>
        <div data-testid="email-field">{ email }</div>
        <div data-testid="total-field">{ integerValue(total) }</div>
        <div data-testid="header-currency-field">BRL</div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.shape({ amount: PropTypes.string })),
}.isRequired;

const mapStateToProps = (state) => {
  const { user, wallet } = state;
  return {
    email: user.email,
    expenses: wallet.expenses,
  };
};

export default connect(mapStateToProps)(Header);
