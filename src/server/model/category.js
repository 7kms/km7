import Sequelize from 'sequelize'
import DAO from '../dao'

/**
 * 
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`(
    `id` INT(4) AUTO_INCREMENT,
    `name` VARCHAR(32) NOT NULL,
    `createdTime` datetime DEFAULT CURRENT_TIMESTAMP,
    `updatedTime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE INDEX(`name` DESC),
    PRIMARY KEY(`id`)
);

ALTER TABLE `categories` ADD COLUMN `key` VARCHAR(10) NOT NULL AFTER `name`;
ALTER TABLE `categories` ADD UNIQUE (`key`);

UPDATE `categories` c SET c.key= LOWER(c.name) LIMIT 10000;

 * 
 * 
 */
const Category = DAO.sequelize.define('category',{
    id: {
        type: Sequelize.INTEGER, 
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    key: {
        type: Sequelize.STRING, 
        allowNull: false
    }
})
Category.sync()

export default Category