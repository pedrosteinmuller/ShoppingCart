const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('Teste se, ao executar saveCartItems com o argumento, o método localStorage.setItem é chamado', () => {
    saveCartItems('"<ol><li>Item</li></ol>"');
    expect(localStorage.setItem).toHaveBeenCalled();
    expect.assertions(1);
  });
  it('Teste se, ao executar saveCartItems com o argumento, o método localStorage.setItem é chamado com dois parâmetros', () => {
    saveCartItems('cartItems', '<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '"<ol><li>Item</li></ol>"');
    expect.assertions(1);
  });
});
