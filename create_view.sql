CREATE OR REPLACE VIEW public.v_masters_teams AS 
 SELECT masters_teams.master_team_id,
    masters_teams.teams_id,
    teams.team_name,
    masters.master_name,
    masters_teams.masters_id
   FROM masters_teams
     JOIN masters ON masters_teams.masters_id = masters.master_id
     JOIN teams ON masters_teams.teams_id = teams.team_id;

     CREATE OR REPLACE VIEW public.v_day_reports AS 
 SELECT day_reports.hour_id,
    day_reports.report_date,
    day_reports.well,
    teams.team_name,
    masters.master_name,
    spr_oilfields.oilfield_short_name,
    spr_wellplatforms.wellplatform_name
   FROM day_reports
     JOIN masters_teams ON day_reports.masters_teams_id = masters_teams.master_team_id
     JOIN masters ON masters_teams.masters_id = masters.master_id
     JOIN teams ON masters_teams.teams_id = teams.team_id
     JOIN spr_wellplatforms ON day_reports.spr_wellplatforms_id = spr_wellplatforms.wellplatform_id
     JOIN spr_oilfields ON spr_wellplatforms.spr_oilfields_id = spr_oilfields.oilfield_id;

     CREATE OR REPLACE VIEW public.v_planned_sinkings AS 
 SELECT planned_sinkings.planned_sinking_id,
    planned_sinkings.sinking_month,
    planned_sinkings.masters_teams_id,
    teams.team_name,
    masters.master_name,
    months.month,
    years.year,
    planned_sinkings.months_id,
    planned_sinkings.years_id
   FROM planned_sinkings
     JOIN months ON planned_sinkings.months_id = months.month_id
     JOIN years ON planned_sinkings.years_id = years.year_id
     JOIN masters_teams ON planned_sinkings.masters_teams_id = masters_teams.master_team_id
     JOIN masters ON masters_teams.masters_id = masters.master_id
     JOIN teams ON masters_teams.teams_id = teams.team_id;

CREATE OR REPLACE VIEW public.v_regimes AS 
 SELECT regimes.regime_id,
    regimes.slotting_n,
    regimes.duration,
    regimes.start_slotting,
    regimes.slotting_end,
    regimes.pump_pressure,
    regimes.spindle,
    regimes.turbodrill_n,
    regimes.bit_number,
    regimes.d1,
    regimes.d2,
    regimes.type_calibrators_id,
    type_calibrators.type_calibrator,
    regimes.type_spindles_id,
    type_spindles.type_spindle,
    spr_bits.type,
    spr_bits.bit_id,
    spr_turbodrills.turbodrill_name,
    spr_turbodrills.turbodrill_id,
    regimes.day_reports_id,
    regimes.spr_turbodrills_id,
    regimes.spr_bits_id
   FROM regimes
     JOIN spr_bits ON regimes.spr_bits_id = spr_bits.bit_id
     JOIN type_calibrators ON regimes.type_calibrators_id = type_calibrators.type_calibrator_id
     JOIN type_spindles ON regimes.type_spindles_id = type_spindles.type_spindle_id
     JOIN spr_turbodrills ON regimes.spr_turbodrills_id = spr_turbodrills.turbodrill_id;
     
     CREATE OR REPLACE VIEW public.v_requests AS 
 SELECT requests.request_id,
    requests.date_request,
    requests.spr_requests_id,
    requests.day_reports_id,
    spr_requests.request_name
   FROM requests
     JOIN spr_requests ON requests.spr_requests_id = spr_requests.request_id;

     CREATE OR REPLACE VIEW public.v_states AS 
 SELECT states.state_id,
    states.bottom,
    states.density,
    states.visconsity,
    states.water_separation,
    states.state_times_id,
    states.day_reports_id,
    spr_state_times.state_time_id,
    spr_state_times.state_time,
    states.time_balances_id,
    time_balances.spr_operations_id,
    spr_operations.operation_full_name,
    spr_operations.operation_short_name
   FROM states
     JOIN spr_state_times ON states.state_times_id = spr_state_times.state_time_id
     JOIN time_balances ON states.time_balances_id = time_balances.time_balance_id
     JOIN spr_operations ON time_balances.spr_operations_id = spr_operations.operation_id;

     CREATE OR REPLACE VIEW public.v_time_balances AS 
 SELECT time_balances.time_balance_id,
    time_balances.day_reports_id,
    time_balances.duration,
    spr_operations.operation_id,
    spr_operations.operation_short_name,
     spr_operations.operation_full_name,
    time_balances.spr_operations_id
   FROM time_balances
     JOIN spr_operations ON time_balances.spr_operations_id = spr_operations.operation_id;

     
CREATE OR REPLACE VIEW public.v_users AS 
 SELECT users.user_id,
    users.full_name,
    users.username,
    users.roles_id,
    roles.role_name
   FROM users
     JOIN roles ON users.roles_id = roles.role_id;

     CREATE OR REPLACE VIEW public.v_wellplatforms AS 
 SELECT spr_wellplatforms.wellplatform_id,
    spr_wellplatforms.wellplatform_name,
    spr_wellplatforms.is_active,
    spr_oilfields.oilfield_short_name,
    spr_oilfields.oilfield_id,
    spr_wellplatforms.spr_oilfields_id
   FROM spr_wellplatforms
     JOIN spr_oilfields ON spr_wellplatforms.spr_oilfields_id = spr_oilfields.oilfield_id;

     
     CREATE OR REPLACE VIEW public.v_ubr_planned_sinkings AS 
 SELECT ubr_planned_sinkings.planned_sinking_ubr_id,
    ubr_planned_sinkings.sinking_month,
    months.month,
    years.year,
    ubr_planned_sinkings.months_id,
    ubr_planned_sinkings.years_id
   FROM ubr_planned_sinkings
     JOIN months ON ubr_planned_sinkings.months_id = months.month_id
     JOIN years ON ubr_planned_sinkings.years_id = years.year_id;

CREATE OR REPLACE VIEW public.v_well_planned_sinkings AS 
 SELECT well_planned_sinkings.planned_sinking_well_id,
    well_planned_sinkings.well,
    well_planned_sinkings.project_depth,
    well_planned_sinkings.chock,
    well_planned_sinkings.layer,
    well_planned_sinkings.drill_start,
    well_planned_sinkings.drill_end,
    well_planned_sinkings.diameter,
    well_planned_sinkings.spr_wellplatforms_id,
    spr_oilfields.oilfield_short_name,
    spr_oilfields.oilfield_id,
    spr_wellplatforms.spr_oilfields_id,
    spr_wellplatforms.wellplatform_name,
    well_planned_sinkings.spr_well_purposes_id,
    spr_well_purposes.full_name,
    spr_well_purposes.short_name,
    well_planned_sinkings.spr_drillrigs_id,
    spr_drillrigs.drillrig_name,
    well_planned_sinkings.spr_technologies_id,
    technologies.technology,
    well_planned_sinkings.spr_types_id,
    types.type,
    well_planned_sinkings.spr_customers_id,
    spr_customers.customer_name
   FROM well_planned_sinkings
     JOIN spr_customers ON well_planned_sinkings.spr_customers_id = spr_customers.customer_id
     JOIN types ON well_planned_sinkings.spr_types_id = types.type_id
     JOIN technologies ON well_planned_sinkings.spr_technologies_id = technologies.technology_id
     JOIN spr_drillrigs ON well_planned_sinkings.spr_drillrigs_id = spr_drillrigs.drillrig_id
     JOIN spr_well_purposes ON well_planned_sinkings.spr_well_purposes_id = spr_well_purposes.well_purpose_id
     JOIN spr_wellplatforms ON well_planned_sinkings.spr_wellplatforms_id = spr_wellplatforms.wellplatform_id
     JOIN spr_oilfields ON spr_wellplatforms.spr_oilfields_id = spr_oilfields.oilfield_id;

     CREATE OR REPLACE VIEW public.v_reports AS 
 SELECT day_reports.hour_id,
    day_reports.report_date,
    day_reports."vAbsorbing",
    day_reports.rest_oil,
    day_reports.percent_liquid,
    day_reports.sinking_day,
    day_reports.urgent_need,
    day_reports.well,
    day_reports.drill_start_deviation,
    day_reports.spr_wellplatforms_id,
    spr_wellplatforms.wellplatform_name,
    spr_oilfields.oilfield_short_name,
    day_reports.masters_teams_id,
    masters.master_name,
    masters.assistant_master,
    well_planned_sinkings.project_depth,
    well_planned_sinkings.chock,
    well_planned_sinkings.layer,
    well_planned_sinkings.drill_start,
    well_planned_sinkings.diameter,
    well_planned_sinkings.spr_well_purposes_id,
    spr_well_purposes.short_name
   FROM day_reports
     JOIN well_planned_sinkings ON day_reports.spr_wellplatforms_id = well_planned_sinkings.spr_wellplatforms_id AND day_reports.well = well_planned_sinkings.well
     JOIN masters_teams ON day_reports.masters_teams_id = masters_teams.master_team_id
     JOIN masters ON masters_teams.masters_id = masters.master_id
     JOIN teams ON masters_teams.teams_id = teams.team_id
     JOIN spr_wellplatforms ON day_reports.spr_wellplatforms_id = spr_wellplatforms.wellplatform_id
     JOIN spr_oilfields ON spr_wellplatforms.spr_oilfields_id = spr_oilfields.oilfield_id
         JOIN spr_well_purposes ON well_planned_sinkings.spr_well_purposes_id = spr_well_purposes.well_purpose_id;


