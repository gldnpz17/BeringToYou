const fetchAllProductCategories = async () => {
  let response = await fetch('/api/product-categories', {
    method: 'GET'
  });

  return (await response.json());
};

export default fetchAllProductCategories;