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
        /// <summary>
        /// 
        /// </summary>
        /// <param name="file"></param>
        /// <param name="directory"></param>
        /// <returns>The randomly-generated filename.</returns>
        Task<string> SaveFileAsync(IFormFile file, string directory);

        Task DeleteFileAsync(string directory, string filename);

        void CheckFilename(string filename);
        void ValidateExtension(string filename, string[] allowedExtensions);

        /// <summary>
        /// Creates a new uniquely-named file in the directory.
        /// </summary>
        /// <returns>The path of the new file.</returns>
        public Task<string> GenerateNewFilename(string directory, string extension);
    }
}
