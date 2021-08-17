namespace DomainModel.Services
{
    public interface ITotpService
    {
        string GetBase32EncodedSecret();

        bool Verify(string totp, string secret);
    }
}