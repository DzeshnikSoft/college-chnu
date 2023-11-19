using AutoMapper;
using College.Domain.DTOs;
using College.Domain.Models;

namespace College.API.Mappers;

public class ImageMapperProfile : Profile
{
    public ImageMapperProfile()
    {
        CreateMap<Image, ImageDto>().ReverseMap();
    }
}