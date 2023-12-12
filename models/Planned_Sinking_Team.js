module.exports = (sequelize, Sequelize) => {
    const Planned_Sinking = sequelize.define('planned_sinkings', {
        planned_sinking_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        sinking_month: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false,
        indexes: [
            {
                unique: true, fields: ['masters_teams_id', 'months_id', 'years_id']
            }
        ]
    });
    return Planned_Sinking;
}