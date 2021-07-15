const deletePermissionPreset = async (presetName) => {
  await fetch(`/api/admin/permission-presets/${presetName}`, {
    method: 'DELETE'
  });
};

export default deletePermissionPreset;