using System;

namespace Server.Models.Request
{
    public class UpdateOnlineShopInstanceBody
    {
        public Guid PlatformId { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
    }
}