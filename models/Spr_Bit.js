module.exports = (sequelize, Sequelize) => {
    const Spr_Bit = sequelize.define('spr_bits', {
        bit_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        type: {
            type: Sequelize.STRING(30),
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return Spr_Bit;
}