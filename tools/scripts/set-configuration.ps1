param(
    [string]$ApiUrl,
    [string]$ApiKey,
    [string]$AdminLogin,
    [string]$AdminPassword,
    [string]$BaseServerUrl,
    [string]$DbPassword
)

if (-not $ApiKey -or -not $AdminLogin -or -not $AdminPassword) {
    Write-Host "Error: Missing required parameters. Please provide all required parameters."
    return
}

function Update-Config {
    param (
        [string]$JsonFilePath,
        [string]$NewApiKey,
        [string]$NewAdminLogin,
        [string]$NewAdminPassword,
        [string]$BaseServerUrl
    )

    if (-not $JsonFilePath -or -not $NewApiKey -or -not $NewAdminLogin -or -not $NewAdminPassword) {
        Write-Host "Error: Missing required parameters. Please provide all required parameters."
        return
    }
    Write-Host ""
    Write-Host "Updating configuration file: $JsonFilePath"
    Write-Host "New API Key: $NewApiKey"
    Write-Host "New Admin Login: $NewAdminLogin"
    Write-Host "New Admin Password: $NewAdminPassword"
    Write-Host "New BaseServerUrl: $BaseServerUrl"
    Write-Host ""

    $jsonContent = Get-Content $JsonFilePath | ConvertFrom-Json
    $jsonContent.ApiKey = $NewApiKey
    $jsonContent.CollegeAdmin.Login = $NewAdminLogin
    $jsonContent.CollegeAdmin.Password = $NewAdminPassword
    $jsonContent.FileStorageSettings.BaseServerUrl = $BaseServerUrl
    # $jsonContent.ConnectionStrings.CollegeDb = "Server=sql.bsite.net\MSSQL2016;Database=maksmaryanchuk_CollegeDb;user id = maksmaryanchuk_CollegeDb; password = $DbPassword;MultipleActiveResultSets=true"
    $jsonContent | ConvertTo-Json | Set-Content $JsonFilePath -Force
}

function Update-EnvFile {
    param (
        [string]$EnvFilePath,
        [Hashtable]$VariablesToUpdate
    )

    if (-not $EnvFilePath -or -not $VariablesToUpdate) {
        Write-Host "Error: Missing required parameters for Update-EnvFile. Please provide all required parameters."
        return
    }

    Write-Host "Updating .env file: $EnvFilePath"

    # Clear the contents of the .env file
    $null | Set-Content $EnvFilePath

    foreach ($key in $VariablesToUpdate.Keys) {
        $value = [string]$VariablesToUpdate[$key]
        Write-Host "$key = $value"
        Add-Content $EnvFilePath -Value "$key=$value"
    }
}

Write-Host ""
Write-Host "Set Environment variables and settings 🏃‍♂️🌄"

# Set config for ENV files
$envFilePath = "web/.env"
$catEnvFilePath = "tools/CAT/.env"

$webVariablesToUpdate = @{
    "REACT_APP_API_URL" = $ApiUrl
    "REACT_APP_COLLEGE_API_KEY" = $ApiKey
}

$catVariablesToUpdate = @{
    "VITE_API_URL" = $ApiUrl
    "VITE_APP_COLLEGE_API_KEY" = $ApiKey
    "VITE_KEY_TINY" = "68ghn838ghm2059jnbn5"
}

Write-Host "******************************************"
Update-EnvFile -EnvFilePath $envFilePath -VariablesToUpdate $webVariablesToUpdate
Write-Host ""
Update-EnvFile -EnvFilePath $catEnvFilePath -VariablesToUpdate $catVariablesToUpdate

$settingsJsonPath = "services/College.Api/appsettings.json"

Write-Host ""
Write-Host "API Key: $ApiKey"
Write-Host "Admin Login: $AdminLogin"
Write-Host "Admin Password: $AdminPassword"
Write-Host ""

Update-Config -JsonFilePath $settingsJsonPath -NewApiKey $ApiKey -NewAdminLogin $AdminLogin -NewAdminPassword $AdminPassword -BaseServerUrl $BaseServerUrl
Write-Host ""
Write-Host "Finish!!!🔥"
