module.exports = (sequelize, Sequelize) => {
    const Month = sequelize.define('months', {
        month_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        month: {
            type: Sequelize.STRING(100),
            allowNull: false,
            unique: true
        }
    }, {
        timestamps: false
    });
    return Month;
}  
