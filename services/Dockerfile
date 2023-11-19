FROM mcr.microsoft.com/dotnet/sdk:6.0 AS builder
WORKDIR /services

COPY . /services/
# Restore dotnet
RUN dotnet restore "./College.Api/College.API.csproj"

# Build and publish a release
RUN dotnet publish "./College.Api/College.API.csproj" -c Release -o /app --no-restore

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=builder /app .

EXPOSE 5005
ENTRYPOINT ["dotnet", "College.API.dll"]