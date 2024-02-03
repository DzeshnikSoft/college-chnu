FROM mcr.microsoft.com/dotnet/aspnet:8.0 as base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /services

COPY . .

RUN dotnet restore "./College.Api/College.API.csproj"
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