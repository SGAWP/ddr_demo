module.exports = (sequelize, Sequelize) => {
    const V_Planned_Sinking = sequelize.define("v_planned_sinkings", {
        planned_sinking_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        sinking_month: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        master_name: {
            type: Sequelize.STRING(200),
            allowNull: false,
        },
        team_name: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        month: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        months_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        year: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        years_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        masters_teams_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return V_Planned_Sinking;
};
