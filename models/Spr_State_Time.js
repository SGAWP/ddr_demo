module.exports = (sequelize, Sequelize) => {
    const Spr_State_Time = sequelize.define('spr_state_times', {
        state_time_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        state_time: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return Spr_State_Time;
}