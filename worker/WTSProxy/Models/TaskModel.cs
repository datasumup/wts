
using System.ComponentModel.DataAnnotations.Schema;

[Table("Tasks")]
public class WindowsTaskModel
{
    public required string Id { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public required string Trigger { get; set; }
    public required string Status { get; set; }

}


