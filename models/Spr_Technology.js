module.exports = (sequelize, Sequelize) => {
    const Technology = sequelize.define('technologies', {
        technology_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        technology: {
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
    return Technology;
}  
