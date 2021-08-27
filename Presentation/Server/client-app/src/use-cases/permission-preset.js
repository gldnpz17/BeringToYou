const PermissionPreset = {
  createPermissionPreset: async (presetName) => {
    let response = await fetch(`/api/admin/permission-presets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: presetName
      })
    });

    return response;
  },
  readAllPermissionPresets: async () => {
    let response = await fetch('/api/admin/permission-presets', {
      method: 'GET'
    });
  
    return await response.json();
  },
  readAdminAccountPermissionPreset: async (accountId) => {
    let response = await fetch(`/api/admin/accounts/${accountId}/permissions`, {
      method: 'GET'
    });
  
    return await response.json();
  },
  updatePermissionPreset: async (presetName, permissions) => {
    let response = await fetch(`/api/admin/permission-presets/${presetName}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(permissions)
    });

    return response;
  },
  deletePermissionPreset: async (presetName) => {
    let response = await fetch(`/api/admin/permission-presets/${presetName}`, {
      method: 'DELETE'
    });

    return response;
  }
}

export default PermissionPreset;