module.exports = (sequelize, Sequelize) => {
    const V_Time_Balance = sequelize.define("v_time_balances", {
        time_balance_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        duration: {
            type: Sequelize.DECIMAL(6, 2),
            allowNull: false
        },
        operation_full_name: {
			type: Sequelize.STRING(500),
			allowNull: false
		},
		operation_short_name: {
			type: Sequelize.STRING(100),
			allowNull: false
        },
        spr_operations_id: {
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
    return V_Time_Balance;
};
