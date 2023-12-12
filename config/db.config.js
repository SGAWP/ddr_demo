const env = require('./env.js');
const Sequelize = require('sequelize');
require('sequelize-hierarchy')(Sequelize);

const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    port: env.portdb,
    dialect: env.dialect
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models

db.users = require('../models/User')(sequelize, Sequelize);
db.roles = require('../models/Role')(sequelize, Sequelize);
db.spr_oilfields = require('../models/Spr_Oilfield')(sequelize, Sequelize);
db.spr_wellplatforms = require('../models/Spr_Wellplatform')(sequelize, Sequelize);
db.masters = require('../models/Master')(sequelize, Sequelize);
db.teams = require('../models/Team')(sequelize, Sequelize);
db.masters_teams = require('../models/MasterTeam')(sequelize, Sequelize);
db.spr_operations = require('../models/Spr_Operation')(sequelize, Sequelize);
db.time_balance = require('../models/Time_Balance')(sequelize, Sequelize);
db.state = require('../models/State')(sequelize, Sequelize);
db.spr_state_time = require('../models/Spr_State_Time')(sequelize, Sequelize);
db.regimes = require('../models/Regime')(sequelize, Sequelize);
db.spr_bits = require('../models/Spr_Bit')(sequelize, Sequelize);
db.spr_turbodrills = require('../models/Spr_Turbodrill')(sequelize, Sequelize);
db.requests = require('../models/Request')(sequelize, Sequelize);
db.spr_requests = require('../models/Spr_Request')(sequelize, Sequelize);
db.spr_drillrigs = require('../models/Spr_Drillrig')(sequelize, Sequelize);
db.spr_well_purposes = require('../models/Spr_Well_Purpose')(sequelize, Sequelize);
db.spr_types = require('../models/Spr_Type')(sequelize, Sequelize);
db.spr_technologies = require('../models/Spr_Technology')(sequelize, Sequelize);
db.spr_customers = require('../models/Spr_Customer')(sequelize, Sequelize);
db.day_reports = require('../models/Day_Report')(sequelize, Sequelize);
db.planned_sinkings_team = require('../models/Planned_Sinking_Team')(sequelize, Sequelize);
db.planned_sinkings_ubr = require('../models/Planned_Sinking_UBR')(sequelize, Sequelize);
db.planned_sinkings_well = require('../models/Planned_Sinking_Well')(sequelize, Sequelize);
db.months = require('../models/Month')(sequelize, Sequelize);
db.years = require('../models/Year')(sequelize, Sequelize);
db.type_calibrators = require('../models/Type_Calibrator')(sequelize, Sequelize);
db.type_spindles = require('../models/Type_Spindle')(sequelize, Sequelize);

// Associations

db.spr_oilfields.hasMany(db.spr_wellplatforms, { foreignKey: { name: 'spr_oilfields_id', allowNull: false }, onDelete: 'restrict' });
db.spr_wellplatforms.belongsTo(db.spr_oilfields, { foreignKey: { name: 'spr_oilfields_id', allowNull: false }, onDelete: 'restrict' });

db.spr_wellplatforms.hasMany(db.day_reports, { foreignKey: { name: 'spr_wellplatforms_id', allowNull: false }, onDelete: 'restrict' });
db.day_reports.belongsTo(db.spr_wellplatforms, { foreignKey: { name: 'spr_wellplatforms_id', allowNull: false, onDelete: 'restrict' } });

db.teams.hasMany(db.masters_teams, { foreignKey: { name: 'teams_id', allowNull: false }, onDelete: 'restrict' });
db.masters_teams.belongsTo(db.teams, { foreignKey: { name: 'teams_id', allowNull: false, onDelete: 'restrict' } });

db.masters.hasMany(db.masters_teams, { foreignKey: { name: 'masters_id', allowNull: false }, onDelete: 'restrict' });
db.masters_teams.belongsTo(db.masters, { foreignKey: { name: 'masters_id', allowNull: false, onDelete: 'restrict' } });

db.masters_teams.hasMany(db.day_reports, { foreignKey: { name: 'masters_teams_id', allowNull: false }, onDelete: 'restrict' });
db.day_reports.belongsTo(db.masters_teams, { foreignKey: { name: 'masters_teams_id', allowNull: false, onDelete: 'restrict' } });

db.masters_teams.hasMany(db.planned_sinkings_team, { foreignKey: { name: 'masters_teams_id', allowNull: false }, onDelete: 'restrict' });
db.planned_sinkings_team.belongsTo(db.masters_teams, { foreignKey: { name: 'masters_teams_id', allowNull: false, onDelete: 'restrict' } });

db.months.hasMany(db.planned_sinkings_team, { foreignKey: { name: 'months_id', allowNull: false }, onDelete: 'restrict' });
db.planned_sinkings_team.belongsTo(db.months, { foreignKey: { name: 'months_id', allowNull: false, onDelete: 'restrict' } });

db.years.hasMany(db.planned_sinkings_team, { foreignKey: { name: 'years_id', allowNull: false }, onDelete: 'restrict' });
db.planned_sinkings_team.belongsTo(db.years, { foreignKey: { name: 'years_id', allowNull: false, onDelete: 'restrict' } });

db.months.hasMany(db.planned_sinkings_ubr, { foreignKey: { name: 'months_id', allowNull: false }, onDelete: 'restrict' });
db.planned_sinkings_ubr.belongsTo(db.months, { foreignKey: { name: 'months_id', allowNull: false, onDelete: 'restrict' } });

db.years.hasMany(db.planned_sinkings_ubr, { foreignKey: { name: 'years_id', allowNull: false }, onDelete: 'restrict' });
db.planned_sinkings_ubr.belongsTo(db.years, { foreignKey: { name: 'years_id', allowNull: false, onDelete: 'restrict' } });

db.spr_state_time.hasMany(db.state, { foreignKey: { name: 'state_times_id', allowNull: false }, onDelete: 'restrict' });
db.state.belongsTo(db.spr_state_time, { foreignKey: { name: 'state_times_id', allowNull: false }, onDelete: 'restrict' });

db.day_reports.hasMany(db.state, { foreignKey: { name: 'day_reports_id', allowNull: false }, onDelete: 'cascade' });
db.state.belongsTo(db.day_reports, { foreignKey: { name: 'day_reports_id', allowNull: false }, onDelete: 'cascade' });

db.day_reports.hasMany(db.requests, { foreignKey: { name: 'day_reports_id', allowNull: false }, onDelete: 'cascade' });
db.requests.belongsTo(db.day_reports, { foreignKey: { name: 'day_reports_id', allowNull: false }, onDelete: 'cascade' });

db.spr_requests.hasMany(db.requests, { foreignKey: { name: 'spr_requests_id', allowNull: false }, onDelete: 'restrict' });
db.requests.belongsTo(db.spr_requests, { foreignKey: { name: 'spr_requests_id', allowNull: false }, onDelete: 'restrict' });

db.time_balance.hasMany(db.state, { foreignKey: { name: 'time_balances_id', allowNull: false, }, onDelete: 'restrict' });
db.state.belongsTo(db.time_balance, { foreignKey: { name: 'time_balances_id', allowNull: false }, onDelete: 'restrict' });

db.spr_operations.hasMany(db.time_balance, { foreignKey: { name: 'spr_operations_id', allowNull: false }, onDelete: 'restrict' });
db.time_balance.belongsTo(db.spr_operations, { foreignKey: { name: 'spr_operations_id', allowNull: false }, onDelete: 'restrict' });

db.day_reports.hasMany(db.time_balance, { foreignKey: { name: 'day_reports_id', allowNull: false }, onDelete: 'cascade' });
db.time_balance.belongsTo(db.day_reports, { foreignKey: { name: 'day_reports_id', allowNull: false }, onDelete: 'cascade' });

db.spr_bits.hasMany(db.regimes, { foreignKey: { name: 'spr_bits_id', allowNull: false }, onDelete: 'restrict' });
db.regimes.belongsTo(db.spr_bits, { foreignKey: { name: 'spr_bits_id', allowNull: false }, onDelete: 'restrict' });

db.spr_turbodrills.hasMany(db.regimes, { foreignKey: { name: 'spr_turbodrills_id', allowNull: false }, onDelete: 'restrict' });
db.regimes.belongsTo(db.spr_turbodrills, { foreignKey: { name: 'spr_turbodrills_id', allowNull: false }, onDelete: 'restrict' });

db.day_reports.hasMany(db.regimes, { foreignKey: { name: 'day_reports_id', allowNull: false }, onDelete: 'cascade' });
db.regimes.belongsTo(db.day_reports, { foreignKey: { name: 'day_reports_id', allowNull: false }, onDelete: 'cascade' });

db.spr_wellplatforms.hasMany(db.planned_sinkings_well, { foreignKey: { name: 'spr_wellplatforms_id', allowNull: false }, onDelete: 'restrict' });
db.planned_sinkings_well.belongsTo(db.spr_wellplatforms, { foreignKey: { name: 'spr_wellplatforms_id', allowNull: false }, onDelete: 'restrict' });

db.spr_well_purposes.hasMany(db.planned_sinkings_well, { foreignKey: { name: 'spr_well_purposes_id', allowNull: false }, onDelete: 'restrict' });
db.planned_sinkings_well.belongsTo(db.spr_well_purposes, { foreignKey: { name: 'spr_well_purposes_id', allowNull: false }, onDelete: 'restrict' });

db.spr_drillrigs.hasMany(db.planned_sinkings_well, { foreignKey: { name: 'spr_drillrigs_id', allowNull: false }, onDelete: 'restrict' });
db.planned_sinkings_well.belongsTo(db.spr_drillrigs, { foreignKey: { name: 'spr_drillrigs_id', allowNull: false }, onDelete: 'restrict' });

db.spr_technologies.hasMany(db.planned_sinkings_well, { foreignKey: { name: 'spr_technologies_id', allowNull: false }, onDelete: 'restrict' });
db.planned_sinkings_well.belongsTo(db.spr_technologies, { foreignKey: { name: 'spr_technologies_id', allowNull: false }, onDelete: 'restrict' });

db.spr_types.hasMany(db.planned_sinkings_well, { foreignKey: { name: 'spr_types_id', allowNull: false }, onDelete: 'restrict' });
db.planned_sinkings_well.belongsTo(db.spr_types, { foreignKey: { name: 'spr_types_id', allowNull: false }, onDelete: 'restrict' });

db.spr_customers.hasMany(db.planned_sinkings_well, { foreignKey: { name: 'spr_customers_id', allowNull: false }, onDelete: 'restrict' });
db.planned_sinkings_well.belongsTo(db.spr_customers, { foreignKey: { name: 'spr_customers_id', allowNull: false }, onDelete: 'restrict' });

db.masters_teams.hasMany(db.planned_sinkings_well, { foreignKey: { name: 'masters_teams_id', allowNull: false }, onDelete: 'restrict' });
db.planned_sinkings_well.belongsTo(db.masters_teams, { foreignKey: { name: 'masters_teams_id', allowNull: false }, onDelete: 'restrict' });

db.type_calibrators.hasMany(db.regimes, { foreignKey: { name: 'type_calibrators_id', allowNull: true }, onDelete: 'restrict' });
db.regimes.belongsTo(db.type_calibrators, { foreignKey: { name: 'type_calibrators_id', allowNull: true }, onDelete: 'restrict' });

db.type_spindles.hasMany(db.regimes, { foreignKey: { name: 'type_spindles_id', allowNull: true }, onDelete: 'restrict' });
db.regimes.belongsTo(db.type_spindles, { foreignKey: { name: 'type_spindles_id', allowNull: true }, onDelete: 'restrict' });

db.roles.hasMany(db.users, { foreignKey: { name: 'roles_id', allowNull: false }, onDelete: 'restrict' });
db.users.belongsTo(db.roles, { foreignKey: { name: 'roles_id', allowNull: false }, onDelete: 'restrict' });

db.users.hasMany(db.day_reports, { foreignKey: { name: 'users_id', allowNull: false }, onDelete: 'restrict' });
db.day_reports.belongsTo(db.users, { foreignKey: { name: 'users_id', allowNull: false }, onDelete: 'restrict' });

// View

db.v_users = require('../view/V_User')(sequelize, Sequelize);
db.v_masters_teams = require('../view/V_MasterTeam')(sequelize, Sequelize);
db.v_wellplatforms = require('../view/V_Wellplatform')(sequelize, Sequelize);
db.v_day_reports = require('../view/V_Day_Report')(sequelize, Sequelize);
db.v_states = require('../view/V_State')(sequelize, Sequelize);
db.v_regimes = require('../view/V_Regime')(sequelize, Sequelize);
db.v_time_balances = require('../view/V_Time_Balance')(sequelize, Sequelize);
db.v_requests = require('../view/V_Request')(sequelize, Sequelize);
db.v_planned_sinkings = require('../view/V_Planned_Sinking')(sequelize, Sequelize);
db.v_ubr_planned_sinkings = require('../view/V_Planned_Sinking_UBR')(sequelize, Sequelize);
db.v_well_planned_sinkings = require('../view/V_Planned_Sinking_Well')(sequelize, Sequelize);

module.exports = db;
