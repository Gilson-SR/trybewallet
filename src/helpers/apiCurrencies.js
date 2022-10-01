export default async function requestApiOfCurrencies() {
  try {
    const url = 'https://economia.awesomeapi.com.br/json/all';
    const request = await fetch(url);
    const response = await request.json();
    return response;
  } catch (error) {
    return error;
  }
}
