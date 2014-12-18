# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 125.209.192.172 (MySQL 5.5.38-0ubuntu0.12.04.1)
# Database: 0.0.6
# Generation Time: 2014-12-18 05:45:24 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table club
# ------------------------------------------------------------

DROP TABLE IF EXISTS `club`;

CREATE TABLE `club` (
  `clubId` int(8) NOT NULL AUTO_INCREMENT,
  `leaderId` int(11) DEFAULT NULL,
  `formation` char(5) DEFAULT NULL,
  `teamId` int(11) DEFAULT NULL,
  `leagueId` int(11) DEFAULT NULL,
  PRIMARY KEY (`clubId`),
  KEY `teamId` (`teamId`),
  KEY `leagueId` (`leagueId`),
  KEY `teamId_2` (`teamId`),
  KEY `leagueId_2` (`leagueId`),
  CONSTRAINT `fk_leagueId_club` FOREIGN KEY (`leagueId`) REFERENCES `league` (`leagueId`),
  CONSTRAINT `fk_teamId` FOREIGN KEY (`teamId`) REFERENCES `team` (`teamId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table league
# ------------------------------------------------------------

DROP TABLE IF EXISTS `league`;

CREATE TABLE `league` (
  `leagueId` int(8) NOT NULL AUTO_INCREMENT,
  `community` varchar(30) DEFAULT NULL,
  `season` varchar(12) DEFAULT NULL,
  `start` date DEFAULT NULL,
  `end` date DEFAULT NULL,
  PRIMARY KEY (`leagueId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table lineup
# ------------------------------------------------------------

DROP TABLE IF EXISTS `lineup`;

CREATE TABLE `lineup` (
  `lineupId` int(11) NOT NULL AUTO_INCREMENT,
  `playerId` int(11) DEFAULT NULL,
  `matchId` int(11) DEFAULT NULL,
  `matchPosition` varchar(3) DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  `orderNumber` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`lineupId`),
  KEY `matchId` (`matchId`),
  KEY `playerId` (`playerId`),
  CONSTRAINT `fk_matchId` FOREIGN KEY (`matchId`) REFERENCES `match` (`matchId`),
  CONSTRAINT `fk_playerId` FOREIGN KEY (`playerId`) REFERENCES `player` (`playerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table match
# ------------------------------------------------------------

DROP TABLE IF EXISTS `match`;

CREATE TABLE `match` (
  `matchId` int(11) NOT NULL AUTO_INCREMENT,
  `matchName` varchar(20) DEFAULT NULL,
  `leagueId` int(20) DEFAULT NULL,
  `kickoffTime` datetime DEFAULT NULL,
  `homeClubId` int(11) DEFAULT NULL,
  `awayClubId` int(11) DEFAULT NULL,
  `homeScore` tinyint(4) DEFAULT NULL,
  `awayScore` tinyint(4) DEFAULT NULL,
  `stadium` varchar(20) DEFAULT NULL,
  `link` varchar(200) DEFAULT NULL,
  `note` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`matchId`),
  KEY `leagueId` (`leagueId`),
  KEY `home` (`homeClubId`),
  KEY `away` (`awayClubId`),
  KEY `awayScore` (`awayScore`),
  KEY `homeScore` (`homeScore`) USING BTREE,
  CONSTRAINT `fk_awayClubId` FOREIGN KEY (`awayClubId`) REFERENCES `club` (`clubId`),
  CONSTRAINT `fk_homeClubId` FOREIGN KEY (`homeClubId`) REFERENCES `club` (`clubId`),
  CONSTRAINT `fk_leagueId` FOREIGN KEY (`leagueId`) REFERENCES `league` (`leagueId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table message
# ------------------------------------------------------------

DROP TABLE IF EXISTS `message`;

CREATE TABLE `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `tel` varchar(20) DEFAULT NULL,
  `clubName` varchar(20) DEFAULT NULL,
  `message` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table player
# ------------------------------------------------------------

DROP TABLE IF EXISTS `player`;

CREATE TABLE `player` (
  `playerId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `clubId` int(11) DEFAULT NULL,
  `squadNumber` tinyint(4) DEFAULT NULL,
  `position` varchar(3) DEFAULT NULL,
  `matchPosition` varchar(3) DEFAULT NULL,
  `orderNumber` tinyint(4) DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`playerId`),
  KEY `clubId` (`clubId`),
  KEY `userId` (`userId`),
  CONSTRAINT `fk_clubId` FOREIGN KEY (`clubId`) REFERENCES `club` (`clubId`),
  CONSTRAINT `fk_userId` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table record
# ------------------------------------------------------------

DROP TABLE IF EXISTS `record`;

CREATE TABLE `record` (
  `recordId` int(8) NOT NULL AUTO_INCREMENT,
  `recordName` varchar(20) DEFAULT NULL,
  `minutes` tinyint(4) DEFAULT NULL,
  `time` varchar(11) DEFAULT NULL,
  `lineupId` int(20) DEFAULT NULL,
  PRIMARY KEY (`recordId`),
  KEY `lineupId` (`lineupId`),
  CONSTRAINT `fk_lineupId` FOREIGN KEY (`lineupId`) REFERENCES `lineup` (`lineupId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table team
# ------------------------------------------------------------

DROP TABLE IF EXISTS `team`;

CREATE TABLE `team` (
  `teamId` int(8) NOT NULL AUTO_INCREMENT,
  `teamName` varchar(20) DEFAULT NULL,
  `information` varchar(140) DEFAULT NULL,
  `createId` int(11) DEFAULT NULL,
  PRIMARY KEY (`teamId`),
  KEY `createUserId` (`createId`),
  KEY `createUserId_2` (`createId`),
  CONSTRAINT `fk_createId` FOREIGN KEY (`createId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT '',
  `lastName` varchar(20) DEFAULT NULL,
  `firstName` varchar(20) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `middleName` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `unique_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
