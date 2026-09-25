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
* `username` (string)
* `email` (string)
* `password` (string)

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
* **Description:** Users can create custom folders to group and store their notes, tasks, budget spreadsheets (`.xlsx`), and scheduled timelines in one unified space.
* **Progress Tracking:** Automatically creates a progress bar whenever a folder is detected to contain active tasks.

#### Dedicated Modules
* **Notespace**
  * Placeholder of feature
* **Taskspace**
  * Ability to create and delete tasks. 
  * Subtasks creation up to 2 levels after main.
  * User can add title, subheading, description, and note contents.
  * Completed tasks will be deleted depends on user settings. (1d, 3d, 7d, Custom)
  * -If a task has subtasks, only completed subtasks will be deleted. Main tasks will be deleted if all subtasks are complete.
  * JS, C#, SQL: `TaskID` (Parent - Primary Key - Int), `ParentTaskID` (Child - Foreign Key - Int), `Title` (VARCHAR 100), `Subtitle` (VARCHAR 150), `Description` (TEXT), `Notes` (TEXT)
* **Timespace**
  * Placeholder of feature
* **Budgetspace**
  * Placeholder of feature

## Flow Layout
* **Frontend (HTML/CSS/JavaScript):** Receives data and passes it to the backend.
* **Backend (C#/SQL):** Handles logic validation, data passing, and database structure.
