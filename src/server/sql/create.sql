/**/

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`(
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(32) NOT NULL,
    `account` VARCHAR(50) NOT NULL,
    `salt` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `avatar` VARCHAR(100)
);

ALTER TABLE `user` ADD COLUMN `createdTime` datetime DEFAULT CURRENT_TIMESTAMP,  ADD COLUMN `updatedTime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP


DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`(
    `id` INT(4) AUTO_INCREMENT,
    `name` VARCHAR(32) NOT NULL,
    `createdTime` datetime DEFAULT CURRENT_TIMESTAMP,
    `updatedTime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE INDEX(`name` DESC),
    PRIMARY KEY(`id`)
);

DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag`(
    `id` INT(4) AUTO_INCREMENT,
    `category` INT,
    `name` VARCHAR(32) NOT NULL,
    `createdTime` datetime DEFAULT CURRENT_TIMESTAMP,
    `updatedTime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE INDEX(`name` DESC),
    PRIMARY KEY(`id`),
    FOREIGN KEY(`category`) REFERENCES `category` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`(
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `userId` INT NOT NULL,
    `title` VARCHAR(1000) NOT NULL,
    `content` TEXT NOT NULL,
    `categoryId` INT NOT NULL,
    `tag` VARCHAR(1000) NOT NULL,
    `createdTime` datetime DEFAULT CURRENT_TIMESTAMP,
    `updatedTime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX (`category`, `tag`),
    FOREIGN KEY(`category`) REFERENCES `category` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY(`userId`) REFERENCES `user` (`id`)
);
