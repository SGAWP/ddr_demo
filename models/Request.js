module.exports = (sequelize, Sequelize) => {
    const Request = sequelize.define('requests', {
        request_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        date_request: {
            type: Sequelize.DATE,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return Request;
}