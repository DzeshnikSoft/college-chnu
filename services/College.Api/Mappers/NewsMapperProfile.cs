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
        CreateMap<NewsViewModel, NewsDto>()
            .ForMember(dto => dto.Image, src => src.MapFrom(vm => vm.Image))
            .ForMember(dto => dto.TitleBackgroundImage, src => src.MapFrom(vm => vm.TitleBackgroundImage))
            .ReverseMap();
    }
}