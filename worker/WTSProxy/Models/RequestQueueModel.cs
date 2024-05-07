
using System.ComponentModel.DataAnnotations.Schema;
using System.Numerics;
using WTS = Microsoft.Win32.TaskScheduler;

[Table("RequestQueue")]
public class RequestQueueMessage
{
    public required string Id { get; set; }
    public required string TaskId { get; set; }
    public required string Operation { get; set; }
    public required string Payload { get; set; }
    // This is a Unix timestamp
    public required Int64? CreatedOn { get; set; }
    // This is a Unix timestamp
    public required Int64? CompletedOn { get; set; }
    public string? Message { get; set; }
}

public class RequestQueueMessagePayload
{
    // public string Name { get; set; }
    public string StartDate { get; set; }
    public string StartTime { get; set; }
    public int? IntervalHours { get; set; }
    public int? IntervalMinutes { get; set; }
    public int? IntervalSeconds { get; set; }
    public bool? RemoveExistingTriggers { get; set; }
    public bool? RunOnce { get; set; }
}