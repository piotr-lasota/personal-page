namespace Domain.Commands.RegisterBlogPost;

public class RegisterBlogPostCommand : ICommand
{
    public RegisterBlogPostCommand(string slug)
    {
        Slug = slug;
    }

    public string Slug { get; }
}