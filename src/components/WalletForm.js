import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, arrayOf, string, number, shape, bool } from 'prop-types';
import { requestApi, addExpense, editExpense } from '../redux/actions';
import requestApiCurrency from '../helpers/apiCurrencies';

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
    console.log(this.props);
    requestApiOfCurrencies();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  submitEdit = (e, expense) => {
    e.preventDefault();
    const { submitWalletEditForm, idToEdit } = this.props;
    submitWalletEditForm({ ...expense, id: idToEdit });
    this.setState(INITIAL_STATE);
  };

  submitForm = async (e) => {
    e.preventDefault();
    const { submitWalletForm, expensesLength } = this.props;
    const {
      valueInput: value,
      currencyInput: currency,
      methodInput: method,
      tagInput: tag,
      descriptionInput: description,
    } = this.state;
    const exchangeRates = await requestApiCurrency();
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
    const { currencies, isEditing, isLoading } = props;
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
            value={ valueInput }
            id="value-input"
            data-testid="value-input"
            onChange={ handleChange }
          />
        </label>
        {isLoading ? <p>Carregando</p> : (
          <label htmlFor="currency-input">
            Moeda:
            <select
              name="currencyInput"
              id="currency-input"
              data-testid="currency-input"
              value={ currencyInput }
              onChange={ handleChange }
            >
              {currencies.map((symbol) => (
                <option key={ symbol } value={ symbol }>
                  {symbol}
                </option>
              ))}
            </select>
          </label>)}
        <label htmlFor="method-input">
          Método de pagamento:
          <select
            name="methodInput"
            id="method-input"
            value={ methodInput }
            onChange={ handleChange }
            data-testid="method-input"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
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
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input
            type="text"
            name="descriptionInput"
            id="description-input"
            value={ descriptionInput }
            data-testid="description-input"
            onChange={ handleChange }
          />
        </label>

        {isEditing ? (
          <button type="submit" onClick={ (e) => submitEdit(e, expense) }>
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
  expenses: arrayOf(
    shape({
      id: number,
      currency: string,
      exchangeRates: shape({
        USD: shape({
          ask: string,
          name: string,
        }),
      }),
      description: string,
      value: string,
      tag: string,
      method: string,
    }),
  ),
  currencies: arrayOf(string),
  requestApiOfCurrencies: func,
  expensesLength: number,
  submitWalletForm: func,
  idToEdit: number,
  isEditing: bool,
}.isRequired;

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  expensesLength: wallet.expenses.length,
  idToEdit: wallet.idToEdit,
  expenses: wallet.expenses,
  isEditing: wallet.isEditing,
  isLoading: wallet.loading,
});

const mapDispatchToProps = (dispatch) => ({
  requestApiOfCurrencies: () => dispatch(requestApi()),
  submitWalletForm: (state) => dispatch(addExpense(state)),
  submitWalletEditForm: (state) => dispatch(editExpense(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
