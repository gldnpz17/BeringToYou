using System;

namespace Server.Models.Response
{
    public class MerchantAccountDetailed
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string DisplayName { get; set; }
        public string ProfilePictureFilename { get; set; }
        public MerchantVerificationRequestDetailed VerificationRequest { get; set; }
    }
}