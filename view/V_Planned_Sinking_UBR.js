module.exports = (sequelize, Sequelize) => {
    const Planned_Sinking_UBR = sequelize.define('v_ubr_planned_sinkings', {
        planned_sinking_ubr_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        sinking_month: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        month: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        months_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        year: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        years_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return Planned_Sinking_UBR;
}  
