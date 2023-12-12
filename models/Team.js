module.exports = (sequelize, Sequelize) => {
    const Team = sequelize.define('teams', {
        team_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        team_name: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true
        },
        is_active: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        comment: {
            type: Sequelize.STRING(500),
            allowNull: true
        }
    }, {
        timestamps: false
    });
    return Team;
}  
