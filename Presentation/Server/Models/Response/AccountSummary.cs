using System;

namespace Server.Models.Response
{
    public class AccountSummary
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string DisplayName { get; set; }
        public string Username { get; set; }
        public string ProfilePictureFilename { get; set; }
    }
}