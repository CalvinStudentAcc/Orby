# Orby Database

All database commands for Orby's System.

## Main Database

```sql
CREATE DATABASE OrbyWorkspace;
USE OrbyWorkspace;
```

## User Account Management

```sql
CREATE TABLE AccountManagement (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
```

## Folder Space

```sql
CREATE TABLE Folders (
    FolderID INT AUTO_INCREMENT PRIMARY KEY,
    ParentFolderID INT NULL,
    FolderName VARCHAR(100) NOT NULL,
    DateCreated DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (ParentFolderID)
        REFERENCES Folders(FolderID)
);
```

## Dedicated Modules

### Notespace

```sql
CREATE TABLE Notespace (
    NoteID INT AUTO_INCREMENT PRIMARY KEY,
    FolderID INT NOT NULL,
    Title VARCHAR(100) NOT NULL,
    Category VARCHAR(50),
    Content TEXT,
    DateCreated DATETIME DEFAULT CURRENT_TIMESTAMP,
    DateModified DATETIME DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (FolderID)
        REFERENCES Folders(FolderID)
);
```

### Taskspace

```sql
CREATE TABLE Taskspace (
    TaskID INT AUTO_INCREMENT PRIMARY KEY,
    ParentTaskID INT NULL,
    FolderID INT NOT NULL,
    Title VARCHAR(100) NOT NULL,
    Subtitle VARCHAR(150),
    Description TEXT,
    Notes TEXT,
    IsCompleted BOOLEAN DEFAULT FALSE,
    CompletedAt DATETIME NULL,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    AutoDeleteDays INT DEFAULT 7,
    AutoDeleteEnabled BOOLEAN DEFAULT TRUE,

    FOREIGN KEY (ParentTaskID)
        REFERENCES Taskspace(TaskID),

    FOREIGN KEY (FolderID)
        REFERENCES Folders(FolderID)
);
```

### Budgetspace

```sql
CREATE TABLE Budgetspace (
    TransactionID INT AUTO_INCREMENT PRIMARY KEY,
    FolderID INT NOT NULL,
    Amount DECIMAL(10,2) NOT NULL,
    Type VARCHAR(20) NOT NULL,
    Category VARCHAR(50),
    Note VARCHAR(255),
    Date DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (FolderID)
        REFERENCES Folders(FolderID)
);
```

### Timespace

```sql
CREATE TABLE Timespace (
    EventID INT AUTO_INCREMENT PRIMARY KEY,
    FolderID INT NULL,
    Title VARCHAR(100) NOT NULL,
    Description TEXT,
    Category VARCHAR(50),
    StartDateTime DATETIME NOT NULL,
    EndDateTime DATETIME NOT NULL,
    IsRecurring BOOLEAN DEFAULT FALSE,
    RecurrenceRule VARCHAR(100) NULL,
    ReminderMinutes INT NULL,
    Notes TEXT,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    DateModified DATETIME DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (FolderID)
        REFERENCES Folders(FolderID)
);
```
