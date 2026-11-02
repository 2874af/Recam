namespace Recam.Api.Models;

public sealed class OperationResult
{
    public bool Succeeded { get; init; }

    public IReadOnlyCollection<string> Errors
    {
        get;
        init;
    } = Array.Empty<string>();

    public static OperationResult Success()
    {
        return new OperationResult
        {
            Succeeded = true
        };
    }

    public static OperationResult Failure(
        params string[] errors)
    {
        return new OperationResult
        {
            Succeeded = false,
            Errors = errors
        };
    }
}
