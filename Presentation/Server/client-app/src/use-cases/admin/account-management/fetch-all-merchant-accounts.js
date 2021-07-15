import delay from "../../../helpers/delay";

const fetchAllMerchantAccounts = async () => {
  let response = await fetch('/api/merchants/accounts', {
    method: 'GET'
  });

  return (await response.json());
};

export default fetchAllMerchantAccounts;