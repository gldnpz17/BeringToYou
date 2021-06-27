using DomainModel.Common;
using DomainModel.Services;
using DomainModel.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.Entities
{
    public class BackupCodeCredential
    {
        public BackupCodeCredential(AccountBase account)
        {
            Account = account;
        }

        public virtual AccountBase Account { get; set; }

        public virtual IList<BackupCode> BackupCodes { get; set; } = new List<BackupCode>();

        public virtual DateTime BackupCodeAttemptMistakeClear { get; set; }
        public virtual int BackupCodeAttemptMistakeCounter { get; set; }
        public virtual DateTime BackupCodeAttemptTimeoutExpired { get; set; }

        public bool Verify(
            string code, 
            IPasswordHasher passwordHasher, 
            IDateTimeService dateTimeService,
            DomainModelConfiguration configuration)
        {
            var now = dateTimeService.GetCurrentDateTime();
            
            if (now > BackupCodeAttemptTimeoutExpired)
            {
                if (CodeIsValid())
                {
                    return true;
                }
                else
                {
                    if (now > BackupCodeAttemptMistakeClear)
                    {
                        BackupCodeAttemptMistakeCounter = 0;
                        BackupCodeAttemptMistakeClear = now + configuration.TimeBeforeBackupCodeRetryClear;
                    }

                    BackupCodeAttemptMistakeCounter++;

                    if (BackupCodeAttemptMistakeCounter > configuration.BackupCodeMaxRetries)
                    {
                        BackupCodeAttemptTimeoutExpired = now + configuration.BackupCodeAttemptTimeoutDuration;
                    }

                    return false;
                }
            }
            else
            {
                throw new DomainModelException(
                    ExceptionCode.BACKUP_CODE_ATTEMPT_TIMEOUT,
                    "Too many attempts has been made. please try again later");
            }

            bool CodeIsValid()
            {
                foreach (var BackupCode in BackupCodes)
                {
                    var hash = passwordHasher.Hash(code, BackupCode.Salt);

                    if (hash == BackupCode.HashedCode)
                    {
                        return true;
                    }
                }

                return false;
            }
        }

        public IList<string> GenerateBackupCodes(
            IPasswordHasher passwordHasher, 
            IAlphanumericRng alphanumericRng,
            DomainModelConfiguration configuration)
        {
            var rawCodes = new List<string>();

            for (int x = 0; x < configuration.BackupCodeCount; x++)
            {
                rawCodes.Add(alphanumericRng.GenerateRandomString(configuration.BackupCodeLength, uppercase: true));
            }

            var newBackupCodes = new List<BackupCode>();

            foreach (var rawCode in rawCodes)
            {
                var salt = alphanumericRng.GenerateRandomString(
                    configuration.BackupCodeSaltLength,
                    cryptographicallySecure: true);

                newBackupCodes.Add(new BackupCode()
                {
                    HashedCode = passwordHasher.Hash(rawCode, salt),
                    Salt = salt
                });
            }

            BackupCodes = newBackupCodes;

            return rawCodes;
        }
    }
}
