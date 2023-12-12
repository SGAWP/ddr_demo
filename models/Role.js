module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define('roles', {
        role_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        role_name: {
            type: Sequelize.STRING(100),
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return Role;
}