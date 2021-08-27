const AccountManagement = {
  createAdminAccount: async (username, email, displayName, password) => {
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

    return response;
  },
  readAllAdminAccounts: async () => {
    let response = await fetch('/api/admin/accounts', {
      method: 'GET',
    });
  
    return response.json();
  },
  updateAdminAccountPermissions: async (accountId, presetName) => {
    let response = await fetch(`/api/admin/accounts/${accountId}/permissions`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        presetName: presetName
      })
    });

    return response;
  },
  createMerchantAccount: async (username, displayName, password) => {
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

    return response;
  },
  readAllMerchantAccounts: async () => {
    let response = await fetch('/api/merchants/accounts', {
      method: 'GET'
    });
  
    return (await response.json());
  },
  readAllMerchantVerificationRequests: async () => {
    let response = await fetch('/api/merchant/verification-requests', {
      method: 'GET'
    });
  
    return (await response.json());
  },
  readMerchantVerificationRequest: async (accountId) => {
    let response = await fetch(`/api/merchant/verification-requests/${accountId}`, {
      method: 'GET'
    });
  
    return (await response.json());
  },
  verifyMerchantVerificationRequest: async (accountId) => {
    let response = await fetch(`/api/merchant/verification-requests/${accountId}/accept`, {
      method: 'POST'
    });

    return response
  },
  rejectMerchantVerificationRequest: async (accountId) => {
    let response = await fetch(`/api/merchant/verification-requests/${accountId}/reject`, {
      method: 'POST'
    })

    return response;
  },
  deleteAccount: async (accountId) => {
    let response = await fetch(`/api/accounts/${accountId}`, {
      method: 'DELETE'
    });

    return response
  }
}

export default AccountManagement;