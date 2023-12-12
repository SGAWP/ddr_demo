module.exports = (sequelize, Sequelize) => {
    const MasterTeam = sequelize.define('masters_teams', {
        master_team_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        }
    },
        {
            timestamps: false,
            indexes: [
                {
                    unique: true, fields: ['masters_id', 'teams_id']
                }
            ]
        }
    );
    return MasterTeam;
}  
