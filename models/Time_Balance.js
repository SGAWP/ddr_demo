module.exports = (sequelize, Sequelize) => {
    const Time_Balance = sequelize.define('time_balances', {
        time_balance_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        duration: {
            type: Sequelize.DECIMAL(6, 2),
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return Time_Balance;
}