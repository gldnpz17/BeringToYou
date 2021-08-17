namespace Server.Models.Request
{
    public class TotpLoginBody
    {
        public string Email { get; set; }
        public string TwoFactorToken { get; set; }
        public string Totp { get; set; }
    }
}