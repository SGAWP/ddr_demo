module.exports = (sequelize, Sequelize) => {
    const V_State = sequelize.define("v_states", {
        state_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        bottom: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        density: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        visconsity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        water_separation: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        state_time: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        day_reports_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        spr_operations_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        time_balances_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        operation_full_name: {
			type: Sequelize.STRING(500),
			allowNull: false
        },
        operation_short_name: {
			type: Sequelize.STRING(100),
			allowNull: false
        }
    }, {
        timestamps: false
    });
    return V_State;
};
