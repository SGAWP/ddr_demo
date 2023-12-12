module.exports = (sequelize, Sequelize) => {
    const Planned_Sinking_Well = sequelize.define('well_planned_sinkings', {
        planned_sinking_well_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        well: {
            type: Sequelize.STRING(30),
            allowNull: false
        },
        project_depth: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        chock: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        layer: {
            type: Sequelize.STRING(10),
            allowNull: true
        },
        drill_start: {
            type: Sequelize.DATE,
            allowNull: false
        },
        drill_end: {
            type: Sequelize.DATE,
            allowNull: false
        },
        diameter: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false,
        indexes: [
            {
                unique: true, fields: ['spr_wellplatforms_id', 'well']
            }
        ]
    });
    return Planned_Sinking_Well;
}  
