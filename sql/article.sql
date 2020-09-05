-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 04, 2020 at 09:19 AM
-- Server version: 5.7.26
-- PHP Version: 7.3.8

#SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
#SET time_zone = "+00:00"; 

--
-- Database: `article`
--

-- --------------------------------------------------------

--
-- Table structure for table `article`
--
CREATE DATABASE IF NOT EXISTS article DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE article;

DROP TABLE IF EXISTS article; 
CREATE TABLE `article` (
   `articleId` int(11) NOT NULL AUTO_INCREMENT,
   `articleName` varchar(100) NOT NULL,
   `articleDescription` varchar(100) NOT NULL,
   `articleBody` text NOT NULL,
   `created_at` date NOT NULL,
   `updated_at` date DEFAULT NULL,
   PRIMARY KEY (articleId)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `article`
--
INSERT INTO `article` (articleName,articleDescription,articleBody,created_at) VALUES
('Investing 101','Learn the basics of Investing!','blablalba',CURDATE());
