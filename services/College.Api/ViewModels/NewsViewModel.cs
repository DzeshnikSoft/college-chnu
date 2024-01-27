using College.Domain.DTOs;

namespace College.API.ViewModels;

public class NewsViewModel
{
    public string Title { get; set; }

    public string Description { get; set; }

    public ImageDto Image { get; set; }

    public string Content { get; set; }

    public DateTime Date { get; set; }

    public ImageDto TitleBackgroundImage { get; set; }

    public string Url { get; set; }

    public bool Pinned { get; set; } = false;
}