const login = async (username, password) => {
  let response = await fetch('/api/auth/login/password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  });

  return (response.status === 200);
};

export default login;