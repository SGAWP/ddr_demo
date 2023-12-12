module.exports = (sequelize, Sequelize) => {
    const State = sequelize.define('states', {
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
        }
    },
        {
            timestamps: false,
            indexes: [
                {
                    unique: true, fields: ['day_reports_id', 'state_times_id']
                }
            ]
        }
    );
    return State;
}