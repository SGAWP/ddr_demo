module.exports = (sequelize, Sequelize) => {
    const Master = sequelize.define('masters', {
        master_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        master_name: {
            type: Sequelize.STRING(200),
            allowNull: false
        },
        assistant_master: {
            type: Sequelize.STRING(200),
            allowNull: true
        },
        second_assistant_master: {
            type: Sequelize.STRING(200),
            allowNull: true
        },
        comment: {
            type: Sequelize.STRING(500),
            allowNull: true
        }
    }, {      
        timestamps: false,
        indexes: [
            {
                unique: true, fields: ['master_name', 'assistant_master', 'second_assistant_master']
            }
        ]
    });
    return Master;
}  
