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
    void UpdateTaskSchedule(string id, string startTime, string interval);
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
            tasks = tasks.Where(t => filters.Paths.Contains(t.Path));
        }

        return tasks.Select(t => new WindowsTaskModel
        {
            Id = Convert.ToBase64String(Encoding.UTF8.GetBytes(t.Path)),
            Name = t.Name,
            Description = $" Path: {t.Path} | Description: {t.Definition.RegistrationInfo.Description}",
            Trigger = t.Definition.Triggers.FirstOrDefault()?.ToString() ?? "None",
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
    public void UpdateTaskSchedule(string id, string startTime, string interval)
    {
        using WTS.TaskService taskService = new();
        var task = taskService.GetTask(Encoding.UTF8.GetString(Convert.FromBase64String(id)));
        task.Definition.Triggers.Clear();
        task.Definition.Triggers.Add(new WTS.TimeTrigger
        {
            StartBoundary = DateTime.Parse(startTime),
            Repetition = new WTS.RepetitionPattern(TimeSpan.Parse(interval), TimeSpan.Zero),
            Enabled = true
        });
        task.RegisterChanges();
    }
    public void ExecuteNow(string id)
    {
        using WTS.TaskService taskService = new();
        var task = taskService.GetTask(Encoding.UTF8.GetString(Convert.FromBase64String(id)));
        task.Run();
    }
}