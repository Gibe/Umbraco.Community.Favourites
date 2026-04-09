@ECHO OFF
:: This file can now be deleted!
:: It was used when setting up the package solution (using https://github.com/LottePitcher/opinionated-package-starter)

:: set up git
git init
git branch -M main
git remote add origin https://github.com/Gibe/Umbraco.Community.Favourites

:: ensure latest Umbraco templates used
dotnet new install Umbraco.Templates --force

:: use the umbraco-extension dotnet template to add the package project
cd src
dotnet new umbraco-extension -n "Umbraco.Community.Favourites" --site-domain "https://localhost:44373" --include-example

:: replace package .csproj with the one from the template so has nuget info
cd Cork
del Umbraco.Community.Favourites.csproj
ren Umbraco.Community.Favourites_nuget.csproj Umbraco.Community.Favourites.csproj

:: add project to solution
cd..
dotnet sln add "Umbraco.Community.Favourites"

:: add reference to project from test site
dotnet add "Umbraco.Community.Favourites.TestSite/Umbraco.Community.Favourites.TestSite.csproj" reference "Umbraco.Community.Favourites/Umbraco.Community.Favourites.csproj"
