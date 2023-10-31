using AutoMapper;
using College.Domain.DTOs;
using College.Domain.Models;

namespace College.API.Mappers;

public class PageMapperProfile : Profile
{
    public PageMapperProfile()
    {
        CreateMap<PageDto, Page>();
    }
}