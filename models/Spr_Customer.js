module.exports = (sequelize, Sequelize) => {
    const Spr_Customer = sequelize.define('spr_customers', {
        customer_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        customer_name: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        is_active: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    }, {
        timestamps: false
    });
    return Spr_Customer;
}  
