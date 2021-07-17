import delay from "../../helpers/delay"

const fetchOnlineShops = async (shopId) => {
  let response = await fetch(`/api/shops/${shopId}/online-shops`, {
    method: 'GET'
  });

  if (response.status === 200) {
    return (await response.json());
  } else {
    return [];
  }
};

export default fetchOnlineShops;