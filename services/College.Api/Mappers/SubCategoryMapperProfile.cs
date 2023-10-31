using AutoMapper;
using College.Domain.DTOs;
using College.Domain.Models;

namespace College.API.Mappers;

public class SubCategoryMapperProfile : Profile
{
    public SubCategoryMapperProfile()
    {
        CreateMap<SubCategoryDto, SubCategory>().ReverseMap();
    }
}