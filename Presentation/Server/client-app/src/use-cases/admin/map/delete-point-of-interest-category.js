const deletePointOfInterestCategory = async (categoryId) => {
  let response = await fetch(`/api/map/point-of-interest-categories/${categoryId}`, {
    method: 'DELETE'
  });
};

export default deletePointOfInterestCategory;