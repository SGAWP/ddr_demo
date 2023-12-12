module.exports = (sequelize, Sequelize) => {
    const V_MasterTeam = sequelize.define("v_masters_teams", {
        master_team_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        masters_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        master_name: {
            type: Sequelize.STRING(200),
            allowNull: false,
        },
        assistant_master: {
            type: Sequelize.STRING(200),
            allowNull: true
        },
        second_assistant_master: {
            type: Sequelize.STRING(200),
            allowNull: true
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
    return V_MasterTeam;
};
