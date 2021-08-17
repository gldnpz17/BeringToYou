namespace DomainModel.Services
{
    public interface IAlphanumericRng
    {
        string GenerateRandomString(int length, bool cryptographicallySecure = false, bool uppercase = false);
    }
}