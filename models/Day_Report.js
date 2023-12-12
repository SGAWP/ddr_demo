module.exports = (sequelize, Sequelize) => {
    const Day_Report = sequelize.define('day_reports', {
        hour_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        report_date: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        vAbsorbing: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        rest_oil: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        percent_liquid: {
            type: Sequelize.STRING(10),
            allowNull: false
        },
        sinking_day: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        urgent_need: {
            type: Sequelize.STRING(500),
            allowNull: true
        },
        well: {
            type: Sequelize.STRING(30),
            allowNull: false
        },
        drill_start_deviation: {
            type: Sequelize.DECIMAL(6, 2),
            allowNull: false
        },
        msgrp: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    }, {
        timestamps: false,
        indexes: [
            {
                unique: true, fields: ['spr_wellplatforms_id', 'well', 'report_date']
            }
        ]
    });
    return Day_Report;
}