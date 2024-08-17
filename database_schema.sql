CREATE DATABASE IF NOT EXISTS avatar_app;
USE avatar_app;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(50) DEFAULT 'default.png'
);