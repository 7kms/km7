/*
 Navicat Premium Data Transfer

 Source Server         : km
 Source Server Type    : MySQL
 Source Server Version : 80011
 Source Host           : localhost:3306
 Source Schema         : km7test

 Target Server Type    : MySQL
 Target Server Version : 80011
 File Encoding         : 65001

 Date: 10/07/2018 23:53:50
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `createdTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedTime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
