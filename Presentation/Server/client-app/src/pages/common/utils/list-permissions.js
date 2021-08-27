const listPermissions = (preset) => {
  let permissions = [];

  if (preset.canManageAccounts) {
    permissions.push('mengatur akun');
  }
  if (preset.canManagePermissions) {
    permissions.push('mengatur wewenang');
  }
  if (preset.canManageMap) {
    permissions.push('mengatur peta');
  }
  if (preset.canManageShops) {
    permissions.push('mengatur toko beserta dagangannya');
  }
  if (preset.canBackupData) {
    permissions.push('mengatur backup dan restorasi database');
  }

  return permissions;
};

export default listPermissions;