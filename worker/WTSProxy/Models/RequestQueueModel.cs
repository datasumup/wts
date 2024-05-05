
using System.ComponentModel.DataAnnotations.Schema;

[Table("RequestQueue")]
public class RequestQueueMessage
{
    public required string Id { get; set; }
    public required string TaskId { get; set; }
    public required string Operation { get; set; }
    public required string Payload { get; set; }
    // This is a Unix timestamp
    public required int CreatedOn { get; set; }
    // This is a Unix timestamp
    public required int? CompletedOn { get; set; }
    public string? Message { get; set; }
}