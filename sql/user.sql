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

CREATE TABLE `user` (
  `username` varchar(20) NOT NULL,
  `password` varchar(512) NOT NULL,
  `name` varchar(30) NOT NULL,
  `risk_profile` int(11) NOT NULL,
  `email` varchar(30) DEFAULT NULL,
  `telegram_id` varchar(20) DEFAULT NULL,
  `credits` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`username`, `password`, `name`, `risk_profile`, `email`, `telegram_id`, `credits`) VALUES
('cedriclsm', 'cedric123', 'Cedric Lee', 3, 'cedric.lee.2018@smu.edu.sg', NULL, 100000),
('choozy', 'choozy123', 'Choo Zheng Yang', 2, 'zychoo.2018@smu.edu.sg', NULL, 100000),
('edwinlee', 'edwin123', 'Edwin Lee', 3, 'edwin.lee.2018@smu.edu.sg', NULL, 100000),
('fionaaoye', 'fiona123', 'Fiona Teo', 1, 'fionaaoye@gmail.com', NULL, 100000);