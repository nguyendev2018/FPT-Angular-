-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 03, 2020 at 07:08 PM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `qgarden`
--
CREATE DATABASE IF NOT EXISTS `QGarden` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `QGarden`;

-- --------------------------------------------------------

--
-- Table structure for table `banner`
--

DROP TABLE IF EXISTS `Banner`;
CREATE TABLE IF NOT EXISTS `Banner` (
  `BannerID` int(5) NOT NULL AUTO_INCREMENT,
  `BannerImage` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `BannerStatus` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`BannerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bill`
--

DROP TABLE IF EXISTS `Bill`;
CREATE TABLE IF NOT EXISTS `Bill` (
  `BillID` int(11) NOT NULL AUTO_INCREMENT,
  `BillOfUserID` int(5) DEFAULT NULL,
  `UserShippingAddress` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `UserPhoneNumber` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `UserMail` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `BillStatus` tinyint(1) NOT NULL DEFAULT 0,
  `BillCreateDate` int(10) NOT NULL,
  `BillCompletedDate` int(10) DEFAULT NULL,
  `BillTotalCost` double(10,0) NOT NULL,
  `BillPaymentMethod` tinyint(1) NOT NULL DEFAULT 0,
  `UsedCouponID` int(5) DEFAULT NULL,
  PRIMARY KEY (`BillID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `BillDetail`
--

DROP TABLE IF EXISTS `BillDetail`;
CREATE TABLE IF NOT EXISTS `BillDetail` (
  `BillDetailID` int(11) NOT NULL AUTO_INCREMENT,
  `BillID` int(11) NOT NULL,
  `BillInfromNote` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `ProductID` int(5) NOT NULL,
  `ProductCount` tinyint(1) NOT NULL DEFAULT 1,
  `ProductColor` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `ProductSize` text COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`BillDetailID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Category`
--

DROP TABLE IF EXISTS `Category`;
CREATE TABLE IF NOT EXISTS `Category` (
  `CategoryID` int(4) NOT NULL AUTO_INCREMENT,
  `CategoryName` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `CategoryURI` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `CategoryDefaultImage` varchar(200) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Default.png',
  `CategoryTotalProduct` int(5) NOT NULL,
  PRIMARY KEY (`CategoryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Comments`
--

DROP TABLE IF EXISTS `Comments`;
CREATE TABLE IF NOT EXISTS `Comments` (
  `CommentID` int(11) NOT NULL AUTO_INCREMENT,
  `CommentContent` text COLLATE utf8_unicode_ci NOT NULL,
  `CommentOfUserID` int(5) NOT NULL,
  `CommentOnProductID` int(5) DEFAULT NULL,
  `CommentOnNewsID` int(5) DEFAULT NULL,
  `CommentReplyOnID` int(11) DEFAULT NULL,
  `CommentRatedStar` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`CommentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Coupons`
--

DROP TABLE IF EXISTS `Coupons`;
CREATE TABLE IF NOT EXISTS `Coupons` (
  `CouponID` int(5) NOT NULL AUTO_INCREMENT,
  `CouponDiscount` tinyint(1) NOT NULL DEFAULT 10,
  `CreateDate` int(10) NOT NULL,
  `ExpireDate` int(10) NOT NULL,
  `CouponCreatedByAdminID` int(5) NOT NULL,
  PRIMARY KEY (`CouponID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `FlashSale`
--

DROP TABLE IF EXISTS `FlashSale`;
CREATE TABLE IF NOT EXISTS `FlashSale` (
  `SaleID` int(5) NOT NULL AUTO_INCREMENT,
  `ProductID` int(5) NOT NULL,
  `SaleCreateDate` int(10) NOT NULL,
  `SaleExpireDate` int(10) NOT NULL,
  `SaleCreatedByAdminID` int(5) NOT NULL,
  PRIMARY KEY (`SaleID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `News`
--

DROP TABLE IF EXISTS `News`;
CREATE TABLE IF NOT EXISTS `News` (
  `NewsID` int(5) NOT NULL AUTO_INCREMENT,
  `NewsTitle` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `NewsPreview` text COLLATE utf8_unicode_ci NOT NULL,
  `NewsContent` text COLLATE utf8_unicode_ci NOT NULL,
  `NewsDefaultImage` varchar(200) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Default.png',
  `NewsCreateDate` int(10) NOT NULL,
  `NewsCreateByUserID` int(5) NOT NULL,
  `NewsTotalComment` int(5) NOT NULL DEFAULT 0,
  PRIMARY KEY (`NewsID`),
  KEY `FK_News_Create_By_UserID` (`NewsCreateByUserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Products`
--

DROP TABLE IF EXISTS `Products`;
CREATE TABLE IF NOT EXISTS `Products` (
  `ProductID` int(5) NOT NULL AUTO_INCREMENT,
  `ProductCategoryID` int(4) NOT NULL,
  `ProductsubCategoryID` int(4) DEFAULT NULL,
  `ProductName` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `ProductPrice` double(10,0) NOT NULL,
  `ProductRateAvg` tinyint(1) NOT NULL DEFAULT 0,
  `ProductTotalRate` tinyint(1) NOT NULL DEFAULT 0,
  `ProductDiscount` tinyint(1) NOT NULL DEFAULT 0,
  `ProductDefaultImage` varchar(200) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Default.png',
  `ProductImageList` text COLLATE utf8_unicode_ci NOT NULL,
  `ProductPreview` text COLLATE utf8_unicode_ci NOT NULL,
  `ProductDescription` text COLLATE utf8_unicode_ci NOT NULL,
  `ProductType` tinyint(1) DEFAULT NULL,
  `Productsize` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `ProductColor` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `ProductAvailable` int(5) NOT NULL DEFAULT 1000,
  `ProductTotalReview` int(5) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ProductID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ReceivedContact`
--

DROP TABLE IF EXISTS `ReceivedContact`;
CREATE TABLE IF NOT EXISTS `ReceivedContact` (
  `ContactID` int(5) NOT NULL AUTO_INCREMENT,
  `UserName` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `UserMail` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `FromUserID` int(5) DEFAULT NULL,
  `ContactSubject` text COLLATE utf8_unicode_ci NOT NULL,
  `ContactMessage` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ContactID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `SiteInfo`
--

DROP TABLE IF EXISTS `SiteInfo`;
CREATE TABLE IF NOT EXISTS `SiteInfo` (
  `SiteName` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `About` text COLLATE utf8_unicode_ci NOT NULL,
  `ContactAddress` text COLLATE utf8_unicode_ci NOT NULL,
  `ContactPhoneLine` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `CustomerCareLine` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `ContactMail` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `FacebookSocial` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `GoogleSocial` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `IGSocial` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `YoutubeSocial` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `SiteKeyword` text COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `SubCategory`
--

DROP TABLE IF EXISTS `SubCategory`;
CREATE TABLE IF NOT EXISTS `SubCategory` (
  `SubCategoryID` int(4) NOT NULL AUTO_INCREMENT,
  `CategoryID` int(4) NOT NULL,
  `SubCategoryName` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `SubCategoryURI` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `SubCategoryDefaultImage` varchar(200) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Default.png',
  `SubCategoryTotalProduct` int(5) NOT NULL,
  PRIMARY KEY (`SubCategoryID`),
  KEY `FK_SubCategory_In_CategoryID` (`CategoryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
CREATE TABLE IF NOT EXISTS `Users` (
  `UserID` int(5) NOT NULL AUTO_INCREMENT,
  `UserLogin` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `UserPass` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `UserName` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `UserMail` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `UserBirthday` int(10) DEFAULT NULL,
  `UserAddress` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `UserPhoneNumber` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `UserRegisterDate` int(10) NOT NULL,
  `UserPermission` tinyint(1) NOT NULL,
  `UserAvatar` varchar(200) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'AvatarDefault.png',
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `News`
--
ALTER TABLE `News`
  ADD CONSTRAINT `News` FOREIGN KEY (`NewsCreateByUserID`) REFERENCES `Users` (`UserID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `SubCategory`
--
ALTER TABLE `SubCategory`
  ADD CONSTRAINT `SubCategory` FOREIGN KEY (`CategoryID`) REFERENCES `Category` (`CategoryID`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
