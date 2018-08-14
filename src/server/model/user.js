import Sequelize from 'sequelize'
import DAO from '../dao'
/**
 * 
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
 * 
 * 
 */
const User = DAO.sequelize.define('user',{
    id: {
        type: Sequelize.INTEGER, 
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(100), 
        allowNull: false
    },
    account: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    salt: {
        type: Sequelize.STRING(100), 
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(100), 
        allowNull: false
    },
    avatar: {
        type: Sequelize.STRING(100)
    }
})

User.sync()

export default User