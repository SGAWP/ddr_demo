module.exports = (sequelize, Sequelize) => {
    const V_User = sequelize.define("v_users", {
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
        role_name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        roles_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return V_User;
};
