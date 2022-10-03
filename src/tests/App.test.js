import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Criando cobertura de testes 60% da aplicação', () => {
  it('Verificado se renderiza a tela de login com os inputs and button entrar', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailCorrect = 'test@test.com';
    const passwordCorrect = '123456';

    const buttonEntrar = screen.getByRole('button', { name: /entrar/i });
    const inputPassword = screen.getByTestId('password-input');
    const inputEmail = screen.getByTestId('email-input');

    expect(buttonEntrar).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();

    userEvent.type(inputEmail, emailCorrect);
    userEvent.type(inputPassword, passwordCorrect);
    userEvent.click(buttonEntrar);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/carteira');
  });
});

describe('Testando pagina wallet', () => {
  it('teste pagina wallet and button ', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const { location: { pathname } } = history;

    expect(pathname).toBe('/carteira');

    // verificando header
    const emailUser = screen.getByTestId('email-field');
    const valueExpense = screen.getByTestId('total-field');
    const currency = screen.getByTestId('header-currency-field');
    const valueExpenseInput = screen.getByTestId('value-input');
    const inputDescription = screen.getByTestId('description-input');
    const inputAdd = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    expect(emailUser).toBeInTheDocument();
    expect(valueExpense).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    expect(valueExpenseInput).toBeInTheDocument();
    expect(inputDescription).toBeInTheDocument();
    expect(inputAdd).toBeInTheDocument();
  });

  it('Testando adicionar nova despesa', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const { location: { pathname } } = history;

    expect(pathname).toBe('/carteira');

    const valueExpenseInput = screen.getByTestId('value-input');
    const inputDescription = screen.getByTestId('description-input');
    const inputAdd = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    expect(inputAdd).toBeInTheDocument();

    userEvent.type(valueExpenseInput, '20');
    userEvent.type(inputDescription, 'Comprei Garrafa');
    userEvent.click(inputAdd);

    const btnExcluir = await screen.findByTestId('delete-btn');
    const data = await screen.findByRole('cell', {
      name: /alimentação/i,
    });

    expect(btnExcluir).toBeInTheDocument();
    expect(data).toBeInTheDocument();

    userEvent.click(btnExcluir);
  });
  it('Criando teste para 90/100%', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const valueExpenseInput = screen.getByText(/valor da despesa:/i);
    const inputDescription = screen.getByText(/descrição:/i);
    const inputAdd = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    userEvent.type(valueExpenseInput, '20');
    userEvent.type(inputDescription, 'Comprei Ga');
    userEvent.click(inputAdd);

    const editButton = await screen.findByRole('button', {
      name: /editar/i,
    });

    userEvent.click(editButton);

    const btnEdit = await screen.findByRole('button', {
      name: /editar despesas/i,
    });

    expect(btnEdit).toBeInTheDocument();

    userEvent.type(valueExpenseInput, '10');
    userEvent.type(inputDescription, 'Comprei Garrafa');
    userEvent.click(btnEdit);

    const total = await screen.findByText(/despesa total:/i);

    expect(total).toBeInTheDocument();
  });
});
