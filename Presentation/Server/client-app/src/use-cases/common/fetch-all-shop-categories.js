import delay from "../../helpers/delay";

const fetchAllShopCategories = async () => {
  let response = await fetch('/api/shops/shop-categories', {
    method: 'GET'
  });

  return (await response.json());
};

export default fetchAllShopCategories;