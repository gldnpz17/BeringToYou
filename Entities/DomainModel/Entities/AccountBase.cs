using DomainModel.Common;
using DomainModel.Services;
using DomainModel.Structs;
using DomainModel.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.Entities
{
    public abstract class AccountBase
    {
        public AccountBase(
            string email, 
            string displayName, 
            string password,
            IPasswordHasher passwordHasher,
            IAlphanumericRng alphanumericRng,
            DomainModelConfiguration domainModelConfiguration)
        {
            Email = email;
            DisplayName = displayName;
            PasswordCredential = new PasswordCredential(this, password, passwordHasher, alphanumericRng, domainModelConfiguration);
        }

        public virtual Guid Id { get; set; }

        public virtual string Email { get; set; }
        public virtual string DisplayName { get; set; }
        public virtual string ProfilePictureFilename { get; set; }

        public virtual PasswordCredential PasswordCredential { get; set; }
        public virtual TotpCredential TotpCredential { get; set; }
        public virtual BackupCodeCredential BackupCodeCredential { get; set; }

        public virtual IList<TwoFactorToken> TwoFactorTokens { get; set; } = new List<TwoFactorToken>();
        public virtual IList<AuthenticationToken> AuthenticationTokens { get; set; } = new List<AuthenticationToken>();

        public virtual bool EmailVerified { get; set; } = false;
        public virtual EmailVerificationToken EmailVerificationToken { get; set; }

        public PasswordAuthenticationResult PasswordLogin(
            string password,
            IAlphanumericRng alphanumericRng,
            IDateTimeService dateTimeService,
            IPasswordHasher passwordHasher,
            DomainModelConfiguration configuration)
        {
            bool passwordValid = PasswordCredential.VerifyPassword(password, dateTimeService, passwordHasher, configuration);

            if (passwordValid)
            {
                if (TotpCredential != null)
                {
                    var now = dateTimeService.GetCurrentDateTime();

                    var token = new TwoFactorToken()
                    {
                        Token = alphanumericRng.GenerateRandomString(128),
                        Expiry = now + configuration.TwoFactorTokenValidDuration
                    };

                    return new PasswordAuthenticationResult()
                    {
                        Token = token.Token,
                        NeedsTwoFactor = false
                    };
                } 
                else
                {
                    var token = GenerateNewAuthenticationToken(alphanumericRng, configuration);

                    return new PasswordAuthenticationResult()
                    {
                        Token = token.Token,
                        NeedsTwoFactor = false
                    };
                }
            }
            else
            {
                throw new DomainModelException(
                    ExceptionCode.EMAIL_OR_PASSWORD_INCORRECT,
                    "Incorrect email or password.");
            }
        }

        public TwoFactorAuthenticationResult TotpLogin(
            string twoFactorToken,
            string totp,
            IDateTimeService dateTimeService,
            IAesEncryptionService encryptionService,
            ITotpService totpService,
            IAlphanumericRng alphanumericRng,
            DomainModelConfiguration configuration)
        {
            CheckTwoFactorTokenIsValid(twoFactorToken, dateTimeService);

            if (TotpCredential == null)
            {
                throw new DomainModelException(ExceptionCode.TOTP_CREDENTIAL_NOT_SET, "TOTP 2FA not set.");
            }

            var totpIsValid = TotpCredential.Verify(totp, encryptionService, totpService, dateTimeService, configuration);

            if (totpIsValid)
            {
                var token = GenerateNewAuthenticationToken(alphanumericRng, configuration);

                AuthenticationTokens.Add(token);

                return new TwoFactorAuthenticationResult()
                {
                    Token = token.Token
                };
            }
            else
            {
                throw new DomainModelException(ExceptionCode.INCORRECT_TOTP_CODE, "The given TOTP code was incorrect.");
            }
        }

        public TwoFactorAuthenticationResult BackupCodeLogin(
            string twoFactorToken, 
            string backupCode,
            IDateTimeService dateTimeService,
            IPasswordHasher passwordHasher,
            IAlphanumericRng alphanumericRng,
            DomainModelConfiguration configuration)
        {
            CheckTwoFactorTokenIsValid(twoFactorToken, dateTimeService);

            if (BackupCodeCredential == null)
            {
                throw new DomainModelException(
                    ExceptionCode.BACKUP_CODE_CREDENTIAL_NOT_SET,
                    "Backup code not set.");
            }

            var backupCodeIsValid = BackupCodeCredential.Verify(backupCode, passwordHasher, dateTimeService, configuration);

            if (backupCodeIsValid)
            {
                var token = GenerateNewAuthenticationToken(alphanumericRng, configuration);

                AuthenticationTokens.Add(token);

                return new TwoFactorAuthenticationResult()
                {
                    Token = token.Token
                };
            }
            else
            {
                throw new DomainModelException(
                    ExceptionCode.INCORRECT_BACKUP_CODE, 
                    "The given backup code is incorrect.");
            }
        }

        public void Logout(string authenticationToken)
        {
            var queryResult = AuthenticationTokens.FirstOrDefault(token => token.Token == authenticationToken);

            if (queryResult == null)
            {
                throw new DomainModelException(
                    ExceptionCode.LOGOUT_FAILED_AUTH_TOKEN_NOT_FOUND, 
                    "The given authentication token was not found.");
            }

            AuthenticationTokens.Remove(queryResult);
        }

        public void SendEmailVerification(
            IAlphanumericRng alphanumericRng,
            IDateTimeService dateTimeService,
            IEmailSender emailSender,
            DomainModelConfiguration configuration)
        {
            EmailVerificationToken = new EmailVerificationToken(alphanumericRng, dateTimeService, emailSender, configuration);
        }

        private void CheckTwoFactorTokenIsValid(string twoFactorToken, IDateTimeService dateTimeService)
        {
            var queryResult = TwoFactorTokens.FirstOrDefault((token) => token.Token == twoFactorToken);

            if (queryResult == null)
            {
                throw new DomainModelException(ExceptionCode.INVALID_TWO_FACTOR_TOKEN, "The given two-factor token doesn't exist.");
            }

            var now = dateTimeService.GetCurrentDateTime();
            if (now > queryResult.Expiry)
            {
                throw new DomainModelException(ExceptionCode.EXPIRED_TWO_FACTOR_TOKEN, "The given two-factor token has expired.");
            }
        }

        private AuthenticationToken GenerateNewAuthenticationToken(
            IAlphanumericRng alphanumericRng,
            DomainModelConfiguration configuration)
        {
            var token = new AuthenticationToken(
                this, 
                alphanumericRng.GenerateRandomString(
                    configuration.AuthenticationTokenLength,
                    cryptographicallySecure: true));

            AuthenticationTokens.Add(token);

            return token;
        }
    }
}
