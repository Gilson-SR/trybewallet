import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const EMAIL_TEST_ID = 'email-input';
const PASSWORD_TEST_ID = 'password-input';
const EMAIL_VALIDO = 'maria@email.com';
const PASSWORD_VALIDO = '123456';
const TOTAL_FIELD = 'total-field';
const EMAIL_FIELD = 'email-field';
const HEADER_CURRENCY_FIELD = 'header-currency-field';
const DESCRIPTION_TEXT_LABEL = 'Descrição:';
const VALUE_TEXT_LABEL = 'Valor:';

describe('Testes Page Login', () => {
  test('Verifica se existe um form de Login', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');

    const inputEmail = screen.getByTestId(EMAIL_TEST_ID);
    const inputPassword = screen.getByTestId(PASSWORD_TEST_ID);
    const btnSubmit = screen.getByRole('button', { name: 'Entrar' });

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(btnSubmit).toBeInTheDocument();
    expect(btnSubmit).toBeDisabled();
  });

  test('Verifica se passado um email e senha valida o botão fica hablitado', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(EMAIL_TEST_ID);
    act(() => {
      userEvent.type(inputEmail, EMAIL_VALIDO);
    });
    expect(inputEmail.value).toBe(EMAIL_VALIDO);

    const inputPassword = screen.getByTestId(PASSWORD_TEST_ID);
    act(() => {
      userEvent.type(inputPassword, PASSWORD_VALIDO);
    });
    expect(inputPassword.value).toBe(PASSWORD_VALIDO);

    const btnSubmit = screen.getByRole('button', { name: 'Entrar' });
    expect(btnSubmit).not.toBeDisabled();
    act(() => {
    });
    userEvent.click(btnSubmit);
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});

describe('Testando page Wallet', () => {
  test('Testando Header', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState: { user: { email: EMAIL_VALIDO } } });

    const emailUsed = screen.getByTestId(EMAIL_FIELD);
    const valueTotal = screen.getByTestId(TOTAL_FIELD);
    const currencyCoin = screen.getByTestId(HEADER_CURRENCY_FIELD);

    expect(emailUsed.innerHTML).toBe(EMAIL_VALIDO);
    expect(valueTotal.innerHTML).toBe('0.00');
    expect(currencyCoin.innerHTML).toBe('BRL');
  });

  test('Testando Wallet Form e adição e remoção da despesa', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState: { user: { email: EMAIL_VALIDO } } });

    const inputValue = screen.getByLabelText(VALUE_TEXT_LABEL);
    expect(inputValue).toBeInTheDocument();
    userEvent.type(inputValue, '10');

    const descriptionInput = screen.getByLabelText(DESCRIPTION_TEXT_LABEL);
    expect(descriptionInput).toBeInTheDocument();
    userEvent.type(descriptionInput, 'Pizza');

    const btnAdd = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(btnAdd).toBeInTheDocument();
    userEvent.click(btnAdd);

    const btnRemover = await screen.findByRole('button', { name: /remover/i });
    const btnEditar = await screen.findByRole('button', { name: /editar/i });

    const tableCellValue = await screen.findByRole('cell', { name: '10.00' });
    const tableCellDescription = await screen.findByRole('cell', { name: 'Pizza' });

    expect(tableCellDescription).toBeInTheDocument();
    expect(tableCellValue).toBeInTheDocument();
    expect(btnEditar).toBeInTheDocument();
    expect(btnRemover).toBeInTheDocument();

    userEvent.click(btnEditar);
    userEvent.type(inputValue, '20');
    userEvent.type(descriptionInput, 'Sanduiche');
    const submitEditingExpense = screen.getByRole('button', { name: /editar despesa/i });
    userEvent.click(submitEditingExpense);

    const tableCellValueEdited = await screen.findByRole('cell', { name: '20.00' });
    const tableCellDescriptionEdited = await screen.findByRole('cell', { name: 'Sanduiche' });

    expect(tableCellDescriptionEdited).toBeInTheDocument();
    expect(tableCellValueEdited).toBeInTheDocument();

    userEvent.click(btnRemover);

    expect(tableCellDescriptionEdited).not.toBeInTheDocument();
    expect(tableCellValueEdited).not.toBeInTheDocument();
  });
});
