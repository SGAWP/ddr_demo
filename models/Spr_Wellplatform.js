module.exports = (sequelize, Sequelize) => {
    const Spr_Wellplatform = sequelize.define('spr_wellplatforms', {
        wellplatform_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        wellplatform_name: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        is_active: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    },
        {
            timestamps: false,
            indexes: [
                {
                    unique: true, fields: ['spr_oilfields_id', 'wellplatform_name']
                }
            ]
        }
    );
    return Spr_Wellplatform;
}  
