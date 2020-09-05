-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 04, 2020 at 09:19 AM
-- Server version: 5.7.26
-- PHP Version: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `user`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE DATABASE IF NOT EXISTS user DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE user;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `email` varchar(30) NOT NULL,
  `password` varchar(512) NOT NULL,
  `name` varchar(30) NOT NULL,
  `risk_profile` int(11) NOT NULL,
  `telegram_id` varchar(20) DEFAULT NULL,
  `credits` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`email`, `password`, `name`, `risk_profile`, `telegram_id`, `credits`) VALUES
('cedric.lee.2018@smu.edu.sg', 'cedric123', 'Cedric Lee', 3,  NULL, 100000),
('zychoo.2018@smu.edu.sg', 'choozy123', 'Choo Zheng Yang', 2, NULL, 100000),
('edwin.lee.2018@smu.edu.sg', 'edwin123', 'Edwin Lee', 3,  NULL, 100000),
('fionaaoye@gmail.com', 'fiona123', 'Fiona Teo', 1,  NULL, 100000);