const integerValue = (value) => {
  const currencyStructure = {
    minDecimalDigits: 2,
    type: 'currency',
    currency: 'BRL',
  };

  const numberRounded = value.toLocaleString('pt-BR', currencyStructure);
  const numberSplited = numberRounded.split('')
    .filter((_, index) => index !== 2).join('');
  const currencyNumber = numberSplited.split('$')[1];
  const fullCurrencyNumber = currencyNumber.split(',');

  return fullCurrencyNumber.join('.');
};

export default integerValue;
