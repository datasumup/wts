-- Script to create the tables in MS SQL Server database
-- SQL script to create the table for Tasks table
DROP TABLE IF EXISTS [dbo].[Tasks];
DROp TABLE IF EXISTS [dbo].[RequestQueue];
IF NOT EXISTS (
    SELECT *
    FROM sys.tables
    WHERE name = 'Tasks'
        AND type = 'U'
) BEGIN CREATE TABLE [dbo].[Tasks] (
    [Id] NVARCHAR(400) PRIMARY KEY,
    [Name] NVARCHAR(MAX) NOT NULL,
    [Description] NVARCHAR(MAX) NOT NULL,
    [Trigger] NVARCHAR(MAX) NOT NULL,
    [Status] NVARCHAR(MAX) NOT NULL
);
END -- SQL Script to create the RequestQueue table
IF NOT EXISTS (
    SELECT *
    FROM sys.tables
    WHERE name = 'RequestQueue'
        AND type = 'U'
) BEGIN CREATE TABLE [dbo].[RequestQueue] (
    [Id] NVARCHAR(400) NOT NULL,
    [TaskId] NVARCHAR(400) NOT NULL,
    [Operation] NVARCHAR(MAX) NOT NULL,
    [Payload] NVARCHAR(max) NOT NULL,
    [CreatedOn] [bigint] NOT NULL,
    [CompletedOn] [bigint] NULL,
    [Message] NVARCHAR(max) NULL,
    CONSTRAINT [PK_RequestQueue] PRIMARY KEY CLUSTERED ([Id] ASC) WITH (
        STATISTICS_NORECOMPUTE = OFF,
        IGNORE_DUP_KEY = OFF
    ) ON [PRIMARY],
    CONSTRAINT [FK_RequestQueue_Tasks] FOREIGN KEY ([TaskId]) REFERENCES [dbo].[Tasks] ([Id])
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY];
END