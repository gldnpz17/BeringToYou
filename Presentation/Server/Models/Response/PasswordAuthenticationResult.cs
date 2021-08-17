namespace Server.Models.Response
{
    public class PasswordAuthenticationResult
    {
        public string Token { get; set; }
        public bool NeedsTwoFactor { get; set; }
    }
}