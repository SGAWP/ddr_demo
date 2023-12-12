module.exports = (sequelize, Sequelize) => {

    const V_Day_Report = sequelize.define("v_day_reports", {
        hour_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        report_date: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        well: {
            type: Sequelize.STRING(30),
            allowNull: false
        },
        wellplatform_name: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        oilfield_short_name: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        masters_teams_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        masters_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        master_name: {
            type: Sequelize.STRING(200),
            allowNull: false,
        },
        teams_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        team_name: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return V_Day_Report;
};
