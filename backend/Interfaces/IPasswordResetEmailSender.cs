namespace Recam.Api.Interfaces;

public interface IPasswordResetEmailSender
{
    Task SendPasswordResetAsync(
        string email,
        string displayName,
        string resetToken,
        CancellationToken cancellationToken = default);
}
