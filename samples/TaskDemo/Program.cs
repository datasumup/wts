string message = $"Task Triggered at {DateTime.Now}\n";
string logFilePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "TaskDemoLog.txt");
File.AppendAllText(logFilePath, message);