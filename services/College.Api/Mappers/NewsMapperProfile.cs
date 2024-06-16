using AutoMapper;
using College.API.ViewModels;
using College.Domain.DTOs;
using College.Domain.Models;
using College.Shared.Extensions;

namespace College.API.Mappers;

public class NewsMapperProfile : Profile
{
    public NewsMapperProfile()
    {
        CreateMap<News, NewsDto>().ReverseMap();
        CreateMap<NewsDto, News>().ForMember(e => e.TextContent, src => src.MapFrom(dto => dto.TextContent.ToTextOnlyString()));
        CreateMap<NewsViewModel, NewsDto>()
            .ForMember(dto => dto.Image, src => src.MapFrom(vm => vm.Image))
            .ForMember(dto => dto.TitleBackgroundImage, src => src.MapFrom(vm => vm.TitleBackgroundImage))
            .ReverseMap();
    }
}