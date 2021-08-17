namespace Server.Models.Request
{
    public class UpdateAccountBody
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string DisplayName { get; set; }
    }
}