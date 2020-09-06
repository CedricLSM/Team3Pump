-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 04, 2020 at 08:38 AM
-- Server version: 5.7.26
-- PHP Version: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `goldman`
--

-- --------------------------------------------------------

--
-- Table structure for table `portfolio`
--
CREATE DATABASE IF NOT EXISTS portfolio DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE portfolio;

DROP TABLE IF EXISTS `portfolio`;
CREATE TABLE `portfolio` (
    `email` varchar(30) NOT NULL,
    `stock_ticker` VARCHAR(10) NOT NULL,
    `quantity` INT NOT NULL,
    `date_time` DATETIME NOT NULL,
    `price` FLOAT NOT NULL,
    `buy` BOOLEAN  NOT NULL,
    PRIMARY KEY (`email`, `stock_ticker`, `date_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `portfolio`
--

INSERT INTO `portfolio` (`email`, `stock_ticker`, `quantity`, `date_time`, `price`, `buy`) VALUES 
('edwin.lee.2018@smu.edu.sg', 'TSLA', '25', '2020-01-09 15:45:21', 500 ,'1'),
('zychoo.2018@smu.edu.sg', 'MSFT', '50', '2020-01-23 20:45:21', 1500, '1'),
('cedric.lee.2018@smu.edu.sg', 'NFLX', '20', '2020-02-09 09:30:01', 100, '1'),
('edwin.lee.2018@smu.edu.sg', 'TSLA', '10', '2020-03-22 22:12:21', 250, '0');

commit;