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
