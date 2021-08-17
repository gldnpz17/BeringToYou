using System;

namespace Server.Models.Request
{
    public class ResetPasswordBody
    {
        public Guid AccountId { get; set; }
        public string NewPassword { get; set; }
    }
}