module.exports = (sequelize, Sequelize) => {
    const Spr_Well_Purpose = sequelize.define('spr_well_purposes', {
        well_purpose_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        full_name: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        is_active: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    },
        {
            timestamps: false
        }
    );
    return Spr_Well_Purpose;
}  
