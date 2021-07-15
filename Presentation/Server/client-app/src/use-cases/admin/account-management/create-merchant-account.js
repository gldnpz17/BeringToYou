const createMerchantAccount = async (username, displayName, password) => {
  let response = await fetch('/api/merchants/accounts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      displayName: displayName,
      password: password
    })
  });
};

export default createMerchantAccount;