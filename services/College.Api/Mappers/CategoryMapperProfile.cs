using AutoMapper;
using College.Domain.DTOs;
using College.Domain.Models;

namespace College.API.Mappers;

public class CategoryMapperProfile : Profile
{
    public CategoryMapperProfile()
    {
        CreateMap<CategoryDto, Category>().ReverseMap();
    }
}