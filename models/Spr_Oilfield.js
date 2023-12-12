module.exports = (sequelize, Sequelize) => {
    const Spr_Oilfield = sequelize.define('spr_oilfields', {
        oilfield_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        oilfield_short_name: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        oilfield_full_name: {
            type: Sequelize.STRING(200),
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
                    unique: true, fields: ['oilfield_short_name', 'oilfield_full_name']
                }
            ]
        }
    );
    return Spr_Oilfield;
}