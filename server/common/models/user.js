module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define('user', 
        {
            id: {
                type: DataTypes.STRING,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            email: DataTypes.STRING,
            password: DataTypes.STRING
        }, 
        {
            freezeTableName: true,
            tableName: 'user',
            timestamps: true,     
        }
    );
    return user;
};
