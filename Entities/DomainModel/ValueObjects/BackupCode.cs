namespace DomainModel.ValueObjects
{
    public class BackupCode
    {
        public string HashedCode { get; set; }
        public string Salt { get; set; }
    }
}