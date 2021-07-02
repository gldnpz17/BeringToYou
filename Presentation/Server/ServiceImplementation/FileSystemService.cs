using DomainModel.Services;
using Microsoft.AspNetCore.Http;
using Server.Common.Configuration;
using Server.Common.Exceptions;
using Server.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Server.ServiceImplementation
{
    public class FileSystemService : IFileSystemService
    {
        private readonly ApplicationConfiguration _applicationConfiguration;

        public FileSystemService(ApplicationConfiguration applicationConfiguration)
        {
            _applicationConfiguration = applicationConfiguration;
        }

        public void CheckFilename(string filename)
        {
            var validationRegex = new Regex(@"/[(a-z)(A-Z)(\d).-_]*/g");

            if (validationRegex.Matches(filename).Count == 0)
            {
                throw new AppException(AppExceptionCode.INVALID_FILENAME);
            }
        }

        public Task DeleteFileAsync(string directory, string filename)
        {
            return Task.Run(() =>
            {
                File.Delete(Path.Combine(directory, filename));
            });
        }

        public async Task<string> SaveFileAsync(IFormFile file, string directory)
        {
            var generatedPath = await CreateNewFile(directory, Path.GetExtension(file.FileName));

            using (var fileStream = File.Create(generatedPath))
            {
                await file.CopyToAsync(fileStream);
            }

            return Path.GetFileName(generatedPath);
        }

        public void ValidateExtension(string filename, string[] allowedExtensions)
        {
            var extension = Path.GetExtension(filename);

            if (allowedExtensions.Contains(extension) == false)
            {
                throw new AppException(AppExceptionCode.INVALID_FILE_EXTENSION);
            }
        }

        public async Task<string> CreateNewFile(string directory, string extension)
        {
            var characterSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            string newFilePath = "";
            {
                Random random = new Random();

                var generatedString = new string(
                    Enumerable.Repeat(characterSet, _applicationConfiguration.FileSystemService.GeneratedFilenameLength)
                    .Select(s => s[random.Next(s.Length)]).ToArray());

                var filename = $"{generatedString}.{extension}";

                newFilePath = Path.Combine(directory, filename);
            } while (File.Exists(newFilePath) == false);

            await Task.Run(() =>
            {
                File.Create(Path.Combine(newFilePath));
            });

            return newFilePath;
        }
    }
}
