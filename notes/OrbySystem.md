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
  * Placeholder
* **Taskspace**
  * Placeholder
* **Timespace**
  * Placeholder
* **Budgetspace**
  * Placeholder

## Flow Layout
* **Frontend (HTML/CSS/JavaScript):** Receives data and passes it to the backend.
* **Backend (C#/SQL):** Handles logic validation, data passing, and database structure.
