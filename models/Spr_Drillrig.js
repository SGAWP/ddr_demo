module.exports = (sequelize, Sequelize) => {
    const Spr_Drillrig = sequelize.define('spr_drillrigs', {
        drillrig_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        drillrig_name: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        is_active: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    }, {
        timestamps: false
    });
    return Spr_Drillrig;
}