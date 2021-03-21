const {Model, DataTypes} = require('sequelize'); 
const bcrypt = require('bcrypt'); 
const sequelize = require('../config/connection'); 
const { Hooks } = require('sequelize/types/lib/hooks');

class user extends Model{
    checkPassword(loginPassword) {
        return bcrypt.compareSync(loginPassword, this.password)
    }
}

user.init({
    id: {
        type: DataTypes.INTEGER, 
        allowNull: false, 
        primaryKey: true, 
        autoIncrement: true
    }, 
    username: {
        type: DataTypes.STRING, 
        allowNull: false
    }, 
    password: {
        type: DataTypes.STRING, 
        allowNull: false, 
    }, 
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true   
    }}
}, {hooks: {
    async beforeCreate(userData){
        userData.password = bcrypt.hash(userData.password, 10); 
        return userData; 
    }, 
    async beforeUpdate(updateData){
        updateData.password = await bcrypt.hash(updateData, 10); 
        return updateData; 
    }
},sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
}
)

module.exports = user;