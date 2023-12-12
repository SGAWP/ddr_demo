export interface User {
    user_id?: number,
    full_name?: string,
    username?: string,
    password?: string,
    roles_id?: number,
    role_name?: string,
    createdAt?: Date,
    updatedAt?: Date
}

export interface Role {
    role_id?: number,
    role_name?: string
}

export interface Team {
    team_id?: number,
    team_name?: number,
    is_active?: boolean,
    comment?: string
}

export interface Master {
    master_id?: number,
    master_name?: string,
    assistant_master?: string,
    second_assistant_master?: string,
    comment?: string
}

export interface MasterTeam {
    master_team_id?: number,
    masters_id?: number,
    master_name?: string,
    teams_id?: number,
    team_name?: string
}

export interface Technology {
    technology_id?: number,
    technology?: number,
    is_active?: boolean
}

export interface Bit {
    bit_id?: number,
    type?: string
}

export interface Request {
    request_id?: number,
    request_name?: string,
    spr_requests_id?: number,
    day_reports_id?: number,
    date_request?: Date
}

export interface SprRequests {
    request_id?: number,
    request_name?: string,
    is_active?: boolean
}

export interface Customer {
    customer_id?: number,
    customer_name?: string,
    is_active?: boolean
}

export interface Oilfield {
    oilfield_id?: number,
    oilfield_short_name?: string,
    oilfield_full_name?: string,
    is_active?: boolean
}

export interface Wellplatform {
    wellplatform_id?: number,
    wellplatform_name?: string,
    oilfield_short_name?: string,
    is_active?: boolean,
    spr_oilfields_id?: number,
    spr_oilfield?: Oilfield
}

export interface Turbodrill {
    turbodrill_id?: number,
    turbodrill_name?: string
}

export interface Type {
    type_id?: number,
    type?: string,
    is_active?: boolean,
}

export interface TypeSpindle {
    type_spindle_id?: number,
    type_spindle?: string
}

export interface TypeCalibrator {
    type_calibrator_id?: number,
    type_calibrator?: string
}

export interface Operation {
    operation_id?: number,
    operation_full_name?: string,
    operation_short_name?: string,
    parentOperation_id?: number,
    children?: Operation[],
    hierarchyLevel: number,
    group_name?: string
}

export interface MT {
    team?: Team,
    master?: Master
}

export interface DayReport {
    hour_id?: number,
    masters_team?: MT,
    spr_wellplatform?: Wellplatform,
    report_date?: Date,
    vAbsorbing?: number,
    rest_oil?: number,
    percent_liquid?: string,
    urgent_need?: string,
    well?: string,
    sinking_day?: number
    sinking_month?: number,
    sinking_year?: number,
    msgrp?: boolean,
    drill_start_deviation?: number,
    spr_wellplatforms_id?: number,
    wellplatform_name?: string,
    oilfield_short_name?: string,
    masters_teams_id?: number,
    teams_id?: number,
    team_name?: number,
    masters_id?: number,
    master_name?: string
}

export interface PlannedSinking {
    planned_sinking_id?: number,
    sinking_month?: number,
    masters_teams_id?: number,
    teams_id?: number,
    team_name?: string,
    masters_id?: number,
    master_name?: string,
    months_id?: number,
    month?: string,
    years_id?: number,
    year?: string
}

export interface PlannedDataUBR {
    planned_sinking_ubr_id?: number,
    sinking_month?: number,
    months_id?: number,
    month?: string,
    years_id?: number,
    year?: string
}

export interface PlannedDataWell {
    planned_sinking_well_id?: number,
    well?: string,
    project_depth?: number,
    layer?: string,
    chock?: number,
    drill_start?: Date,
    drill_end?: Date,
    diameter?: number,
    spr_customers_id?: number,
    customer_name?: string,
    spr_wellplatforms_id?: number,
    wellplatform_name?: string,
    oilfield_short_name?: string,
    spr_oilfields_id?: number,
    spr_well_purposes_id?: number,
    full_name?: string,
    spr_technologies_id?: number,
    technology?: string,
    spr_types_id?: number,
    type?: string,
    spr_drillrigs_id?: number,
    drillrig_name?: string,
    masters_teams_id?: number,
    teams_id?: number,
    team_name?: number,
    masters_id?: number,
    master_name?: string,
    assistant_master?: string,
    second_assistant_master?: string
}

export interface TimeBalance {
    time_balance_id?: number,
    duration?: number,
    operation_short_name?: string,
    operation_full_name?: string,
    spr_operations_id?: number,
    day_reports_id?: number,
    total?: number
}

export interface State {
    state_id?: number,
    bottom?: number,
    density?: number,
    visconsity?: number,
    water_separation?: number,
    day_reports_id?: number,
    state_times_id?: number,
    operation_short_name?: string,
    time_balances_id?: number,
    state_time?: number
}

export interface StateTime {
    state_time_id?: number,
    state_time?: number
}

export interface Regime {
    regime_id?: number,
    slotting_n?: number,
    duration?: Date,
    start_slotting?: number,
    slotting_end?: number,
    pump_pressure?: number,
    spr_bits_id?: number,
    spr_turbodrills_id?: number,
    turbodrill_name?: string,
    type?: string,
    type_calibrators_id?: number,
    type_calibrator?: string,
    type_spindles_id?: number,
    type_spindle?: string,
    spindle?: number,
    turbodrill_n?: number,
    d1?: number,
    d2?: number,
    bit_number?: number,
    day_reports_id?: number
}

export interface Drillrig {
    drillrig_id?: number,
    drillrig_name?: string,
    is_active?: boolean
}

export interface WellPurpose {
    well_purpose_id?: number,
    full_name?: string,
    is_active?: boolean
}

export interface Month {
    month_id?: number,
    month?: string
}

export interface Year {
    year_id?: number,
    year?: string
}

export interface Message {
    message: string
}
