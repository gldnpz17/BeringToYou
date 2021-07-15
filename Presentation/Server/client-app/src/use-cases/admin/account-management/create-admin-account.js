const createAdminAccount = async (username, email, displayName, password) => {
  let response = await fetch('/api/admin/accounts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      email: email,
      displayName: displayName,
      password: password
    })
  });
};

export default createAdminAccount;