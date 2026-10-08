# Orby Database
-- All database commands and table schemas for Orby's System.

-- ========================================================
-- 1. Main Database Creation
-- ========================================================
CREATE DATABASE IF NOT EXISTS OrbyWorkspace;
USE OrbyWorkspace;

-- ========================================================
-- 2. User Account Management
-- ========================================================
CREATE TABLE IF NOT EXISTS Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    DateCreated DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ========================================================
-- 3. Folder Space (3-Level Directory Hierarchy)
-- ========================================================
CREATE TABLE IF NOT EXISTS Folders (
    FolderID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    ParentFolderID INT NULL, -- NULL for Level 1 Root folders
    FolderName VARCHAR(100) NOT NULL,
    DateCreated DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
    FOREIGN KEY (ParentFolderID) REFERENCES Folders(FolderID) ON DELETE CASCADE
);

-- ========================================================
-- 4. Dedicated Modules
-- ========================================================

-- --------------------------------------------------------
-- A. Notespace
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS Notespace (
    NoteID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    FolderID INT NULL, -- Links note to its parent folder
    Title VARCHAR(100) NOT NULL,
    Category VARCHAR(50) DEFAULT 'General',
    Content TEXT,
    IsPinned BOOLEAN DEFAULT FALSE,
    DateCreated DATETIME DEFAULT CURRENT_TIMESTAMP,
    DateModified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
    FOREIGN KEY (FolderID) REFERENCES Folders(FolderID) ON DELETE SET NULL
);

-- --------------------------------------------------------
-- B. Taskspace
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS Taskspace (
    TaskID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    FolderID INT NULL, -- Links task to its parent folder
    ParentTaskID INT NULL, -- Links subtasks up to 2 levels deep
    Title VARCHAR(100) NOT NULL,
    Subtitle VARCHAR(150),
    Description TEXT,
    Notes TEXT,
    IsCompleted BOOLEAN DEFAULT FALSE,
    DateCompleted DATETIME NULL,
    DateCreated DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
    FOREIGN KEY (FolderID) REFERENCES Folders(FolderID) ON DELETE SET NULL,
    FOREIGN KEY (ParentTaskID) REFERENCES Taskspace(TaskID) ON DELETE CASCADE
);

-- --------------------------------------------------------
-- C. Budgetspace
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS Budgetspace (
    TransactionID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    FolderID INT NULL, -- Links transaction/budget sheet to parent folder
    Amount DECIMAL(10,2) NOT NULL,
    Type VARCHAR(20) NOT NULL, -- e.g., 'Income', 'Expense', 'Savings'
    Category VARCHAR(50),
    Note VARCHAR(255),
    Date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
    FOREIGN KEY (FolderID) REFERENCES Folders(FolderID) ON DELETE SET NULL
);

-- --------------------------------------------------------
-- D. Timespace (Placeholder for future schema)
-- --------------------------------------------------------
-- CREATE TABLE IF NOT EXISTS Timespace ( ... );
