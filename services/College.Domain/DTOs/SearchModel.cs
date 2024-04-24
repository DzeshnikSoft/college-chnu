namespace College.Domain.DTOs;

public class SearchModel(string[] sentences, string[] highlightedSentences)
{
    public string[] HighlightedSentences { get; set; } = highlightedSentences;
    public string[] Sentences { get; set; } = sentences;
}

public class SearchViewModel(
    Guid id,
    string title,
    string url,
    string[] sentences,
    string[] highlightedSentences)
    : SearchModel(sentences, highlightedSentences)
{
    public Guid Id { get; set; } = id;
    public string Title { get; set; } = title;
    public string Url { get; set; } = url;
}