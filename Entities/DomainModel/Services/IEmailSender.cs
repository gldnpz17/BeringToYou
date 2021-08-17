namespace DomainModel.Services
{
    public interface IEmailSender
    {
        void SendEmail(Email email);
    }
}