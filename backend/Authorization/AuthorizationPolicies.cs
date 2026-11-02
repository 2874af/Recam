namespace Recam.Api.Authorization;

public static class AuthorizationPolicies
{
    public const string AdminOnly =
        nameof(AdminOnly);

    public const string StaffOnly =
        nameof(StaffOnly);

    public const string AgentOnly =
        nameof(AgentOnly);

    public const string CompanyMember =
        nameof(CompanyMember);
}