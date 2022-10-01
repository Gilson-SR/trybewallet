import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestApi, addExpense, submitEdit } from '../redux/actions';
import apiCurrency from '../helpers/apiCurrencies';

const INITIAL_STATE = {
  valueInput: '',
  currencyInput: 'USD',
  methodInput: 'Dinheiro',
  tagInput: 'Alimentação',
  descriptionInput: '',
};

class WalletForm extends Component {
  state = INITIAL_STATE;

  componentDidMount() {
    const { requestApiOfCurrencies } = this.props;
    requestApiOfCurrencies();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  submitEdit = (event, expense) => {
    event.preventDefault();
    const { submitWalletEditForm, idToEdit} = this.props;
    submitWalletEditForm({ ...expense, id: idToEdit });
    this.setState(INITIAL_STATE);
  };

  render() {
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="value-input">
          Valor:
          <input
            type="number"
            name="valueInput"
            id="valueInput"
            data-testid="value-input"
          />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          <select
            name="currencyInput"
            id="currency-input"
            data-testid="currency-input"
          >
            { currencies.map((currency) => (
              <option
                key={ currency }
                value={ currency }
              >
                { currency }
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method-input">
          Método de pagamento:
          <select
            name="methodInput"
            id="method-input"
            data-testid="method-input"
          >
            <option value="cash">Dinheiro</option>
            <option value="credit">Cartão de crédito</option>
            <option value="debit">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Categoria:
          <select
            name="tagInput"
            id="tag-input"
            data-testid="tag-input"
          >
            <option value="food">Alimentação</option>
            <option value="leisure">Lazer</option>
            <option value="work">Trabalho</option>
            <option value="transport">Transporte</option>
            <option value="health">Saúde</option>
          </select>
        </label>
        <label htmlFor="description-input">
          Descrição
          <input
            type="text"
            name="descriptionInput"
            id="description-input"
            data-testid="description-input"
          />
        </label>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
  requestApiOfCurrencies: PropTypes.func,
}.isRequired;

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  requestApiOfCurrencies: () => dispatch(requestApi()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
