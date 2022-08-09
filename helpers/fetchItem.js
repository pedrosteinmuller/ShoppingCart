const fetchItem = async (id) => {
  try {
    const responseAPI = await fetch(
      `https://api.mercadolibre.com/items/${id}`,
    );
    const resultsAPI = await responseAPI.json();
    return resultsAPI;
  } catch (error) {
    throw new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
