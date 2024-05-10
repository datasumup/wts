
Remove-Item -Path ./publish -ErrorAction Ignore -Recurse
dotnet publish ./WTSProxy.csproj  -c Release --self-contained true -p:PublishSingleFile=true -o ./publish
Remove-Item -Path ./publish/appSettings.Development.json -ErrorAction Ignore
Remove-Item -Path ./publish/WTSProxy.pdb -ErrorAction Ignore