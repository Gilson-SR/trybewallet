import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestApi, addExpense, submitEditExpense } from '../redux/actions';
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
    const { submitWalletEditForm, idToEdit } = this.props;
    submitWalletEditForm({ ...expense, id: idToEdit });
    this.setState(INITIAL_STATE);
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { submitWalletForm, expensesLength } = this.props;
    const {
      valueInput: value,
      currencyInput: currency,
      methodInput: method,
      tagInput: tag,
      descriptionInput: description,
    } = this.state;
    const exchangeRates = await apiCurrency();
    const expense = {
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
    };
    submitWalletForm({ id: expensesLength, ...expense });
    this.setState(INITIAL_STATE);
  };

  render() {
    const { handleChange, submitForm, props, state, submitEdit } = this;
    const { currencies, isEditing } = props;
    const {
      valueInput,
      currencyInput,
      methodInput,
      tagInput,
      descriptionInput,
    } = state;
    const expense = {
      value: valueInput,
      currency: currencyInput,
      method: methodInput,
      tag: tagInput,
      description: descriptionInput,
    };
    return (
      <form>
        <label htmlFor="value-input">
          Valor:
          <input
            type="number"
            name="valueInput"
            id={ valueInput }
            data-testid="value-input"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          <select
            name="currencyInput"
            id="currency-input"
            data-testid="currency-input"
            value={ currencyInput }
            onChange={ handleChange }
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
            value={ tagInput }
            onChange={ handleChange }
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
            value={ descriptionInput }
            onChange={ handleChange }
            data-testid="description-input"
          />
        </label>
        {isEditing ? (
          <button type="submit" onClick={ (event) => submitEdit(event, expense) }>
            Editar despesa
          </button>
        ) : (
          <button type="submit" onClick={ submitForm }>
            Adicionar despesa
          </button>
        )}
      </form>
    );
  }
}

WalletForm.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      currency: PropTypes.string,
      exchangeRates: PropTypes.shape({
        USD: PropTypes.shape({
          ask: PropTypes.string,
          name: PropTypes.string,
        }),
      }),
      description: PropTypes.string,
      value: PropTypes.string,
      tag: PropTypes.string,
      method: PropTypes.string,
    }),
  ),
  currencies: PropTypes.arrayOf(PropTypes.string),
  requestApiOfCurrencies: PropTypes.func,
  expensesLength: PropTypes.number,
  submitWalletForm: PropTypes.func,
  idToEdit: PropTypes.number,
  isEditing: PropTypes.bool,
}.isRequired;

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  expensesLength: wallet.expenses.length,
  idToEdit: wallet.idToEdit,
  expenses: wallet.expenses,
  isEditing: wallet.isEditing,
});

const mapDispatchToProps = (dispatch) => ({
  requestApiOfCurrencies: () => dispatch(requestApi()),
  submitWalletForm: (state) => dispatch(addExpense(state)),
  submitWalletEditForm: (state) => dispatch(submitEditExpense(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
