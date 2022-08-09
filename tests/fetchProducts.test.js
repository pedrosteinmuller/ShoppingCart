require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Testes da função fetchProducts', () => {
  it('Testa se fetchProducts é uma função.', () => {
    expect(typeof fetchProducts).toBe('function');
    expect.assertions(1);
  });
});
  it('Testa se com argumento na função fetchProducts a função fetch foi chamada', async () => {
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalled();
    expect.assertions(1);
  });
  it('Testa se a função fetch foi chamada com o endpoint correto', async () => {
    await fetchProducts('computador');
    const urlInfo = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toHaveBeenCalledWith(urlInfo);  
    expect.assertions(1);
  });
  it('Teste se o retorno da função fetchProducts com o argumento é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const response = await fetchProducts('computador');
    expect(response).toEqual(computadorSearch);
    expect.assertions(1);
  });
  it('Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com uma mensagem', async () => {
    try {
      expect.assertions(1);
      await fetchProducts('computador');
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  });