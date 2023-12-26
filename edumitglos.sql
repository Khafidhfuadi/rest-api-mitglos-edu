-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 26, 2023 at 10:51 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `edumitglos`
--

-- --------------------------------------------------------

--
-- Table structure for table `detail_product`
--

CREATE TABLE `detail_product` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `mentor_id` int(11) NOT NULL,
  `tentang` text NOT NULL,
  `topik` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `detail_product`
--

INSERT INTO `detail_product` (`id`, `product_id`, `mentor_id`, `tentang`, `topik`, `createdAt`, `updatedAt`) VALUES
(4, 3, 14, 'apa dah', '<p>ssssssss</p><ol><li>dddd</li><li>jndjndjd</li><li>sksmks</li><li>cc<strong>cccccc</strong><i><strong>cccc</strong></i></li></ol><ul><li><i><strong>vvvvvv</strong></i></li></ul><h2><i><strong>ccccc</strong></i></h2>', '2023-11-26 14:35:21', '2023-11-26 14:35:21'),
(7, 5, 14, 'apa dah', '<p>ddddsss</p><ul><li>xxdd</li><li>hhh</li></ul><figure class=\"table\"><table><tbody><tr><td>dddd</td><td>gg</td><td>yy</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td>', '2023-11-27 05:03:15', '2023-11-27 05:03:15');

-- --------------------------------------------------------

--
-- Table structure for table `kategori`
--

CREATE TABLE `kategori` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kategori`
--

INSERT INTO `kategori` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Course', '2023-11-23 09:45:34', '2023-11-23 09:45:34'),
(2, 'Webinar', '2023-11-23 09:45:34', '2023-11-23 09:45:34');

-- --------------------------------------------------------

--
-- Table structure for table `mentor`
--

CREATE TABLE `mentor` (
  `id` int(11) NOT NULL,
  `nama_lengkap` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `linkedin` varchar(255) NOT NULL,
  `profile_pict` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mentor`
--

INSERT INTO `mentor` (`id`, `nama_lengkap`, `position`, `linkedin`, `profile_pict`, `createdAt`, `updatedAt`) VALUES
(14, 'Fulanah', 'Engineer at Tokopedia', 'https://www.linkedin.com/in/fulanah/', 'profile_pict-1700992835345.png', '2023-11-26 10:00:35', '2023-11-26 10:00:35');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `judul` varchar(255) NOT NULL,
  `periode` varchar(255) NOT NULL,
  `kuota` int(11) NOT NULL,
  `ringkasan` varchar(255) NOT NULL,
  `pertemuan` varchar(255) NOT NULL,
  `harga` varchar(255) NOT NULL,
  `tempat` varchar(255) NOT NULL,
  `thumbnail_img` varchar(255) NOT NULL,
  `kategori_id` int(11) NOT NULL,
  `product_status` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `judul`, `periode`, `kuota`, `ringkasan`, `pertemuan`, `harga`, `tempat`, `thumbnail_img`, `kategori_id`, `product_status`, `createdAt`, `updatedAt`) VALUES
(3, 'Webinar Web Design: Crafting Beautiful and Functional Design', '2023-12-01T19:30', 999, 'Mendesain web memang bukan hal yang mudah, karena harus memperhatikan aspek estetika, kemudahan dan kenyamanan pengguna. Bahkan ga jarang designer stuck dan ngerasa kalau desain nya selalu kurang dan ga cocok☹ Webinar web design akan bantu kamu untuk dapa', '1', '100000', 'Zoom Cloud Meetings', 'thumbnail_img-1700831683154.jpg', 2, 1, '2023-11-24 13:14:43', '2023-12-05 09:23:46'),
(5, 'lop', '2023-12-01T12:00', 150, 'Mendesain web memang bukan hal yang mudah, karena harus memperhatikan aspek estetika, kemudahan dan kenyamanan pengguna. Bahkan ga jarang designer stuck dan ngerasa kalau desain nya selalu kurang da', '1', '100000', 'Zoom Cloud Meetings', 'thumbnail_img-1701061234214.png', 1, 1, '2023-11-27 05:00:34', '2023-12-05 09:29:55');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `name`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', '', '2023-11-23 09:44:49', '2023-11-23 09:44:49'),
(2, 'user', '', '2023-11-23 09:44:49', '2023-11-23 09:44:49');

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`id`, `product_id`, `user_id`, `status`, `createdAt`, `updatedAt`) VALUES
(15, 3, 1, 'cancel', '2023-12-09 01:44:15', '2023-12-12 06:31:59'),
(16, 5, 1, 'done', '2023-12-12 06:32:07', '2023-12-12 06:32:07');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `nama_depan` varchar(255) NOT NULL,
  `nama_belakang` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` datetime DEFAULT NULL,
  `is_verified` tinyint(1) NOT NULL DEFAULT 0,
  `password` varchar(255) NOT NULL,
  `rememberToken` varchar(255) DEFAULT NULL,
  `confirmationToken` varchar(255) DEFAULT NULL,
  `tokenExpiry` datetime DEFAULT NULL,
  `passwordResetToken` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `role_id`, `nama_depan`, `nama_belakang`, `email`, `email_verified_at`, `is_verified`, `password`, `rememberToken`, `confirmationToken`, `tokenExpiry`, `passwordResetToken`, `createdAt`, `updatedAt`) VALUES
(1, 2, 'khafidh', 'lop', 'muhammadkhafidfuadi@gmail.com', NULL, 1, '$2b$10$5ffapUHdWnfnEsoZXA7.FOtxyBb5aH2e8qYgkO4HxnRydSEZo5x5C', NULL, 'fd53e3ec605fb23104b5d001bf1d42a71bc90042', '2023-12-14 02:26:47', '693dbd9b7ed160d36a0c61b66a06d5b219b2664a', '2023-11-30 13:36:11', '2023-12-14 01:26:47'),
(2, 1, 'adminTest', 'fuadi', 'admin@gmail.com', NULL, 1, '$2b$10$pFWSo3fD0uKiTYJOBZ13o.xSIFyLvJwiTJAwq/VdFFrkRE8sUihly', NULL, '7be7aea73e7ffca2903ec17a21902c8f5bcdfb26', '2023-12-05 17:14:09', NULL, '2023-12-05 09:14:09', '2023-12-05 09:14:09'),
(3, 2, 'adel', 'lia', 'adelwdy6@gmail.com', NULL, 1, '$2b$10$KkF5LxVhZwUGafuYjizTwekLnbGJhkQ2To6z8nwbopkysI8S52qMu', NULL, '6e9d221ad97f74b50d931ef12a397bf7dbe83065', '2023-12-07 12:06:06', NULL, '2023-12-07 04:06:06', '2023-12-07 04:06:06');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `detail_product`
--
ALTER TABLE `detail_product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `mentor_id` (`mentor_id`);

--
-- Indexes for table `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mentor`
--
ALTER TABLE `mentor`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `profile_pict` (`profile_pict`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kategori_id` (`kategori_id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `detail_product`
--
ALTER TABLE `detail_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `kategori`
--
ALTER TABLE `kategori`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `mentor`
--
ALTER TABLE `mentor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detail_product`
--
ALTER TABLE `detail_product`
  ADD CONSTRAINT `detail_product_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `detail_product_ibfk_2` FOREIGN KEY (`mentor_id`) REFERENCES `mentor` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`kategori_id`) REFERENCES `kategori` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `transaksi_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `transaksi_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
