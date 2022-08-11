const listItems = document.querySelector('.items');
const clearListButton = document.querySelector('.empty-cart');
const olList = document.querySelector('.cart__items');
const totalPrice = document.querySelector('.total-price');

let saveCartLS = [];

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ id: sku, title: name, thumbnail: image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
};

const itemsList = async () => {
  const resultsList = await fetchProducts();
  // console.log(resultsList);
  resultsList.results.forEach(({ id, title, thumbnail }) => {
    const returned = createProductItemElement({ id, title, thumbnail });
    listItems.appendChild(returned);
  });
};

const addProductFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const calculatePrice = async () => {
  const totalValue = await saveCartLS.reduce((acc, curr) => acc + curr.price, 0);
  console.log(saveCartLS);
 totalPrice.innerText = Math.floor(`${totalValue}`);
};

const cartItemClickListener = (event, sku) => {
  // referencia: https://developer.mozilla.org/en-US/docs/Web/API/Element/remove
  event.target.remove();
  const remove = saveCartLS.findIndex((e) => e.id === sku);
  // referencia findIndex: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
  saveCartLS.splice(remove, 1);
  // referência da aula de monitoria esquenta do guthias e hellen e aula gravada disponibilizada no mesmo dia 09/08
  // saveCartLS = saveCartLS.filter((element) => element.id !== sku); // verificar 
  saveCartItems(saveCartLS);
  calculatePrice();
};

const createCartItemElement = ({ id: sku, title: name, price: salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', (event) => cartItemClickListener(event, sku));
  return li;
};

  // referência da aula de monitoria esquenta do guthias e hellen e aula gravada disponibilizada no mesmo dia 09/08
const addItensLS = (itemList) => {
  saveCartLS.push(itemList);
  saveCartItems('cartItems', saveCartLS);
};
  // referência da aula de monitoria esquenta do guthias e hellen e aula gravada disponibilizada no mesmo dia 09/08
const renderLS = (param) => {
  param.forEach((item) => {
    const itemList = createCartItemElement(item);
    olList.appendChild(itemList);
  });
};

// estava sentindo muita dificuldade neste requisito 4, pedi ajuda ao amigo Thiago Lopes que me ajudou
// a criar a lógica e desenvolver, além disso, procurei referências na internet que me auxiliasse tambem, 
// como o site developer.mozilla.
const addProductToCart = () => {
  const buttonsPutToCart = document.querySelectorAll('.item__add');

  buttonsPutToCart.forEach((element) => {
    element.addEventListener('click', async () => {
     const skuList = addProductFromProductItem(element.parentNode);
     // referência parentNode: https://developer.mozilla.org/pt-BR/docs/Web/API/Node/parentNode
     const itemList = await fetchItem(skuList); // analisar o itemList e o saveCarts

     const cardList = createCartItemElement(itemList);
     olList.appendChild(cardList);
     addItensLS(itemList);
     calculatePrice();
    });
  });
};

// na mentoria de esquenta hoje 09/08/2022 o guthias fez um exemplo similar,
// então utilizei como referência a aula gravada que foi postada no slack
const clearShoppingCart = async () => {
  clearListButton.addEventListener('click', () => {
  olList.innerHTML = '';
  });
  calculatePrice();
};

window.onload = async () => { 
  await itemsList();
  addProductToCart();
  await clearShoppingCart();
  saveCartLS = JSON.parse(getSavedCartItems('cartItems')) || [];
  renderLS(saveCartLS);
};
