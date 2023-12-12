module.exports = (sequelize, Sequelize) => {
    const Type_Calibrator = sequelize.define('type_calibrators', {
        type_calibrator_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        type_calibrator: {
            type: Sequelize.STRING(100),
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return Type_Calibrator;
}  
