
using Microsoft.Data.SqlClient;
using Dapper;
using System.ComponentModel.DataAnnotations.Schema;

public interface IRepository<T> where T : class
{
    IEnumerable<T> List();
    T Get(string id);
    void Add(T item);
    void Update(T item);
    void Delete(string id);
    IEnumerable<T> Query(string query);
}

public class SqlRepository<T> : IRepository<T> where T : class
{
    private readonly string _connectionString;
    private readonly string _tableName;
    private readonly string _schema;

    public SqlRepository(string connectionString, string schema = "dbo")
    {
        _connectionString = connectionString;
        var tableAttribute = typeof(T).GetCustomAttributes(typeof(TableAttribute), true).FirstOrDefault() as TableAttribute;
        _tableName = tableAttribute?.Name ?? typeof(T).Name;
        _schema = schema;
    }

    public IEnumerable<T> List()
    {
        using SqlConnection connection = new(_connectionString);
        connection.Open();
        var query = $"SELECT * FROM [{_schema}].[{_tableName}]";
        return connection.Query<T>(query);
    }

    public IEnumerable<T> Query(string query)
    {
        using SqlConnection connection = new(_connectionString);
        connection.Open();
        return connection.Query<T>(query);
    }

    public T Get(string id)
    {
        using SqlConnection connection = new(_connectionString);
        connection.Open();
        var query = "SELECT * FROM " + $"[{_schema}].[{_tableName}]" + " WHERE Id = @Id";
        var result = connection.QueryFirstOrDefault<T>(query, new { Id = id });
        return result ?? default!;
    }

    public void Add(T item)
    {
        using SqlConnection connection = new(_connectionString);
        connection.Open();

        using SqlCommand command = connection.CreateCommand();

        // dynamically generate the query based on the properties of the models
        var query = "INSERT INTO " + $"[{_schema}].[{_tableName}]" + " (";
        var values = " VALUES (";
        foreach (var property in typeof(T).GetProperties())
        {
            query += "[" + property.Name + "]" + ", ";
            values += "@" + property.Name + ", ";
            command.Parameters.AddWithValue("@" + property.Name, property.GetValue(item));
        }
        query = query.TrimEnd(',', ' ') + ")";
        values = values.TrimEnd(',', ' ') + ")";
        command.CommandText = query + values;
        command.ExecuteNonQuery();
    }

    public void Update(T item)
    {
        using SqlConnection connection = new(_connectionString);
        connection.Open();

        using SqlCommand command = connection.CreateCommand();

        // dynamically generate the query based on the properties of the models
        var query = "UPDATE " + $"[{_schema}].[{_tableName}]" + " SET ";
        foreach (var property in typeof(T).GetProperties())
        {
            query += "[" + property.Name + "]" + " = @" + property.Name + ", ";
            command.Parameters.AddWithValue("@" + property.Name, property.GetValue(item));
        }
        query = query.TrimEnd(',', ' ') + " WHERE Id = @Id";
        command.CommandText = query;
        command.ExecuteNonQuery();
    }

    public void Delete(string id)
    {
        using SqlConnection connection = new(_connectionString);
        connection.Open();

        using SqlCommand command = connection.CreateCommand();
        command.CommandText = "DELETE FROM " + $"[{_schema}].[{_tableName}]" + " WHERE Id = @Id";
        command.Parameters.AddWithValue("@Id", id);

        command.ExecuteNonQuery();
    }
}