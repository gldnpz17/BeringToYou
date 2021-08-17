import delay from "../../helpers/delay";

const fetchAllShops = async (queryParams = 'start=0&count=1000000') => {
  await delay(1000);

  let response = await fetch(`/api/shops?${queryParams}`, {
    method: 'GET'
  });

  return (await response.json());
};

export default fetchAllShops;