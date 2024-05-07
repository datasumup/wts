using System.Text.Json;

namespace WTSProxy;

public class Worker(
    ILogger<Worker> logger,
    ITaskSchedulerService taskSchedulerService,
    IConfiguration configuration,
    IRequestQueueService requestQueueService)
: BackgroundService
{
    private readonly ILogger<Worker> _logger = logger;
    private readonly ITaskSchedulerService _taskSchedulerService = taskSchedulerService;
    private readonly IConfiguration _configuration = configuration;
    private readonly IRequestQueueService _requestQueueService = requestQueueService;
    private readonly TaskFilter _taskFilters = new() { Paths = configuration.GetSection("Tasks:Paths").Get<IEnumerable<string>>() ?? new List<string>() };

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            if (_logger.IsEnabled(LogLevel.Information))
            {
                _logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);
            }
            _taskSchedulerService.SyncTasks(_taskFilters);
            var pendingMessages = _requestQueueService.ListPendingMessages();


            foreach (var message in pendingMessages)
            {
                _logger.LogInformation("Processing message: {message}", message.Id);
                if (message.Operation == "ExecuteNow")
                {
                    _taskSchedulerService.ExecuteNow(message.TaskId);
                    message.Message = "Task executed Successfully";
                    // epoch time should be same as javascript Date.now()
                    message.CompletedOn = (int)DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1)).TotalSeconds;
                    _requestQueueService.UpdateMessage(message);
                }
                else if (message.Operation == "Schedule")
                {
                    var payload = JsonSerializer.Deserialize<RequestQueueMessagePayload>(message.Payload);
                    if (payload == null)
                    {
                        message.Message = "Invalid payload";
                        message.CompletedOn = (int)DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1)).TotalSeconds;
                        _requestQueueService.UpdateMessage(message);
                        continue;
                    }
                    _logger.LogInformation("Updating task schedule for task: {taskId}", message.TaskId);
                    _taskSchedulerService.UpdateTaskSchedule(message.TaskId, payload);
                    message.Message = "Task schedule updated Successfully";
                    message.CompletedOn = (int)DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1)).TotalSeconds;
                    _requestQueueService.UpdateMessage(message);
                }
            }
            await Task.Delay(_configuration.GetSection("Interval").Get<int>(), stoppingToken);
        }
    }
}
