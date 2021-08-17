using System.Threading.Tasks;

namespace Server.Services
{
    public interface IImageProcessingService
    {
        /// <summary>
        /// /
        /// </summary>
        /// <param name="originalImagePath"></param>
        /// <param name="thumbnailDirectory"></param>
        /// <param name="maxDimension"></param>
        /// <param name="fileSystemService"></param>
        /// <returns>The randomly-generated filename.</returns>
        public Task<string> GenerateThumbnailAsync(
            string originalImagePath,
            string thumbnailDirectory,
            int maxDimension);
    }
}