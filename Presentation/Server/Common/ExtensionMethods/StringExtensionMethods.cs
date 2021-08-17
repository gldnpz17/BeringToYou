namespace Server.Common.ExtensionMethods
{
    public static class StringExtensionMethods
    {
        public static bool ContainsKeywords(this string str, string[] keywords)
        {
            foreach (var keyword in keywords)
            {
                if (str.Contains(keyword))
                {
                    return true;
                }
            }

            return false;
        }
    }
}