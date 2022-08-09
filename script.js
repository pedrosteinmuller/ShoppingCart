// const { fetchItem } = require("./helpers/fetchItem");

const listItems = document.querySelector('.items');

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

const cartItemClickListener = async (event) => {
  // referencia: https://developer.mozilla.org/en-US/docs/Web/API/Element/remove
  event.target.remove();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

// estava sentindo muita dificuldade neste requisito 4, pedi ajuda ao amigo Thiago Lopes que me ajudou
// a criar a lógica e desenvolver, além disso, procurei referências na internet que me auxiliasse tambem,
// como o site developer.mozzila.

const addProductToCart = async () => {
  const buttonsPutToCart = await document.querySelectorAll('.item__add');
  const olList = document.querySelector('.cart__items');
  
  buttonsPutToCart.forEach((element) => {
    element.addEventListener('click', async () => {
     const skuList = addProductFromProductItem(element.parentNode);
     // referência parentNode: https://developer.mozilla.org/pt-BR/docs/Web/API/Node/parentNode
     const itemList = await fetchItem(skuList);
     const { id: sku, title: name, price: salePrice } = itemList;
    //  console.log(item);
     const cardList = createCartItemElement({ sku, name, salePrice });
     olList.appendChild(cardList);
    });
  });
};

window.onload = async () => { 
  await itemsList();
  await addProductToCart();
};
