const fetchProducts = async (computador) => {
  try {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${computador}`);
    const results = await response.json();
    return results;
  } catch (error) {
    throw new Error('You must provide an url');
  }
  };

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
