FROM mcr.microsoft.com/dotnet/sdk:6.0 AS builder
WORKDIR /services

COPY . /services/
RUN ls
# Restore dotnet
RUN dotnet restore "./College.Api/College.API.csproj"

# Build and publish a release
RUN dotnet publish "./College.Api/College.API.csproj" -c Release -o /app --no-restore

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=builder /app .
RUN ls
ENTRYPOINT ["dotnet", "College.API.dll"] 