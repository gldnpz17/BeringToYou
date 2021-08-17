using System;

namespace Server.Models.Response
{
    public class AccountDetailed
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string DisplayName { get; set; }
        public string Username { get; set; }
        public bool EmailVerified { get; set; }
        public bool TotpEnabled { get; set; }
        public bool BackupCodeEnabled { get; set; }
    }
}