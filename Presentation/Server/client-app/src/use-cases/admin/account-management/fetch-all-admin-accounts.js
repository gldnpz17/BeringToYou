
const fetchAllAdminAccounts = async () => {
  let response = await fetch('/api/admin/accounts', {
    method: 'GET',
  });

  if (response.status === 200) {
    return await response.json();
  } else {
    return [];
  }
};

export default fetchAllAdminAccounts;