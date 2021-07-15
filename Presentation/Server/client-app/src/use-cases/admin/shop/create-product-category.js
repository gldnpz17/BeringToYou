const createProductCategory = async (name) => {
  let response = await fetch('/api/product-categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name
    })
  });
};

export default createProductCategory;