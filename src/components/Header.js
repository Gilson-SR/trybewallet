import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const total = expenses.reduce((value, { price }) => value + price, 0);
    return (
      <header>
        <div data-testid="email-field">{ email }</div>
        <div data-testid="total-field">{ total.toFixed(2) }</div>
        <div data-testid="header-currency-field">BRL</div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.shape({ price: PropTypes.string })),
}.isRequired;

export default connect(mapStateToProps)(Header);
