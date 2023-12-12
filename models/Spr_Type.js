module.exports = (sequelize, Sequelize) => {
    const Type = sequelize.define('types', {
        type_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        type: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        is_active: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    }, {
        timestamps: false
    });
    return Type;
}  
