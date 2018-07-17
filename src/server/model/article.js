import Sequelize from 'Sequelize'
import DAO from '../dao'
import User from './user'
import Category from './category'


/**
 * 
 *  DROP TABLE IF EXISTS `article`;
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
 * 
 * 
 */
const Article = DAO.sequelize.define('article',{
    id: {
        type: Sequelize.INTEGER, 
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    title: {
        type: Sequelize.STRING(500), 
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT, 
        allowNull: false
    },
    categoryId: {
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: {
            model: Category,
            key: 'id'
        }
    },
    tag: {
        type: Sequelize.STRING, 
        allowNull: false
    }
});
Article.sync();
export default Article