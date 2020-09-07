-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 07, 2020 at 05:24 AM
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

CREATE TABLE IF NOT EXISTS `user` (
  `email` varchar(30) NOT NULL,
  `password` varchar(512) NOT NULL,
  `name` varchar(30) NOT NULL,
  `risk_profile` int(11) NOT NULL,
  `telegram_id` varchar(20) DEFAULT NULL,
  `credits` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Truncate table before insert `user`
--

TRUNCATE TABLE `user`;
--
-- Dumping data for table `user`
--

INSERT INTO `user` (`email`, `password`, `name`, `risk_profile`, `telegram_id`, `credits`) VALUES
('cedric.lee@smu.edu.sg', '$5$rounds=535000$AHi2.ekugiAlIKaa$6FknXPXtU.bALxHktrxsdCfcXjPvyvbZ8T/pWYkbw63', 'Cedric Lee', 1, NULL, 100000),
('edwin.lee@smu.edu.sg', '$5$rounds=535000$ZiXQikTn15qYUEoE$NOJolDX2IACxRoNqdDJvb6se/EfVQUMD7e/pgvlkGk.', 'Edwin Lee', 2, NULL, 100000),
('fiona.teo@smu.edu.sg', '$5$rounds=535000$aZcTnTJk/hXkJG9X$nCGK2o97tm.SvDavcWoN9oOIk/GsaMA3wCEb1JSKyV.', 'Fiona Teo', 2, NULL, 100000),
('zychoo@smu.edu.sg', '$5$rounds=535000$waVbZOXhZSdLhmzK$aif0F07elmcN2gdfJw44L4RZVV72KgKi7QSukQJJAU3', 'Choo Zheng Yang', 3, NULL, 100000),
('chanelxy@smu.edu.sg', '$5$rounds=535000$NbXKGAEchl77hbKX$kjSEJQJvshKYom6hza8KTg.9f17MBbYbUDYN6yqRb68', 'Chanel Lee', 3, NULL, 100000);
