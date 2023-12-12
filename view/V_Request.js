module.exports = (sequelize, Sequelize) => {
    const V_Request = sequelize.define("v_requests", {
        request_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        date_request: {
            type: Sequelize.DATE,
            allowNull: false
        },
        request_name: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        spr_requests_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        day_reports_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return V_Request;
};
