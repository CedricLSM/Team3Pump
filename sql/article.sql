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
CREATE DATABASE IF NOT EXISTS article DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE article;

DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
    `articleId` INT NOT NULL AUTO_INCREMENT,
    `articleName` VARCHAR(100) NOT NULL,
    `articleDescription` VARCHAR(100) NOT NULL,
    `articleBody` TEXT NOT NULL,
    `created_at` DATE NOT NULL,
    `updated_at` DATE,
    PRIMARY KEY (`articleId`)
); ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `portfolio`
--

INSERT INTO `article` (`articleId`, `articleName`, `articleDescription`, `articleBody`, `created_at`, `updated_at`) VALUES 
(1, 'What is a Stock?', 'Understanding a Stock', 'Stocks are an important component of the global economy, which allow companies to raise money for the operation of their businesses by selling shares to the public. Shares of stock can be bought or sold via an exchange, such as the NYSE or Nasdaq. Or, in limited cases, stocks can be sold privately. Specific regulations set by the Securities Exchange Commission (SEC) govern how companies can manage or distribute their stocks. Stocks can be either common stock, which gives the stockholder voting rights on issues of company governance, or preferred — which gives the stockholder no voting rights, but does often guarantee a fixed dividend payment in perpetuity.', '2020-09-05', NULL),
(2, 'What are some examples of investment classes?', 'Understanding Stocks, Bonds and Cash', 'Here a three examples of major asset classes:
Stocks can be one of the most volatile asset categories. In other words, one year the returns from a stock could be very high, followed by a steep loss the next year. Stock investments can have a lot of potential for large returns, but this is typically true for investors who are willing to ride out several boom and bust cycles, which can take a long period of time.
Bonds are generally considered a safer source of returns than stocks, but their returns are also on average lower. Think of them as a lower risk, lower reward category.
Cash and cash equivalents can include your typical savings account, as well as treasury bills and money market accounts. They’re often considered the safest places to invest, but they’re also known to yield some of the lowest returns over time of the major asset categories.
Keep in mind that each of these categories can consist of an array of companies, industries, and geographic regions. And there’s a whole range of categories beyond these three. Real estate, commodities (like gold, oil, water)... the list goes on. The important thing to know is that each investment category and subcategory may have a different return on investment (ROI), depending on the year.', '2020-09-06', NULL),
(3, 'What is volatility?', 'What and how is it calculated?', 'At its core, volatility is a measure of change. In a financial context, that often means investors are asking, how much did the price of a stock change? And more specifically, how much does a stock’s price typically fluctuate? Many investors use standard deviation as a proxy for volatility.

A high standard deviation means that a stock has historically wavered significantly from its average price, a sign that investors might want to exercise caution. A lower standard deviation indicates that a stock’s price has historically been more stable, perhaps making it more appropriate for conservative investors. As always though, past performance is no guarantee of future results.

Volatility is kind of like turbulence during a flight...
You don’t know when it’s going to happen or how severe it will be. You can take steps to steel yourself when volatility strikes though. Just like passengers might return to their seats and buckle up, investors can conduct a personal review, making sure that they’re comfortable with how they’ve balanced their assets between cash, investments, and other individual needs.', '2020-09-07', NULL);

commit;