# Orby System
Orby Workspace System Architecture, Structure, and Flow Layout

## System Architecture
1. Landing Page
2. Login / Sign Up
3. Dashboard
4. Spaces

## System Structure & Data Models 

### 1. Landing Page
#### Information (In Order)
* **Introduction**
  * Navigation
  * Hero Section
  * About Orby
  * Why Orby
  * Features
  * -> Compact Demo
* **After Demo**
  * Creators
  * Footer
  
#### Compact Demo
* **Notespace**
* **Taskspace**
* **Budgetspace**
* **Timespace**

### 2. User Account Management
#### User Account Entity
* **Login Form Inputs**
  * `username` or `gmail`
  * `password`
* **Sign Up Form Inputs**
  * `username`
  * `email`
  * `password`

#### Core Variables & Data Attributes
* `UserID` (INT, - Auto Increment - Primary Key)
* `username` (VarChar50 - Not Null - Unique)
* `email` (VarChar255 - Not Null - Unique)
* `password` (VarChar255 - Not Null)

### 3. Dashboard
* **Navigation**
  * Header navigation to locate spaces and other information
* **Recent Activities**
  * Shows the recent activities of the user
* **Analytics**
  * Progress trackers for daily, weekly, monthly tasks and goals
* **Essential Information**
  * About Orby
  * Orby Facts
  * How to use Spaces

### 4. Spaces
Organized containers where users can group and manage their workspace tools.

#### Folder Space
* **Description:** Users can create custom folders to group and store their notes, tasks, budget spreadsheets, and scheduled timelines in one unified space.
* **Directory Hierarchy & System Restrictions:**
  * **Level 1 (Root Folder):** Primary main container (e.g., *School*).
  * **Level 2 (Child Folder):** Folder nested inside Root (e.g., *School* -> *CS Course*).
  * **Level 3 (Grandchild Folder):** Maximum allowable nesting depth (e.g., *School* -> *CS Course* -> *Project Docs*).
  * **Depth Limit:** Creating sub-folders inside Level 3 (Great-Grandchild level) is strictly blocked.
  * **Capacity Limit:** A single parent folder can hold a **maximum of 8 child folders** to maintain a clean layout and prevent clutter.
* **Progress Tracking:** Automatically creates a progress bar whenever a folder is detected to contain active tasks.
* **System Variables & Data Schema (JS, C#, SQL)**
  * `FolderID` (INT - Primary Key)
  * `ParentFolderID` (INT - Foreign Key, Nullable - *Null for Level 1 Root folders*)
  * `FolderName` (VARCHAR 100)
  * `DateCreated` (DATETIME)

#### Dedicated Modules
* **Notespace**
  * **Features**
    * Ability to create, edit, organize, and delete notes.
    * Hierarchical folder or category management to group related notes together.
    * Rich-text formatting support allowing bolding, italicization, bullet points, and headers within the note body.
  * **Functions**
    * Auto-save functionality that prevents data loss as the user types.
    * Search and filter mechanism to quickly find notes by title, keyword, or date modified.
    * Option to pin important or frequently accessed notes to the top of the list.
  * **System Variables & Data Schema (JS, C#, SQL)**
    * `NoteID` (INT - Primary Key)
    * `FolderID` (INT - Foreign Key - *Links note to its parent folder*)
    * `Title` (VARCHAR 100)
    * `Category` (VARCHAR 50)
    * `Content` (TEXT)
    * `DateCreated` (DATETIME)
    * `DateModified` (DATETIME)

* **Taskspace**
  * **Features**
    * Ability to create and delete tasks.
    * Subtask creation up to 2 levels deep under the main task.
    * Allows adding title, subheading, description, and note contents.
  * **Functions**
    * Auto-deletes completed tasks based on user setting preferences (1 day, 3 days, 7 days, or Custom).
    * Handles subtasks conditionally: only completed subtasks are deleted (if enabled), while main tasks are only deleted once all child subtasks are complete.
  * **System Variables & Data Schema (JS, C#, SQL)**
    * `TaskID` (INT - Primary Key)
    * `ParentTaskID` (INT - Foreign Key - *Links subtasks to parent tasks*)
    * `FolderID` (INT - Foreign Key - *Links task to its parent folder*)
    * `Title` (VARCHAR 100)
    * `Subtitle` (VARCHAR 150)
    * `Description` (TEXT)
    * `Notes` (TEXT)

* **Budgetspace**
  * **Features**
    * Ability to track income, expenses, and savings in one place.
    * Budget targets for expense categories and savings goals.
    * Charts to view spending habits and savings progress.
  * **Functions**
    * Automatic total and balance updates when adding entries.
    * Search and filter by category, date, or keyword.
    * Notifications for budget limits and recurring payments.
  * **System Variables & Data Schema (JS, C#, SQL)**
    * `TransactionID` (INT - Primary Key)
    * `FolderID` (INT - Foreign Key - *Links transaction/budget sheet to its parent folder*)
    * `Amount` (DECIMAL(10,2))
    * `Type` (VARCHAR 20) — e.g., 'Income', 'Expense', 'Savings'
    * `Category` (VARCHAR 50)
    * `Note` (VARCHAR 255)
    * `Date` (DATETIME)

* **Timespace**
  * **Features**
    * Ability to create, edit, and delete scheduled events and appointments.
    * Supports recurring events and reminders for upcoming schedules.
    * Allows adding titles, descriptions, dates, start and end times, and notes.
    * Calendar views for organizing schedules by day, week, and month.
  * **Functions**
    * Sends reminders for upcoming events based on user-defined preferences.
    * Supports editing, rescheduling, and deleting existing events.
    * Detects scheduling conflicts between events and notifies the user.
    * Allows users to search and filter schedules by title, date, or category.
  * **System Variables & Data Schema**
    * `EventID` — INT | Primary Key, Auto-Increment
    * `FolderID` — INT | Foreign Key, Nullable
    * `Title` — VARCHAR(100) | NOT NULL, Max: 100 chars
    * `Description` — TEXT | NULL
    * `Category` — VARCHAR(50) | NULL
    * `StartDateTime` — DATETIME | NOT NULL
    * `EndDateTime` — DATETIME | NOT NULL
    * `IsRecurring` — TINYINT(1) / BOOLEAN | DEFAULT 0
    * `RecurrenceRule` — VARCHAR(100) | NULL
    * `ReminderMinutes` — INT | NULL
    * `Notes` — TEXT | NULL
    * `CreatedAt` — DATETIME | DEFAULT CURRENT_TIMESTAMP
    * `DateModified` — DATETIME | DEFAULT CURRENT_TIMESTAMP

## Flow Layout
* **Frontend (HTML/CSS/JavaScript):** Receives data and passes it to the backend.
* **Backend (C#/SQL):** Handles logic validation, data passing, and database structure.
