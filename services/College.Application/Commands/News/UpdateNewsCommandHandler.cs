﻿using College.Data.Context;
using College.Domain.DTOs;
using College.Domain.Exceptions;
using College.Domain.Models;
using College.Shared.Extensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace College.Application.Commands.News;

public class UpdateNewsCommand(NewsDto news) : IRequest
{
    public NewsDto News { get; set; } = news.ThrowIfNull();
}

public class UpdateNewsCommandHandler(CollegeDbContext db) : IRequestHandler<UpdateNewsCommand>
{
    private readonly CollegeDbContext _db = db;

    public async Task Handle(UpdateNewsCommand request, CancellationToken cancellationToken)
    {
        var news = await _db.News
            .Include(n => n.Image)
            .SingleOrDefaultAsync(n => n.Id == request.News.Id, cancellationToken)
            ?? throw new EntityNotFoundException(nameof(News), request.News.Id);

        if (request.News.Title is not null)
        {
            news.Title = request.News.Title;
        }
        if (request.News.Pinned.HasValue)
        {
            news.Pinned = request.News.Pinned;
        }
        if (request.News.Content is not null)
        {
            news.Content = request.News.Content;
        }
        if (request.News.Description is not null)
        {
            news.Description = request.News.Description;
        }
        if (request.News.Date.HasValue)
        {
            news.Date = request.News.Date.Value;
        }
        if (request.News.Image is not null)
        {
            news.Image ??= new Image();

            if (request.News.Image.Alt is not null)
                news.Image.Alt = request.News.Image.Alt;
            if (request.News.Image.Url is not null)
                news.Image.Url = request.News.Image.Url;
        }

        _db.News.Update(news);
        await _db.SaveChangesAsync(cancellationToken);
    }
}
