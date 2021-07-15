const logout = async () => {
  let response = await fetch('/api/auth/logout', {
    method: 'POST'
  });
};

export default logout;