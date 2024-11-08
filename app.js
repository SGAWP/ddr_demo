const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db.config');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const roleRoutes = require('./routes/role');
const dayReportRoutes = require('./routes/day_report');
const plannedSinkingRoutes = require('./routes/planned_sinking');
const plannedSinkingUBRRoutes = require('./routes/planned_sinking_ubr');
const plannedSinkingWellRoutes = require('./routes/planned_sinking_well');
const timeBalanceRoutes = require('./routes/time_balance');
const stateRoutes = require('./routes/state');
const regimeRoutes = require('./routes/regime');
const requestRoutes = require('./routes/request');
const reportRoutes = require('./routes/report');
// DIRECTORY
const sprStateTimeRoutes = require('./routes/spr_state_time');
const sprDrillrigRoutes = require('./routes/spr_drillrig');
const sprWellPurposeRoutes = require('./routes/spr_well_purpose');
const sprOilfieldRoutes = require('./routes/spr_oilfield');
const sprWellplatformRoutes = require('./routes/spr_wellplatform');
const sprBitRoutes = require('./routes/spr_bit');
const sprRequestRoutes = require('./routes/spr_request');
const sprTypeRoutes = require('./routes/spr_type');
const sprTurbodrillRoutes = require('./routes/spr_turbodrill');
const sprOperationRoutes = require('./routes/spr_operation');
const sprCustomerRoutes = require('./routes/spr_customer');
const sprTechnologyRoutes = require('./routes/spr_technology');
const teamRoutes = require('./routes/team');
const masterRoutes = require('./routes/master');
const mtRoutes = require('./routes/master_team');
const typeSpindleRoutes = require('./routes/type_spindle');
const typeCalibratorRoutes = require('./routes/type_calibrator');
const monthRoutes = require('./routes/month');
const yearRoutes = require('./routes/year');

db.sequelize.sync().then(() => {
    console.log('PostgreSQL Database connected.');
});

const app = express();

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('cors')());
app.use('/API/AUTH', authRoutes);
app.use('/API/USERS', userRoutes);
app.use('/API/ROLES', roleRoutes);
app.use('/API/SVOD', dayReportRoutes);
app.use('/API/PLANNED/SINKINGS', plannedSinkingRoutes);
app.use('/API/PLANNED_DATA/UBR', plannedSinkingUBRRoutes);
app.use('/API/PLANNED_DATA/WELL', plannedSinkingWellRoutes);
app.use('/API/STATE', stateRoutes);
app.use('/API/REGIMES', regimeRoutes);
app.use('/API/REQUESTS', requestRoutes);
app.use('/API/TIMEBALANCE', timeBalanceRoutes);
app.use('/API/REPORT', reportRoutes);
// DIRECTORY
app.use('/API/DIRECTORY/STATE_TIME', sprStateTimeRoutes);
app.use('/API/DIRECTORY/TEAMS', teamRoutes);
app.use('/API/DIRECTORY/MASTERS', masterRoutes);
app.use('/API/DIRECTORY/DRILLRIGS', sprDrillrigRoutes);
app.use('/API/DIRECTORY/WELL_PURPOSES', sprWellPurposeRoutes);
app.use('/API/DIRECTORY/OILFIELDS', sprOilfieldRoutes);
app.use('/API/DIRECTORY/WELLPLATFORMS', sprWellplatformRoutes);
app.use('/API/DIRECTORY/BITS', sprBitRoutes);
app.use('/API/DIRECTORY/TURBODRILLS', sprTurbodrillRoutes);
app.use('/API/DIRECTORY/OPERATIONS', sprOperationRoutes);
app.use('/API/DIRECTORY/REQUESTS', sprRequestRoutes);
app.use('/API/DIRECTORY/TYPES', sprTypeRoutes);
app.use('/API/DIRECTORY/TYPE_SPINDLES', typeSpindleRoutes);
app.use('/API/DIRECTORY/TYPE_CALIBRATORS', typeCalibratorRoutes);
app.use('/API/DIRECTORY/CUSTOMERS', sprCustomerRoutes);
app.use('/API/DIRECTORY/TECHNOLOGIES', sprTechnologyRoutes);
app.use('/API/MT', mtRoutes);
app.use('/API/MONTHS', monthRoutes);
app.use('/API/YEARS', yearRoutes);

module.exports = app;