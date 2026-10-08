# Orby Database
All database commands for Orby's System.

## Main Database
CREATE DATABASE OrbyWorkspace;
USE OrbyWorkspace;

## User Account Management
CREATE TABLE AccountManagement (
    username VARCHAR(50),
    email VARCHAR(255),
    password VARCHAR(255)
);

## Folder Space
CREATE TABLE Folders (
    FolderID INT,
    ParentFolderID INT,
    FolderName VARCHAR(100),
    DateCreated DATETIME
);

## Dedicated Modules

### Notespace
CREATE TABLE Notespace (
    NoteID INT,
    FolderID INT,
    Title VARCHAR(100),
    Category VARCHAR(50),
    Content TEXT,
    DateCreated DATETIME,
    DateModified DATETIME
);

### Taskspace
CREATE TABLE Taskspace (
    TaskID INT,
    ParentTaskID INT,
    FolderID INT,
    Title VARCHAR(100),
    Subtitle VARCHAR(150),
    Description TEXT,
    Notes TEXT
);

### Budgetspace
CREATE TABLE Budgetspace (
    TransactionID INT,
    FolderID INT,
    Amount DECIMAL(10,2),
    Type VARCHAR(20),
    Category VARCHAR(50),
    Note VARCHAR(255),
    Date DATETIME
);
