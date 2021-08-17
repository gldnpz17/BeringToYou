namespace Server.Models.Response
{
    public class PermissionPreset
    {
        public string Name { get; set; }
        public bool CanManageAccounts { get; set; }
        public bool CanManagePermissions { get; set; }
        public bool CanManageMap { get; set; }
        public bool CanManageShops { get; set; }
        public bool CanBackupData { get; set; }
    }
}