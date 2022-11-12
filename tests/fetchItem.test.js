require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Testa se fetchItem é uma função.', () => {
    expect(typeof fetchItem).toBe('function');
    expect.assertions(1);
  });
  it('Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
    expect.assertions(1);
  });
  it('Testa se a função fetchItem foi chamada com o endpoint correto', async () => {
    await fetchItem('MLB1615760527');
    const urlInfo = 'https://api.mercadolibre.com/items/MLB1615760527';
    expect(fetch).toHaveBeenCalledWith(urlInfo);  
    expect.assertions(1);
  });
  it('Teste se o retorno da função fetchItem com o argumento do item é uma estrutura de dados igual ao objeto item', async () => {
    const response = await fetchItem('MLB1615760527');
    expect(response).toEqual(item);
    expect.assertions(1);
  });
  it('Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com uma mensagem', async () => {
    try {
      await fetchItem();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
      expect.assertions(1);
    }
  });
});
