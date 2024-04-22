using System.Text.RegularExpressions;

namespace College.Domain.Services;

public interface ITextProcessor
{
    (string[] sentences, string[] highlightedSentences) FindSentences(string content, string searchTerm);
}

public class TextProcessor : ITextProcessor
{
    public (string[] sentences, string[] highlightedSentences) FindSentences(string content, string searchTerm)
    {
        if (string.IsNullOrEmpty(content) || string.IsNullOrEmpty(searchTerm))
            return ([], []);

        var sentences = new List<string>();
        var highlightedSentences = new List<string>();
        var pattern = @"(?<=[.!?])\s*\n*\s*";

        foreach (var sentence in Regex.Split(content, pattern))
        {
            if (sentence.Contains(searchTerm))
            {
                var highlightedSentence = Regex.Replace(sentence, $@"\b{searchTerm}\b", $"<span style=\"color: yellow;\">{content}</span>", RegexOptions.IgnoreCase);
                highlightedSentences.Add(highlightedSentence.Trim());
                sentences.Add(sentence.Trim());
            }
        }

        return (sentences.ToArray(), highlightedSentences.ToArray());
    }
}
