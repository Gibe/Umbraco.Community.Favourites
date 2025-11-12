@ECHO OFF
:: This file can now be deleted!
:: It was used when setting up the package solution (using https://github.com/LottePitcher/opinionated-package-starter)

:: set up git
git init
git branch -M main
git remote add origin https://github.com/g-dove/Cork.git

:: ensure latest Umbraco templates used
dotnet new install Umbraco.Templates --force

:: use the umbraco-extension dotnet template to add the package project
cd src
dotnet new umbraco-extension -n "Cork" --site-domain "https://localhost:44373" --include-example

:: replace package .csproj with the one from the template so has nuget info
cd Cork
del Cork.csproj
ren Cork_nuget.csproj Cork.csproj

:: add project to solution
cd..
dotnet sln add "Cork"

:: add reference to project from test site
dotnet add "Cork.TestSite/Cork.TestSite.csproj" reference "Cork/Cork.csproj"
