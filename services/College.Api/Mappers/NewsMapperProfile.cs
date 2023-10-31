using AutoMapper;
using College.API.ViewModels;
using College.Domain.DTOs;
using College.Domain.Models;

namespace College.API.Mappers;

public class NewsMapperProfile : Profile
{
    public NewsMapperProfile()
    {
        CreateMap<News, NewsDto>().ReverseMap();
        CreateMap<NewsDto, NewsViewModel>().ReverseMap();
    }
}