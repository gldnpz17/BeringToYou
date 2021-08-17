namespace DomainModel.Structs
{
    public struct PasswordAuthenticationResult
    {
        public string Token { get; set; }
        public bool NeedsTwoFactor { get; set; }
    }
}