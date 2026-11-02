using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Recam.Api.Authorization;
using Recam.Api.Enums;
using Recam.Api.Interfaces;

namespace Recam.Api.Services;

public sealed class CurrentUserContext : ICurrentUserContext
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUserContext(
        IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public Guid? UserId
    {
        get
        {
            var principal = _httpContextAccessor.HttpContext?.User;
            var value =
                principal?.FindFirstValue(ClaimTypes.NameIdentifier)
                ?? principal?.FindFirstValue(JwtRegisteredClaimNames.Sub);

            return Guid.TryParse(value, out var userId)
                ? userId
                : null;
        }
    }

    public Guid? PhotographyCompanyId
    {
        get
        {
            var value = _httpContextAccessor.HttpContext?.User
                .FindFirstValue(RecamClaimTypes.CompanyId);

            return Guid.TryParse(value, out var companyId)
                ? companyId
                : null;
        }
    }

    public UserRole? Role
    {
        get
        {
            var value = _httpContextAccessor.HttpContext?.User
                .FindFirstValue(ClaimTypes.Role);

            return Enum.TryParse<UserRole>(value, out var role)
                ? role
                : null;
        }
    }
}
