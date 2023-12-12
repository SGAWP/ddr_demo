module.exports = (sequelize, Sequelize) => {
    const Spr_Request = sequelize.define('spr_requests', {
        request_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        request_name: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        is_active: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    },
    {
        timestamps: false
    });
    return Spr_Request;
}