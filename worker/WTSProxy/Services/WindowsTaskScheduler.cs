using System.Text;
using WTS = Microsoft.Win32.TaskScheduler;

public class TaskFilter
{
    public IEnumerable<string> Paths { get; set; }
}

public interface ITaskSchedulerService
{
    IEnumerable<WindowsTaskModel> ListTasks(TaskFilter? filters = null);
    IEnumerable<WindowsTaskModel> SyncTasks(TaskFilter? filters = null);
    void UpdateTaskSchedule(string id, RequestQueueMessagePayload payload);
    void ExecuteNow(string id);
}

public class WindowsTaskSchedulerService : ITaskSchedulerService
{
    private readonly SqlRepository<WindowsTaskModel> _tasksRepository;
    public WindowsTaskSchedulerService(IConfiguration configuration)
    {
        _tasksRepository = new(configuration.GetConnectionString("DefaultConnection"));
    }

    public IEnumerable<WindowsTaskModel> ListTasks(TaskFilter? filters = null)
    {
        IEnumerable<WTS.Task> tasks;
        using WTS.TaskService taskService = new();
        tasks = taskService.AllTasks;

        if (filters?.Paths != null)
        {
            tasks = tasks.Where(t => filters.Paths.Any(x => x == t.Name));
        }

        return tasks.Select(t => new WindowsTaskModel
        {
            Id = Convert.ToBase64String(Encoding.UTF8.GetBytes(t.Name)),
            Name = t.Name,
            Description = t.Definition.RegistrationInfo.Description ?? "None",
            // Join the triggers into a single string seperated by commas
            Trigger = string.Join(", ", t.Definition.Triggers.Select(x => x.ToString())),
            Status = t.State.ToString()
        });
    }
    public IEnumerable<WindowsTaskModel> SyncTasks(TaskFilter? filters = null)
    {
        var tasks = ListTasks(filters);
        foreach (var task in tasks)
        {
            var existingTask = _tasksRepository.Get(task.Id);
            if (existingTask == null)
            {
                _tasksRepository.Add(task);
            }
            else
            {
                _tasksRepository.Update(task);
            }
        }

        return tasks;
    }

    public void UpdateTaskSchedule(string name, RequestQueueMessagePayload payload)
    {
        using WTS.TaskService taskService = new();
        var task = taskService.FindTask(name, true);
        if (payload.RemoveExistingTriggers ?? false)
        {
            task.Definition.Triggers.Clear();
        }
        {
            task.Definition.Triggers.Clear();
        }
        task.Definition.Triggers.Add(new WTS.TimeTrigger
        {
            StartBoundary = DateTime.Parse(payload.StartBoundary),
            Repetition = new WTS.RepetitionPattern(TimeSpan.Parse(payload.Interval), TimeSpan.Zero),
            Enabled = true
        });
        task.RegisterChanges();
    }

    public void ExecuteNow(string id)
    {
        var name = Encoding.UTF8.GetString(Convert.FromBase64String(id));
        using WTS.TaskService taskService = new();
        var task = taskService.FindTask(name, true);
        task.Run();
    }
}