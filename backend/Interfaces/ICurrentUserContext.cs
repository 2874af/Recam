using Recam.Api.Enums;

namespace Recam.Api.Interfaces;

public interface ICurrentUserContext
{
    Guid? UserId { get; }

    Guid? PhotographyCompanyId { get; }

    UserRole? Role { get; }
}
