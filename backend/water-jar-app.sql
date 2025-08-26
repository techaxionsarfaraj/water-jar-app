-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 26, 2025 at 01:26 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `water-jar-app`
--

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `address` text NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `name`, `phone`, `address`, `email`, `created_at`, `updated_at`) VALUES
(3, 'sarfaraj', '9016726614', 'ksm poruiar', 'ss@gmail.com', '2025-08-20 09:08:59', '2025-08-20 09:08:59'),
(5, 'ttt', '2222222222', 'sdfsdfsdfsdf', 'fsdfsdfds#@dfd3.dfdq', '2025-08-20 09:37:38', '2025-08-20 09:37:38'),
(6, 'ddd', '2313212313', 'sadfsadf asdf asdf', 'sdfasdf@fadfad3.df', '2025-08-20 09:39:02', '2025-08-20 10:12:28'),
(8, 'Rakesh', '9898098980', 'rakesh', 'rakesh@gmail.cm', '2025-08-25 12:44:30', '2025-08-25 12:44:30'),
(9, 'sipai', '9898098980', '4asd65f4asf', 'sipai@gmail.com', '2025-08-26 06:19:24', '2025-08-26 06:19:24'),
(10, 'bhargavi', '9898989898', 'asdfasdf', 'bhargavi@gmail.com', '2025-08-26 06:39:26', '2025-08-26 06:39:26'),
(11, 'test', '9898989897', '654asd6f5dsf', 'test@gmail.com', '2025-08-26 06:45:15', '2025-08-26 06:45:15');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `customer_name` varchar(100) DEFAULT NULL,
  `customer_phone` varchar(15) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `type` enum('jar','jug') NOT NULL,
  `delivery_address` text NOT NULL,
  `delivery_session` enum('morning','noon','evening') NOT NULL,
  `delivery_date` datetime NOT NULL,
  `order_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `customer_id`, `customer_name`, `customer_phone`, `quantity`, `type`, `delivery_address`, `delivery_session`, `delivery_date`, `order_date`) VALUES
(1, 3, 'sarfaraj', '9016726614', 50, 'jug', 'asfdsadf', 'morning', '2025-08-20 00:00:00', '2025-08-20 17:41:03'),
(12, 8, 'Rakesh', '9898098980', 50, 'jug', '', 'noon', '2025-08-25 00:00:00', '2025-08-25 18:15:00'),
(16, 10, 'bhargavi', '9898989898', 50, 'jar', 'asdf', 'evening', '2025-08-27 00:00:00', '2025-08-26 12:09:53'),
(17, 11, 'test', '9898989897', 100, 'jug', 'adfa', 'evening', '2025-08-30 00:00:00', '2025-08-26 12:15:36'),
(18, NULL, 'asdfasdf', '9898490424', 115, 'jug', 'l;\'l;\'l;\'', 'noon', '2025-08-30 00:00:00', '2025-08-26 12:31:49');

-- --------------------------------------------------------

--
-- Table structure for table `stock_items`
--

CREATE TABLE `stock_items` (
  `id` int(11) NOT NULL,
  `type` enum('jar','jug') NOT NULL,
  `color` varchar(50) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 0,
  `date` date DEFAULT curdate(),
  `delivered_jars` int(11) DEFAULT 0,
  `remaining_jars` int(11) DEFAULT 0,
  `total_jars` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stock_items`
--

INSERT INTO `stock_items` (`id`, `type`, `color`, `quantity`, `date`, `delivered_jars`, `remaining_jars`, `total_jars`, `created_at`, `updated_at`) VALUES
(1, '', '', 0, '2025-08-20', NULL, NULL, NULL, '2025-08-20 09:01:07', '2025-08-20 09:01:07'),
(2, 'jug', 'red', 100, '2025-08-20', NULL, NULL, NULL, '2025-08-20 10:15:59', '2025-08-20 10:15:59'),
(3, 'jug', 'green', 100, '2025-08-20', NULL, NULL, NULL, '2025-08-20 10:16:59', '2025-08-20 10:16:59'),
(4, 'jar', '', 1000, '2025-08-20', NULL, NULL, NULL, '2025-08-20 10:40:45', '2025-08-20 10:40:45'),
(6, 'jug', 'blue', 100, '2025-08-20', NULL, NULL, NULL, '2025-08-20 10:53:07', '2025-08-20 10:53:07'),
(7, 'jug', 'yellow', 100, '2025-08-20', NULL, NULL, NULL, '2025-08-20 11:04:05', '2025-08-20 11:15:36'),
(8, 'jug', 'orange', 100, '2025-08-20', NULL, NULL, NULL, '2025-08-20 11:15:19', '2025-08-20 11:15:19'),
(9, 'jug', 'purple', 0, '2025-08-21', NULL, NULL, NULL, '2025-08-21 05:43:25', '2025-08-21 05:43:25'),
(12, 'jug', 'papaya', 50, '2025-08-21', NULL, NULL, NULL, '2025-08-21 05:47:18', '2025-08-21 06:03:40'),
(13, 'jar', '', 100, '2025-08-21', NULL, NULL, NULL, '2025-08-21 05:51:43', '2025-08-21 06:03:21'),
(14, 'jug', 'chiku', 150, '2025-08-21', NULL, NULL, NULL, '2025-08-21 05:59:39', '2025-08-21 05:59:39'),
(15, 'jug', 'kela', 100, '2025-08-26', NULL, NULL, NULL, '2025-08-26 09:43:53', '2025-08-26 09:43:53');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `stock_items`
--
ALTER TABLE `stock_items`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `stock_items`
--
ALTER TABLE `stock_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
