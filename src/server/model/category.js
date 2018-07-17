import Sequelize from 'Sequelize'
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
    }
})
Category.sync()

export default Category