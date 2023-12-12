module.exports = (sequelize, Sequelize) => {
    const V_Wellplatform = sequelize.define("v_wellplatforms", {
        wellplatform_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        wellplatform_name: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        is_active: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        oilfield_short_name: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        spr_oilfields_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return V_Wellplatform;
};
