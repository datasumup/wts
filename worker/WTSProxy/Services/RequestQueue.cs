public interface IRequestQueueService
{
    IEnumerable<RequestQueueMessage> ListMessages();
    IEnumerable<RequestQueueMessage> ListPendingMessages();
    RequestQueueMessage GetMessage(string id);
    void AddMessage(RequestQueueMessage message);
    void UpdateMessage(RequestQueueMessage message);
    void DeleteMessage(string id);
}

public class RequestQueueService : IRequestQueueService
{
    private readonly SqlRepository<RequestQueueMessage> requestQueueRepository;
    public RequestQueueService(IConfiguration configuration)
    {
        requestQueueRepository = new SqlRepository<RequestQueueMessage>(configuration.GetConnectionString("DefaultConnection"));
    }

    public IEnumerable<RequestQueueMessage> ListMessages()
    {
        return requestQueueRepository.List();
    }

    public IEnumerable<RequestQueueMessage> ListPendingMessages()
    {
        return requestQueueRepository.Query("SELECT * FROM RequestQueue WHERE CompletedOn IS NULL");
    }

    public RequestQueueMessage GetMessage(string id)
    {
        return requestQueueRepository.Get(id);
    }

    public void AddMessage(RequestQueueMessage message)
    {
        requestQueueRepository.Add(message);
    }

    public void UpdateMessage(RequestQueueMessage message)
    {
        requestQueueRepository.Update(message);
    }

    public void DeleteMessage(string id)
    {
        requestQueueRepository.Delete(id);
    }

    public void CompleteMessage(string id, string message)
    {
        var requestQueueMessage = requestQueueRepository.Get(id);
        requestQueueMessage.CompletedOn = (int)(DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1))).TotalSeconds;
        requestQueueMessage.Message = message;
        requestQueueRepository.Update(requestQueueMessage);
    }

}