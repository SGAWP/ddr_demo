module.exports = (sequelize, Sequelize) => {
    const Type_Spindle = sequelize.define('type_spindles', {
        type_spindle_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        type_spindle: {
            type: Sequelize.STRING(100),
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return Type_Spindle;
}  
