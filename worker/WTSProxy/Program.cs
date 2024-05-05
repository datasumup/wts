using WTSProxy;

var builder = Host.CreateApplicationBuilder(args);
builder.Services.AddSingleton<ITaskSchedulerService, WindowsTaskSchedulerService>();
builder.Services.AddHostedService<Worker>();

var host = builder.Build();
host.Run();
