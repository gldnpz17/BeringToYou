using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Services
{
    public interface IFileSystemService
    {
        string GenerateRandomFilename(string extension);
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="file"></param>
        /// <param name="directory"></param>
        /// <returns>The randomly-generated filename.</returns>
        Task<string> SaveFileAsync(IFormFile file, string directory);
        Task SaveFileAsync(IFormFile file, string directory, string filename);

        Task DeleteFileAsync(string directory, string filename);

        void CheckFilename(string filename);
        void ValidateFileFormat(string filename, string[] allowedExtensions);
    }
}
