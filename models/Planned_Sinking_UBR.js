module.exports = (sequelize, Sequelize) => {
    const Planned_Sinking_UBR = sequelize.define('ubr_planned_sinkings', {
        planned_sinking_ubr_id: {
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
                unique: true, fields: ['months_id', 'years_id']
            }
        ]
    });
    return Planned_Sinking_UBR;
}  