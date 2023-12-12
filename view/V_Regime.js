module.exports = (sequelize, Sequelize) => {
    const V_Regiome = sequelize.define("v_regimes", {
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
        },
        turbodrill_name: {
            type: Sequelize.STRING(100),
            allowNull: true
        },
        spr_turbodrills_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        spr_bits_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        type: {
            type: Sequelize.STRING(30),
            allowNull: true
        },
        day_reports_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        type_calibrators_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        type_calibrator: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        type_spindles_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        type_spindle: {
            type: Sequelize.STRING(100),
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return V_Regiome;
};
