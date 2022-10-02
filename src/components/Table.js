import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import integerValue from '../helpers/integerValue';
import { editExpense, removeExpense } from '../redux/actions';

class Table extends Component {
  render() {
    const { expenses, toRemoveExpense, toEditExpense } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => {
            const {
              id,
              currency,
              exchangeRates,
              description,
              value,
              tag,
              method,
            } = expense;
            const valueExpense = Number(value);
            const valueCurrency = parseFloat(exchangeRates[currency].ask);
            const valorConvertido = valueExpense * valueCurrency;
            const nameCoin = exchangeRates[currency].name;
            return (
              <tr key={ id }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{integerValue(valueExpense)}</td>
                <td>{nameCoin}</td>
                <td>{integerValue(valueCurrency)}</td>
                <td>{integerValue(valorConvertido)}</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    onClick={ () => toEditExpense(id) }
                    data-testid="edit-btn"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={ () => toRemoveExpense(expense) }
                    data-testid="delete-btn"
                  >
                    Remover
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    currency: PropTypes.string,
    exchangeRates: PropTypes.shape({ USD: PropTypes.shape({
      ask: PropTypes.string,
      name: PropTypes.string,
    }) }),
    description: PropTypes.string,
    value: PropTypes.string,
    tag: PropTypes.string,
    method: PropTypes.string,
  })),
  toRemoveExpense: PropTypes.func,
}.isRequired;

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  toRemoveExpense: (expenseToBeRemoved) => dispatch(removeExpense(expenseToBeRemoved)),
  toEditExpense: (idExpenseToBeEdited) => dispatch(editExpense(idExpenseToBeEdited)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
