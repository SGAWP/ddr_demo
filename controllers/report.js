var excel = require('excel4node');
const moment = require('moment');
const errorHandler = require("../utils/errorHandler");
const Sequelize = require('sequelize');
const db = require('../config/db.config.js');
const DayReport = db.day_reports;
const PlannedSinkingTeam = db.planned_sinkings_team;
const PlannedSinkingWell = db.planned_sinkings_well;
const MasterTeam = db.masters_teams;
const Team = db.teams;
const Master = db.masters;
const Regime = db.regimes;
const Turbodrill = db.spr_turbodrills;
const Bit = db.spr_bits;
const Wellplatform = db.spr_wellplatforms;
const Oilfield = db.spr_oilfields;
const WellPurpose = db.spr_well_purposes;
const State = db.state;
const TimeBalance = db.time_balance;
const Operation = db.spr_operations;
const StateTime = db.spr_state_time;
const Request = db.requests;
const SprRequests = db.spr_requests;
const Type = db.spr_types;
const Year = db.years;
const Month = db.months;
const Op = Sequelize.Op;

function hhMmToMinutes(x) {
    const hhmm = Math.round(100 * x);
    return 60 * Math.trunc(hhmm / 100) + (hhmm % 100);
};

function minutesToHhMm(minutes) {
    return Math.trunc(minutes / 60) + (minutes % 60) / 100;
};

module.exports.getSvod = async function (req, res) {
    try {
        var wb = new excel.Workbook();
        const query = {
            where: {
                report_date: req.params.report_date
            },
            include: [
                {
                    model: MasterTeam,
                    required: false,
                    include: [
                        {
                            model: Master,
                            required: false
                        },
                        {
                            model: Team,
                            required: false
                        },
                        {
                            model: PlannedSinkingTeam,
                            required: false,
                            include: [
                                {
                                    model: Month,
                                    required: false
                                },
                                {
                                    model: Year,
                                    required: false
                                }
                            ]
                        }
                    ]
                },
                {
                    model: Regime,
                    required: false,
                    include: [
                        {
                            model: Turbodrill,
                            required: true
                        },
                        {
                            model: Bit,
                            required: true
                        }
                    ]
                },
                {
                    model: Wellplatform,
                    required: true,
                    include: [
                        {
                            model: Oilfield,
                            required: true
                        }
                    ]
                },
                {
                    model: Request,
                    required: false,
                    include: [
                        {
                            model: SprRequests,
                            required: true
                        }
                    ]
                },
                {
                    model: TimeBalance,
                    required: false,
                    include: [
                        {
                            model: Operation,
                            required: true
                        }
                    ]
                },
                {
                    model: State,
                    required: false,
                    include: [
                        {
                            model: TimeBalance,
                            required: true,
                            include: [
                                {
                                    model: Operation,
                                    required: true
                                }
                            ]
                        },
                        {
                            model: StateTime,
                            required: true
                        }
                    ]
                }
            ]
        };
        const dayReports = await DayReport.findAll(query);

        var ws = wb.addWorksheet('Сводка');

        var styleTitle = wb.createStyle({
            font: {
                color: '#000000',
                size: 12,
                bold: true,
                name: 'Courier New',
            },
            alignment: {
                horizontal: 'left',
                vertical: 'center',
                wrapText: true
            }
        });

        var style = wb.createStyle({
            font: {
                color: '#000000',
                size: 12,
                bold: true,
                name: 'Courier New',
            },
            alignment: {
                horizontal: 'center',
                vertical: 'center',
                wrapText: true
            }
        });

        var styleText = wb.createStyle({
            font: {
                color: '#000000',
                size: 10,
                bold: true,
                name: 'Courier New',
            },
            alignment: {
                horizontal: 'center',
                vertical: 'center',
                shrinkToFit: false,
                wrapText: true
            },
            border: {
                left: {
                    style: 'thin',
                    color: '#000000'
                },
                right: {
                    style: 'thin',
                    color: '#000000'
                },
                top: {
                    style: 'thin',
                    color: '#000000'
                },
                bottom: {
                    style: 'thin',
                    color: '#000000'
                }
            }
        });

        ws.column(1).setWidth(18);
        ws.column(2).setWidth(10);
        ws.column(3).setWidth(14);
        ws.column(4).setWidth(14);
        ws.column(5).setWidth(8);
        ws.column(6).setWidth(15);
        ws.column(7).setWidth(15);
        ws.column(8).setWidth(5);
        ws.column(9).setWidth(10);
        ws.column(10).setWidth(6);
        ws.column(11).setWidth(6);
        ws.column(12).setWidth(6);
        ws.column(13).setWidth(18);
        ws.column(14).setWidth(10);
        ws.column(15).setWidth(10);
        ws.column(16).setWidth(10);
        ws.column(17).setWidth(20);
        ws.column(18).setWidth(15);

        ws.row(1).setHeight(30);
        ws.row(2).setHeight(30);
        ws.row(5).setHeight(30);

        for (var i = 0; i < dayReports.length; i++) {
            ws.row(i + 6).setHeight(135);
        };

        ws.cell(1, 1, true).string(moment().format('DD/MM/YY')).style(styleTitle);
        ws.cell(2, 1, 2, 18, true).string('СУТОЧНАЯ СВОДКА ПО БУРЕНИЮ в ООО "МУБР" за ' + `${moment(dayReports[0].dataValues.report_date).format('DD/MM/YYYY')}`).style(styleTitle);
        ws.cell(3, 1, 5, 1, true).string('Скважина' + '\n' + 'Проек.глуб/пласт' + '\n' + 'Бур.мастер').style(styleText);
        ws.cell(3, 2, 5, 2, true).string('Назнач' + '\n' + 'Диам.' + '\n' + 'Башмак').style(styleText);
        ws.cell(3, 3, 5, 3, true).string('Нач.бур.' + '\n' + '(дата, вр)' + '\n' + 'отклон-е').style(styleText);
        ws.cell(3, 4, 5, 4, true).string('Состояние' + '\n' + 'на 24.00' + '\n' + 'часа').style(styleText);
        ws.cell(3, 5, 5, 5, true).string('Остаток нефти' + '\n' + 'п/ж').style(styleText);
        ws.cell(3, 6, 5, 6, true).string('Турбобур' + '\n' + 'тип и номер').style(styleText);
        ws.cell(3, 7, 5, 7, true).string('Долото' + '\n' + 'тип и номер').style(styleText);
        ws.cell(3, 8, 5, 8, true).string('N' + '\n' + 'долб').style(styleText);
        ws.cell(3, 9, 5, 9, true).string('Интервал долбления').style(styleText);
        ws.cell(3, 10, 3, 13, true).string('БАЛАНС ВРЕМЕНИ').style(styleText);
        ws.cell(4, 10, 5, 10, true).string('БУР.').style(styleText);
        ws.cell(4, 11, 5, 11, true).string('СПО').style(styleText);
        ws.cell(4, 12, 5, 12, true).string('Пром.').style(styleText);
        ws.cell(4, 13, 5, 13, true).string('ПРОЧИЕ работы').style(styleText);
        ws.cell(3, 14, 3, 16, true).string('ПРОХОДКА').style(styleText);
        ws.cell(4, 14, 5, 14, true).string('Сутки').style(styleText);
        ws.cell(4, 15, 5, 15, true).string('Месяц').style(styleText);
        ws.cell(4, 16, 5, 16, true).string('Год').style(styleText);
        ws.cell(3, 17, 5, 17, true).string('Расшифровка месячной' + '\n' + 'проходки' + '\n' + 'скважина (метры)').style(styleText);
        ws.cell(3, 18, 5, 18, true).string('Срочная' + '\n' + 'ПОТРЕБНОСТЬ' + '\n' + 'ЗАЯВКИ').style(styleText);

        const allMonthArraysPromises = [];
        const allYearArraysPromises = [];
        const allPlannedSinkingWellArraysPromises = [];
        const allDayReportsArraysPromises = [];

        dayReports.forEach((dayReport, index) => {
            var date = new Date(dayReport.dataValues.report_date);

            const plannedSinkingsWell = PlannedSinkingWell.findAll({
                where: {
                    [Op.and]: {
                        spr_wellplatforms_id: dayReport.dataValues.spr_wellplatforms_id,
                        well: dayReport.dataValues.well
                    }
                },
                include: [
                    {
                        model: WellPurpose,
                        required: true
                    },
                    {
                        model: Type,
                        required: true
                    }
                ]
            });

            const findAllMonth = DayReport.findAll({
                where: {
                    [Op.and]: [
                        {
                            report_date: {
                                [Op.between]: [new Date(date.getFullYear(), date.getMonth(), 1), date]
                            }
                        },
                        Sequelize.where(Sequelize.col((MasterTeam, "teams_id"), "varchar"), {
                            [Op.eq]: dayReport.dataValues.masters_team.teams_id
                        }),
                        Sequelize.where(Sequelize.col(("spr_wellplatforms_id"), "varchar"), {
                            [Op.eq]: dayReport.dataValues.spr_wellplatforms_id
                        })
                    ]
                },
                include: [
                    {
                        model: MasterTeam,
                        required: true
                    },
                    {
                        model: Wellplatform,
                        required: true,
                        include: [
                            {
                                model: Oilfield,
                                required: true
                            }
                        ]
                    }
                ]
            });

            const findAllYear = DayReport.findAll({
                where: {
                    [Op.and]: [
                        {
                            report_date: {
                                [Op.between]: [new Date(date).getFullYear() + '-01-01', date]

                            }
                        },
                        Sequelize.where(Sequelize.col((MasterTeam, "teams_id"), "varchar"), {
                            [Op.eq]: dayReport.dataValues.masters_team.teams_id
                        }),
                        Sequelize.where(Sequelize.col(("spr_wellplatforms_id"), "varchar"), {
                            [Op.eq]: dayReport.dataValues.spr_wellplatforms_id
                        })
                    ]
                },
                include: [
                    {
                        model: MasterTeam,
                        required: true
                    }
                ]
            });

            allMonthArraysPromises.push(findAllMonth);
            allYearArraysPromises.push(findAllYear);
            allDayReportsArraysPromises.push(dayReports)
            allPlannedSinkingWellArraysPromises.push(plannedSinkingsWell);
        });

        ws.cell(dayReports.length + 6, 10, dayReports.length + 6, 13, true).string('ИТОГО ПРОХОДКА ПО ООО "МУБР"').style(style);
        ws.cell(dayReports.length + 7, 12, dayReports.length + 7, 13, true).string('ПЛАН').style(style);
        ws.cell(dayReports.length + 8, 12, dayReports.length + 8, 13, true).string('+- к плану').style(style);

        var get_sum_sinking_day = 0;

        for (var i = 0; i < dayReports.length; i++) {
            get_sum_sinking_day += dayReports[i].dataValues.sinking_day
        };

        ws.cell(dayReports.length + 6, 14).number(get_sum_sinking_day).style(style);

        const allPlannedSinkingWellArrays = await Promise.all(allPlannedSinkingWellArraysPromises);

        const allDayReportsArrays = await Promise.all(allDayReportsArraysPromises);

        allDayReportsArrays.forEach((drs) => {
            alldrs = drs;
        })

        alldrs.forEach((d, index) => {
            allPlannedSinkingWellArrays.forEach((psw) => {
                for (var i = 0; i < psw.length; i++) {
                    if (psw[i].dataValues.well === d.dataValues.well && psw[i].dataValues.spr_wellplatforms_id === d.dataValues.spr_wellplatforms_id && psw[i].dataValues.masters_teams_id === d.dataValues.masters_teams_id) {
                        ws.cell(index + 6, 1).string(d.dataValues.spr_wellplatform.wellplatform_name + d.dataValues.spr_wellplatform.spr_oilfield.oilfield_short_name + ' ' + d.dataValues.well + '\n' + psw[i].dataValues.project_depth + '/' + (psw[i].dataValues.layer || '') + '\n' + d.dataValues.masters_team.team.team_name + ' - ' + d.dataValues.masters_team.master.master_name + '\n' + (d.dataValues.masters_team.master.assistant_master || '') + ' ' + (d.dataValues.masters_team.master.second_assistant_master || '')).style(styleText);
                        ws.cell(index + 6, 2).string(psw[i].dataValues.spr_well_purpose.full_name.slice(0, 4) + '/' + psw[i].dataValues.type.type.slice(0, 1) + '\n' + psw[i].dataValues.diameter + '\n' + (psw[i].dataValues.chock || '')).style(styleText);
                        if (d.dataValues.msgrp === true) {
                            ws.cell(index + 6, 3).string(moment(psw[i].dataValues.drill_start).format('DD/MM/YY HH:mm') + '\n' + d.dataValues.drill_start_deviation + '\n' + 'МСГРП').style(styleText);
                        } else {
                            ws.cell(index + 6, 3).string(moment(psw[i].dataValues.drill_start).format('DD/MM/YY HH:mm') + '\n' + d.dataValues.drill_start_deviation).style(styleText);
                        }
                        if (d.dataValues.states.length === 0) {
                            ws.cell(index + 6, 4).string('').style(styleText);
                        } else {
                            d.dataValues.states.forEach((state) => {
                                ws.cell(index + 6, 4).string(state.bottom + '\n' + state.time_balance.spr_operation.operation_short_name + '\n' + state.density + ' ' + state.visconsity + ' ' + state.water_separation).style(styleText);
                            });
                        }
                        ws.cell(index + 6, 5).string('H- ' + d.dataValues.rest_oil + 'м3' + '\n' + d.dataValues.percent_liquid + 'м3').style(styleText);
                        if (d.dataValues.regimes.length === 0) {
                            ws.cell(index + 6, 6, index + 6, 9).string('').style(styleText);
                        } else {
                            var turbodrill = "";
                            var bit = "";
                            var slotting = "";
                            var slottingN = "";
                            d.dataValues.regimes.forEach((regime) => {
                                var turbodrillName = regime.spr_turbodrill.turbodrill_name.slice(0, 4) || ' ';
                                var turbodrillN = regime.turbodrill_n || ' ';
                                var start = regime.start_slotting || ' ';
                                var end = regime.slotting_end || ' ';
                                var number = regime.slotting_n || ' ';
                                var bitType = regime.spr_bit.type.slice(5, 8) || ' ';
                                var bitN = regime.bit_number || ' ';
                                turbodrill = turbodrill + turbodrillName + ' ' + turbodrillN + '\n';
                                bit = bit + bitType + ' ' + bitN + '\n';
                                slotting = slotting + start + '-' + end + '\n';
                                slottingN = slottingN + number + '\n';
                            });
                            ws.cell(index + 6, 6).string(turbodrill).style(styleText);
                            ws.cell(index + 6, 7).string(bit).style(styleText);
                            ws.cell(index + 6, 8).string(slottingN).style(styleText);
                            ws.cell(index + 6, 9).string(slotting).style(styleText);
                        }

                        let drilling = 0;
                        let sumArrDrilling = 0;

                        let spo = 0;
                        let sumArrSPO = 0;

                        let flushing = 0;
                        let sumArrFlushing = 0;

                        let work = "";

                        d.dataValues.time_balances.forEach((timeBalance) => {
                            if (timeBalance.spr_operation.group_name === 'Бурение') {
                                durationArr = [timeBalance.duration];
                                drilling = Number(durationArr.map(hhMmToMinutes).map(x => sumArrDrilling += x).map(minutesToHhMm));
                            };
                            if (timeBalance.spr_operation.group_name === 'Спуско-Подъемные операции') {
                                durationArr = [timeBalance.duration];
                                spo = Number(durationArr.map(hhMmToMinutes).map(x => sumArrSPO += x).map(minutesToHhMm));
                            };
                            if (timeBalance.spr_operation.group_name === 'Промывка') {
                                durationArr = [timeBalance.duration];
                                flushing = Number(durationArr.map(hhMmToMinutes).map(x => sumArrFlushing += x).map(minutesToHhMm));
                            };
                            if (timeBalance.spr_operation.group_name !== 'Бурение' && timeBalance.spr_operation.group_name !== 'Спуско-Подъемные операции' && timeBalance.spr_operation.group_name !== 'Промывка') {
                                let operation = timeBalance.spr_operation.operation_short_name;
                                let duration = timeBalance.duration;
                                work = work + operation + '- ' + duration + '\n';
                            };
                        })
                        ws.cell(index + 6, 10).string(drilling.toFixed(2) || '0.0').style(styleText);
                        ws.cell(index + 6, 11).string(spo.toFixed(2) || '0.0').style(styleText);
                        ws.cell(index + 6, 12).string(flushing.toFixed(2) || '0.0').style(styleText);
                        ws.cell(index + 6, 13).string(work).style(styleText);
                        ws.cell(index + 6, 14).number(d.dataValues.sinking_day).style(styleText);

                        if (d.dataValues.requests.length === 0) {
                            ws.cell(index + 6, 18).string(d.dataValues.urgent_need || ' ').style(styleText);
                        } else {
                            var rq = "";
                            d.dataValues.requests.forEach((request) => {
                                var requestName = request.spr_request.dataValues.request_name || ' ';
                                var dateTime = moment(request.spr_request.dataValues.date_time).format('HH:mm DD.MM') || ' ';
                                rq = rq + requestName + ' ' + dateTime + '\n';
                            })
                            ws.cell(index + 6, 18).string(d.dataValues.urgent_need + '\n' + rq).style(styleText);
                        }

                    }
                }
            })
        })

        const allMonthArrays = await Promise.all(allMonthArraysPromises);

        var get_sum_sinking_month = 0;

        allMonthArrays.forEach((month, index) => {
            var get_sinking_month = 0;
            for (var i = 0; i < month.length; i++) {
                get_sinking_month += month[i].dataValues.sinking_day
            }

            get_arr_sinking_month = [get_sinking_month]
            for (var i = 0; i < get_arr_sinking_month.length; i++) {
                get_sum_sinking_month += get_arr_sinking_month[i];
            }

            ws.cell(index + 6, 15).number(get_sinking_month).style(styleText);

            const obj = {};
            for (const { dataValues } of month) {
                var wellplatform = dataValues.spr_wellplatform.wellplatform_name;
                var oilfield = dataValues.spr_wellplatform.spr_oilfield.oilfield_short_name;
                const { well, sinking_day } = dataValues;
                obj[well] = (obj[well] || 0) + sinking_day;
            }

            var decrypt = "";
            for (const [well, totalSinking] of Object.entries(obj)) {
                var strWellplatform = wellplatform;
                var strOilfield = oilfield;
                var strWell = well;
                var strTotalSinking = totalSinking;
                decrypt = decrypt + strWellplatform + strOilfield + ' ' + strWell + ' ' + `(${strTotalSinking})` + '\n';
            }

            ws.cell(index + 6, 17).string(decrypt).style(styleText);
        });

        ws.cell(dayReports.length + 6, 15).number(get_sum_sinking_month).style(style);

        const allYearArrays = await Promise.all(allYearArraysPromises);

        var get_sum_sinking_year = 0;

        allYearArrays.forEach((year, index) => {
            var get_sinking_year = 0;
            for (var i = 0; i < year.length; i++) {
                get_sinking_year += year[i].dataValues.sinking_day

            }
            get_arr_sinking_year = [get_sinking_year];
            for (var i = 0; i < get_arr_sinking_year.length; i++) {
                get_sum_sinking_year += get_arr_sinking_year[i];
            };

            ws.cell(index + 6, 16).number(get_sinking_year).style(styleText);
        });

        ws.cell(dayReports.length + 6, 16).number(get_sum_sinking_year).style(style);

        function ucFirst(str) {
            if (!str) return str;
            return str[0].toUpperCase() + str.slice(1);
        };

        function daysInMonth(month, year) {
            return new Date(year, month, 0).getDate();
        };

        var month = 0;
        var year = 0;
        var get_planned_sinking_month = 0;
        var get_planned_sinking_year = 0;

        for (var i = 0; i < dayReports.length; i++) {
            var month = moment(dayReports[i].dataValues.report_date).format('M');
            var year = moment(dayReports[i].dataValues.report_date).format('YYYY');
            var reportDate = moment(dayReports[i].dataValues.report_date).locale('ru').format('MMMM');
            var y = moment(dayReports[i].dataValues.report_date).format('YYYY');
            for (var j = 0; j < dayReports[i].dataValues.masters_team.planned_sinkings.length; j++) {
                if (Number(y) === Number(dayReports[i].dataValues.masters_team.planned_sinkings[j].dataValues.year.dataValues.year)) {
                    if (dayReports[i].dataValues.masters_teams_id === dayReports[i].dataValues.masters_team.planned_sinkings[j].dataValues.masters_teams_id) {
                        get_planned_sinking_year += dayReports[i].dataValues.masters_team.planned_sinkings[j].dataValues.sinking_month;
                        if (ucFirst(reportDate) === dayReports[i].dataValues.masters_team.planned_sinkings[j].dataValues.month.dataValues.month) {
                            get_planned_sinking_month += dayReports[i].dataValues.masters_team.planned_sinkings[j].dataValues.sinking_month;
                        };
                    };
                };
            };
        };

        get_planned_sinking_day = get_planned_sinking_month / daysInMonth(month, year);

        var get_planned_day = 0;
        var get_planned_month = 0;
        var get_planned_year = 0;

        get_planned_day = get_sum_sinking_day - Number(get_planned_sinking_day.toFixed());
        get_planned_month = get_sum_sinking_month - get_planned_sinking_month;
        get_planned_year = get_sum_sinking_year - get_planned_sinking_year;

        ws.cell(dayReports.length + 7, 14).number(Number(get_planned_sinking_day.toFixed())).style(style);
        ws.cell(dayReports.length + 7, 15).number(get_planned_sinking_month).style(style);
        ws.cell(dayReports.length + 7, 16).number(get_planned_sinking_year).style(style);

        ws.cell(dayReports.length + 8, 14).number(get_planned_day).style(style);
        ws.cell(dayReports.length + 8, 15).number(get_planned_month).style(style);
        ws.cell(dayReports.length + 8, 16).number(get_planned_year).style(style);


        ws.row(dayReports.length + 6).setHeight(25);
        ws.row(dayReports.length + 7).setHeight(25);
        ws.row(dayReports.length + 8).setHeight(25);

        wb.write(`svod-${moment(dayReports[0].dataValues.report_date).format('DD.MM.YYYY')}.xlsx`, res);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.getSvodWorkDrilling = async function (req, res) {
    try {
        var wb = new excel.Workbook();
        const query = {
            where: {
                report_date: req.params.report_date
            },
            include: [
                {
                    model: TimeBalance,
                    required: false,
                    include: [
                        {
                            model: Operation,
                            required: false
                        }
                    ]
                },
                {
                    model: Wellplatform,
                    required: true,
                    include: [
                        {
                            model: Oilfield,
                            required: true
                        }
                    ]
                }
            ],
            order: [
                [TimeBalance, 'time_balance_id', 'ASC']
            ]
        };
        const dayReports = await DayReport.findAll(query);

        var ws = wb.addWorksheet('Сводка');

        var styleTitle = wb.createStyle({
            font: {
                color: '#000000',
                size: 12,
                bold: true,

                name: 'Courier New',
            },
            alignment: {
                horizontal: 'center',
                vertical: 'center',
                wrapText: true
            }
        });

        var styleText = wb.createStyle({
            font: {
                color: '#000000',
                size: 10,
                bold: true,
                name: 'Courier New',
            },
            alignment: {
                horizontal: 'center',
                vertical: 'center',
                shrinkToFit: false,
                wrapText: true
            },
            border: {
                left: {
                    style: 'thin',
                    color: '#000000'
                },
                right: {
                    style: 'thin',
                    color: '#000000'
                },
                top: {
                    style: 'thin',
                    color: '#000000'
                },
                bottom: {
                    style: 'thin',
                    color: '#000000'
                }
            }
        });

        var style = wb.createStyle({
            font: {
                color: '#000000',
                size: 10,
                bold: true,
                name: 'Courier New',
            },
            alignment: {
                horizontal: 'center',
                vertical: 'center',
                shrinkToFit: false,
                wrapText: true
            }
        });

        ws.column(1).setWidth(5);
        ws.column(2).setWidth(15);
        ws.column(3).setWidth(25);
        ws.column(4).setWidth(8);
        ws.column(5).setWidth(8);
        ws.column(6).setWidth(8);

        ws.row(1).setHeight(30);
        ws.row(2).setHeight(30);

        var arr = new Array(1000);

        for (var i = 0; i < arr.length; i++) {
            ws.row(i + 4).setHeight(30);
        };

        ws.cell(1, 1, 1, 6, true).string('Выполнение работ по БУРЕНИЮ за ' + `${moment(dayReports[0].dataValues.report_date).format('DD.MM.YYYY')}`).style(styleTitle);
        ws.cell(2, 1, 3, 1, true).string('N' + '\n' + 'пп').style(styleText);
        ws.cell(2, 2, 2, 3, true).string('Наименование работы').style(styleText);
        ws.cell(3, 2).string('Краткое').style(styleText);
        ws.cell(3, 3).string('Полное').style(styleText);
        ws.cell(2, 4, 2, 6, true).string('Время').style(styleText);
        ws.cell(3, 4).string('Начало').style(styleText);
        ws.cell(3, 5).string('Конец').style(styleText);
        ws.cell(3, 6).string('Длител.').style(styleText);

        var sum = 0;

        for (var i = 0; i < dayReports.length; i++) {
            if (i == 0) {
                let sumArr = 0;
                let durationArr = [0];
                let durationNumber = 0;
                ws.cell(i + 4, 2, i + 4, 3, true).string(`Скважина ${dayReports[i].dataValues.spr_wellplatform.wellplatform_name + dayReports[i].dataValues.spr_wellplatform.spr_oilfield.oilfield_short_name + ' ' + dayReports[i].dataValues.well}`).style(style);
                for (var j = 0; j < dayReports[i].dataValues.time_balances.length; j++) {
                    let time = dayReports[i].dataValues.time_balances[j].duration;
                    tf = String(time)
                    ws.cell(j + 5, 1).number(j + 1).style(styleText);
                    ws.cell(j + 5, 2).string(dayReports[i].dataValues.time_balances[j].spr_operation.operation_short_name).style(styleText);
                    ws.cell(j + 5, 3).string(dayReports[i].dataValues.time_balances[j].spr_operation.operation_full_name).style(styleText);
                    ws.cell(j + 5, 6).string(tf).style(styleText);
                    ws.cell(j + 5, 4).string(durationNumber.toFixed(2)).style(styleText);
                    durationArr = [tf];
                    durationNumber = Number(durationArr.map(hhMmToMinutes).map(x => sumArr += x).map(minutesToHhMm));
                    ws.cell(j + 5, 5).string(durationNumber.toFixed(2)).style(styleText);
                };
            } else {
                let sumArr = 0;
                let durationArr = [0];
                let durationNumber = 0;
                sum += 1 + dayReports[i - 1].dataValues.time_balances.length;
                ws.cell(sum + 4, 2, sum + 4, 3, true).string(`Скважина ${dayReports[i].dataValues.spr_wellplatform.wellplatform_name + dayReports[i].dataValues.spr_wellplatform.spr_oilfield.oilfield_short_name + ' ' + dayReports[i].dataValues.well}`).style(style);
                for (var j = 0; j < dayReports[i].dataValues.time_balances.length; j++) {
                    let time = dayReports[i].dataValues.time_balances[j].duration;
                    tf = String(time)
                    ws.cell(j + sum + 5, 1).number(j + 1).style(styleText);
                    ws.cell(j + sum + 5, 2).string(dayReports[i].dataValues.time_balances[j].spr_operation.operation_short_name).style(styleText);
                    ws.cell(j + sum + 5, 3).string(dayReports[i].dataValues.time_balances[j].spr_operation.operation_full_name).style(styleText);
                    ws.cell(j + sum + 5, 4).string(durationNumber.toFixed(2)).style(styleText);
                    durationArr = [tf];
                    durationNumber = Number(durationArr.map(hhMmToMinutes).map(x => sumArr += x).map(minutesToHhMm));
                    ws.cell(j + sum + 5, 5).string(durationNumber.toFixed(2)).style(styleText);
                    ws.cell(j + sum + 5, 6).string(tf).style(styleText);
                }
            }
        }

        wb.write(`svod-work-drilling-${moment(dayReports[0].dataValues.report_date).format('DD.MM.YYYY')}.xlsx`, res);
    } catch (e) {
        errorHandler(res, e)
    }
}


