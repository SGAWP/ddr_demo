module.exports = (sequelize, Sequelize) => {
    const Planned_Sinking_UBR = sequelize.define('v_well_planned_sinkings', {
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
        },
        spr_customers_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        customer_name: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        spr_wellplatforms_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        wellplatform_name: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        oilfield_short_name: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        spr_oilfields_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        spr_well_purposes_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        full_name: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        spr_technologies_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        technology: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        spr_types_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        type: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        spr_drillrigs_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        drillrig_name: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        masters_teams_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        masters_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        master_name: {
            type: Sequelize.STRING(200),
            allowNull: false,
        },
        assistant_master: {
            type: Sequelize.STRING(200),
            allowNull: true
        },
        second_assistant_master: {
            type: Sequelize.STRING(200),
            allowNull: true
        },
        teams_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        team_name: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return Planned_Sinking_UBR;
}  
