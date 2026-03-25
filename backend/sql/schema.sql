-- JustPai 官网 / 管理端 MySQL 表结构（与 backend/storage.js 一致）
-- 使用前请先创建数据库用户并设置 .env（DB_HOST、DB_USER、DB_PASSWORD、DB_NAME 等）

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE DATABASE IF NOT EXISTS `justpai`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `justpai`;

-- 新闻（latest-updates）
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `folder_name` varchar(255) NOT NULL COMMENT '目录名，唯一',
  `title` varchar(512) NOT NULL DEFAULT '',
  `date` date DEFAULT NULL,
  `author` varchar(255) NOT NULL DEFAULT '',
  `category` varchar(255) NOT NULL DEFAULT '',
  `description` text NOT NULL,
  `content_json` longtext COMMENT '正文块 JSON',
  `img` varchar(1024) DEFAULT NULL COMMENT '封面 URL',
  `published` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_news_folder_name` (`folder_name`),
  KEY `idx_news_date` (`date`),
  KEY `idx_news_published` (`published`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 案例（case-studies）
DROP TABLE IF EXISTS `cases`;
CREATE TABLE `cases` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `folder_name` varchar(255) NOT NULL COMMENT '目录名，唯一',
  `title` varchar(512) NOT NULL DEFAULT '',
  `date` date DEFAULT NULL,
  `author` varchar(255) NOT NULL DEFAULT '',
  `category` varchar(255) NOT NULL DEFAULT '',
  `description` text NOT NULL,
  `content_json` longtext COMMENT '正文块 JSON',
  `img` varchar(1024) DEFAULT NULL COMMENT '封面 URL',
  `published` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_cases_folder_name` (`folder_name`),
  KEY `idx_cases_date` (`date`),
  KEY `idx_cases_published` (`published`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
