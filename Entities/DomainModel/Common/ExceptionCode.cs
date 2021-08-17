﻿namespace DomainModel.Common
{
    public enum ExceptionCode
    {
        EMAIL_OR_PASSWORD_INCORRECT,
        PASSWORD_ATTEMPT_TIMEOUT,
        PASSWORD_RESET_ATTEMPT_TIMEOUT,
        PASSWORD_RESET_TOKEN_EXPIRED,
        INVALID_TWO_FACTOR_TOKEN,
        EXPIRED_TWO_FACTOR_TOKEN,
        TOTP_CREDENTIAL_NOT_SET,
        TOTP_ATTEMPT_TIMEOUT,
        INCORRECT_TOTP_CODE,
        BACKUP_CODE_ATTEMPT_TIMEOUT,
        BACKUP_CODE_CREDENTIAL_NOT_SET,
        INCORRECT_BACKUP_CODE,
        AUTHENTICATION_CODE_EXPIRED,
        EMAIL_VERIFICATION_TOKEN_EXPIRED,
        INCORRECT_EMAIL_VERIFICATION_TOKEN,
        LOGOUT_FAILED_AUTH_TOKEN_NOT_FOUND,
        MERCHANT_ALREADY_VERIFIED
    }
}