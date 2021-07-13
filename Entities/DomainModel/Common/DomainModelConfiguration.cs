using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.Common
{
    public class DomainModelConfiguration
    {
        public DomainModelConfiguration(string totpSecretEncryptionKey)
        {
            TotpSecretEncryptionKey = totpSecretEncryptionKey;
        }

        /// <summary>
        /// The length of the salt used to salt & hash the password.
        /// </summary>
        public int PasswordSaltLength { get; set; } = 64;

        /// <summary>
        /// How many times a user could retry to submit a password in a given time interval.
        /// </summary>
        public int PasswordMaxRetries { get; set; } = 10;
        /// <summary>
        /// After this amount of time has elapsed, the number of password submission attempts a user has made will be reset to 0.
        /// </summary>
        public TimeSpan TimeBeforePasswordRetryClear { get; set; } = new TimeSpan(0, 1, 0);
        /// <summary>
        /// If a user has made too many password attempts in a given time interval, they will have to wait for this long.
        /// </summary>
        public TimeSpan PasswordAttemptTimeoutDuration { get; set; } = new TimeSpan(0, 2, 0);

        /// <summary>
        /// The length of the token used to reset an account's password.
        /// </summary>
        public int PasswordResetTokenLength { get; set; } = 32;
        /// <summary>
        /// How long the password reset token will be valid for.
        /// </summary>
        public TimeSpan PasswordResetTokenValidDuration { get; set; } = new TimeSpan(24, 0, 0);

        /// <summary>
        /// How many times a user could retry to submit a password reset request in a given time interval.
        /// </summary>
        public int PasswordResetMaxRetries { get; set; } = 10;
        /// <summary>
        /// How long before a user's password reset submission counter will be reset to 0.
        /// </summary>
        public TimeSpan TimeBeforePasswordResetRetryClear { get; set; } = new TimeSpan(0, 3, 0);
        /// <summary>
        /// How long a user will be prevented from submitting another password reset attempt if they submit too many request.
        /// </summary>
        public TimeSpan PasswordResetAttemptTimeoutDuration { get; set; } = new TimeSpan(0, 10, 0);

        /// <summary>
        /// The encryption key used to encrypt the TOTP shared secrets.
        /// </summary>
        public string TotpSecretEncryptionKey { get; set; }

        /// <summary>
        /// How long a token used to perform 2FA will be valid for.
        /// </summary>
        public TimeSpan TwoFactorTokenValidDuration { get; set; } = new TimeSpan(1, 0, 0);

        /// <summary>
        /// How many characters long the token used to authenticate a user is.
        /// </summary>
        public int AuthenticationTokenLength { get; set; } = 128;
        /// <summary>
        /// How long an authentication token could remain unused.
        /// </summary>
        public TimeSpan AuthenticationTokenMaxUnusedDuration { get; set; } = new TimeSpan(30, 0, 0, 0);

        /// <summary>
        /// How long a user has to wait before they could submit another totp attempt.
        /// </summary>
        public TimeSpan TotpAttemptInterval { get; set; } = new TimeSpan(0, 0, 3);

        /// <summary>
        /// The length of each individual backup codes.
        /// </summary>
        public int BackupCodeLength { get; set; } = 8;
        /// <summary>
        /// How many backup codes will be generated.
        /// </summary>
        public int BackupCodeCount { get; set; } = 10;
        /// <summary>
        /// The length of the salt used to salt & hash the backup codes;
        /// </summary>
        public int BackupCodeSaltLength { get; set; } = 64;

        /// <summary>
        /// The number of backup code submission retries a user is able to submit in a given time interval.
        /// </summary>
        public int BackupCodeMaxRetries { get; set; }
        /// <summary>
        /// How long before a user's backup code submission counter is reset to 0.
        /// </summary>
        public TimeSpan TimeBeforeBackupCodeRetryClear { get; set; }
        /// <summary>
        /// How long before a user could submit anothe backup code request after they have submitted too much.
        /// </summary>
        public TimeSpan BackupCodeAttemptTimeoutDuration { get; set; }

        public int EmailVerificationTokenLength { get; set; }
        public TimeSpan EmailVerificationTokenDuration { get; set; }

        public TimeSpan MerchantSignUpRequestLifespan { get; set; } = new TimeSpan(30, 0, 0, 0);
    }
}
