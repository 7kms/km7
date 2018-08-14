import Sequelize from 'sequelize'
import DAO from '../dao'
import Category from './category'

/**
 * 
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
 * 
 * 
 */
const Tag = DAO.sequelize.define('tag',{
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
    categoryId: {
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: {
            model: Category,
            key: 'id'
        }
    }
})

Tag.sync()
export default Tag