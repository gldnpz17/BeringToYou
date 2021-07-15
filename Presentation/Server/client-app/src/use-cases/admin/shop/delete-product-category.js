const deleteProductCategory = async (categoryId) => {
  let response = await fetch(`/api/product-categories/${categoryId}`, {
    method: 'DELETE'
  });
};

export default deleteProductCategory;