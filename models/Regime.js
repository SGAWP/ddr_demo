module.exports = (sequelize, Sequelize) => {
    const Regime = sequelize.define('regimes', {
        regime_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        slotting_n: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        duration: {
            type: Sequelize.TIME,
            allowNull: true
        },
        start_slotting: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        slotting_end: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        spindle: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        turbodrill_n: {
            type: Sequelize.STRING(50),
            allowNull: true
        },
        bit_number: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        pump_pressure: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        d1: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        d2: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
    }, {
        timestamps: false
    });
    return Regime;
}