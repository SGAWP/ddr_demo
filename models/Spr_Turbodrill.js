module.exports = (sequelize, Sequelize) => {
    const Spr_Turbodrill = sequelize.define('spr_turbodrills', {
        turbodrill_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        turbodrill_name: {
            type: Sequelize.STRING(100),
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return Spr_Turbodrill;
}