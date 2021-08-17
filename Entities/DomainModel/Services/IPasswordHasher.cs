namespace DomainModel.Services
{
    public interface IPasswordHasher
    {
        string Hash(string password, string salt);
    }
}