module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        full_name: {
            type: Sequelize.STRING(200),
            allowNull: false
        },
        username: {
            type: Sequelize.STRING(40),
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
    });
    return User;
};
