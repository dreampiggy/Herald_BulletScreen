/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50542
 Source Host           : localhost
 Source Database       : herald_bullet_screen

 Target Server Type    : MySQL
 Target Server Version : 50542
 File Encoding         : utf-8

 Date: 05/29/2015 12:56:06 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `bullet`
-- ----------------------------
DROP TABLE IF EXISTS `bullet`;
CREATE TABLE `bullet` (
  `id` bigint(255) NOT NULL AUTO_INCREMENT,
  `time` varchar(255) DEFAULT NULL,
  `movieid` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `studentNum` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `bullet`
-- ----------------------------
BEGIN;
INSERT INTO `bullet` VALUES ('1', '1432463980', '000000001', '我要上头条！', '71113425'), ('2', '1432463980', '000000001', '我要上头条！', '71113425'), ('3', '1432463980', '000000001', '我要上头条！', '71113425'), ('4', '1432463980', '000000001', '我要上头条！', '71113425'), ('5', '1432463980', '000000001', '我要上头条！', '71113425'), ('6', '1432463980', '000000001', '我要上头条！', '71113425'), ('7', '1432463980', '000000001', '我要上头条！', '71113425'), ('8', '1432463980', '000000001', '我要上头条！', '71113425'), ('9', '1432463980', '000000001', '我要上头条！', '71113425'), ('10', '1432463980', '000000001', '我要上头条！', '71113425'), ('11', '1432463980', '000000001', '我要上头条！', '71113425'), ('12', '1432463980', '000000001', '我要上头条！', '71113425'), ('13', '1432463980', '000000001', '我要上头条！', '71113425'), ('14', '1432463980', '000000001', '我要上头条！', '71113425'), ('15', '1432463980', '000000001', '我要上头条！22', '71113425'), ('16', '1432463980', '000000001', '我要上头条！22', '71113425'), ('17', '1432463980', '000000001', '我要上头条！22', '71113425'), ('18', '1432463980', '000000001', '我要上头条！22', '71113425'), ('19', '1432463980', '000000001', '我要上头条！22', '71113425'), ('20', '1432463980', '000000001', '我要上头条！22', '71113425'), ('21', '1432463980', '000000001', '我要上头条！22', '71113425');
COMMIT;

-- ----------------------------
--  Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `uuid` varchar(255) NOT NULL,
  `time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `user`
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('0000000000000000', '1432874931059');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
