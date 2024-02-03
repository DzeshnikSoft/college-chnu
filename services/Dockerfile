FROM mcr.microsoft.com/dotnet/aspnet:8.0 as base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /services

COPY ["College.Api/College.API.csproj", "/College.Api/"]
COPY ["College.Application/College.Application.csproj", "/College.Application/"]
COPY ["College.Domain/College.Domain.csproj", "/College.Domain/"]
COPY ["College.Data/College.Data.csproj", "/College.Data/"]
COPY ["College.Shared/College.Shared.csproj", "/College.Shared/"]

RUN dotnet restore "/College.Api/College.API.csproj"
COPY . .
WORKDIR "/services/College.Api"
RUN dotnet build "College.API.csproj" -c Release -o /app

FROM build as publish
RUN dotnet publish "College.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

ENV ASPNETCORE_URLS=http://*:5001

EXPOSE 5001
ENTRYPOINT ["dotnet", "College.API.dll"]