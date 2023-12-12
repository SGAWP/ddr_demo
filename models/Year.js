module.exports = (sequelize, Sequelize) => {
    const Year = sequelize.define('years', {
        year_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        year: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true
        }
    }, {
        timestamps: false
    });
    return Year;
}  
