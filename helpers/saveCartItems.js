const saveCartItems = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
