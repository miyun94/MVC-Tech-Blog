const {Model, DataTypes} = require('sequelize'); 
const sequelize = require('../config/connection'); 

class post extends Model {}

post.init({
    id: {
        type: DataTypes.INTEGER, 
        allowNull: false, 
        primaryKey: true, 
        autoIncrement: true
    },
    post_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isURL: true
        }
      }, 
    title:{
        type: DataTypes.STRING, 
        allowNull: false
    }, 
    user_id: {
        type: DataTypes.INTEGER, 
        references: {
            model: 'user', 
            key:'id'
        }
    }, 
    content: {
        type: DataTypes.TEXT, 
        allowNull: false
    }
}, 
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
  })

  module.exports = post;