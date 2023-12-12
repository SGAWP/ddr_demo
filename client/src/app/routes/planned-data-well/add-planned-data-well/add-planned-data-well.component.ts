import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlannedDataWellService } from '../../../shared/services/planned-data-well.service';
import { SprCustomersService } from '../../../shared/services/spr-customers.service';
import { SprTechnologiesService } from '../../../shared/services/spr-technologies.service';
import { SprWellPurposesService } from '../../../shared/services/spr-well-purposes.service';
import { SprTypesService } from '../../../shared/services/spr-types.service';
import { SprDrillrigsService } from '../../../shared/services/spr-drillrigs.service';
import { ToastrService } from "ngx-toastr";
import { Customer, Technology, WellPurpose, Type, Drillrig } from "../../../shared/interfaces";
import { WellplatformsComponent } from '../../../shared/components/dialogs/wellplatforms/wellplatforms.component';
import { MastersTeamsComponent } from '../../../shared/components/dialogs/masters-teams/masters-teams.component';

@Component({
  selector: 'app-add-planned-data-well',
  templateUrl: './add-planned-data-well.component.html',
  styleUrls: ['./add-planned-data-well.component.scss']
})
export class AddPlannedDataWellComponent implements OnInit {

  form: FormGroup;

  customers: Customer[];
  technologies: Technology[];
  wellPurposes: WellPurpose[];
  types: Type[];
  drillrigs: Drillrig[];

  constructor(
    public dialogRef: MatDialogRef<AddPlannedDataWellComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private _plannedDataWellService: PlannedDataWellService,
    private _sprCustomersService: SprCustomersService,
    private _sprTechnologiesService: SprTechnologiesService,
    private _sprWellPurposesService: SprWellPurposesService,
    private _sprTypesService: SprTypesService,
    private _sprDrillrigsService: SprDrillrigsService,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.loadCustomers();
    this.loadDrillrigs();
    this.loadTechnologies();
    this.loadTypes();
    this.loadWellPurposes();
  }

  loadCustomers() {
    this._sprCustomersService.getAllIsActive().subscribe(customer => {
      this.customers = customer;
    });
  }


  loadTechnologies() {
    this._sprTechnologiesService.getAllIsActive().subscribe(technology => {
      this.technologies = technology;
    });
  }


  loadWellPurposes() {
    this._sprWellPurposesService.getAllIsActive().subscribe(wellPurpose => {
      this.wellPurposes = wellPurpose;
    });
  }


  loadTypes() {
    this._sprTypesService.getAllIsActive().subscribe(type => {
      this.types = type;
    });
  }


  loadDrillrigs() {
    this._sprDrillrigsService.getAllIsActive().subscribe(drillrig => {
      this.drillrigs = drillrig;
    });
  }

  initializeForm() {
    if (this.data.action == 'add') {
      this.form = new FormGroup({
        spr_wellplatforms_id: new FormControl(null, Validators.required),
        wellplatform_name: new FormControl({ value: "", disabled: true }, Validators.required),
        oilfield_short_name: new FormControl({ value: "", disabled: true }, Validators.required),
        well: new FormControl("", Validators.required),
        layer: new FormControl(""),
        chock: new FormControl(null),
        masters_teams_id: new FormControl(null, Validators.required),
        team_name: new FormControl({ value: "", disabled: true }, Validators.required),
        master_name: new FormControl({ value: "", disabled: true }, Validators.required),
        assistant_master: new FormControl({ value: "", disabled: true }, Validators.required),
        second_assistant_master: new FormControl({ value: "", disabled: true }, Validators.required),
        drill_start: new FormControl("", Validators.required),
        drill_end: new FormControl("", Validators.required),
        project_depth: new FormControl(null, Validators.required),
        diameter: new FormControl(null, Validators.required),
        spr_customers_id: new FormControl(null, Validators.required),
        spr_well_purposes_id: new FormControl(null, Validators.required),
        spr_technologies_id: new FormControl(null, Validators.required),
        spr_types_id: new FormControl(null, Validators.required),
        spr_drillrigs_id: new FormControl(null, Validators.required)
      })  
    }
  }

  openDialogWellplatforms() {
    let dialogRef = this.dialog.open(WellplatformsComponent, {
      width: "500px",
      data: { title: "Кусты" }
    });
    dialogRef.afterClosed().subscribe(wellplatforms => {
      if (wellplatforms) {
        this.form.get("spr_wellplatforms_id").patchValue(wellplatforms.wellplatform_id);
        this.form.get("wellplatform_name").patchValue(wellplatforms.wellplatform_name);
        this.form.get("oilfield_short_name").patchValue(wellplatforms.oilfield_short_name);
      }
    });
  }

  openDialogMT() {
    let dialogRef = this.dialog.open(MastersTeamsComponent, {
      width: "700px",
      data: { title: "Бригады и Мастера" }
    });
    dialogRef.afterClosed().subscribe(mt => {
      if (mt) {
        this.form.get("masters_teams_id").patchValue(mt.master_team_id);
        this.form.get("team_name").patchValue(mt.team_name);
        this.form.get("master_name").patchValue(mt.master_name);
        this.form.get("assistant_master").patchValue(mt.assistant_master);
        this.form.get("second_assistant_master").patchValue(mt.second_assistant_master);
      }
    });
  }

  onSave() {
    this._plannedDataWellService.create(this.form.value).subscribe(
      () => {
        this.dialogRef.close(true);
        this._toast.success("Данные сохранены.");
      },
      error => {
        this.dialogRef.close(true);
        this._toast.error(error.error.message);
      }
    )
  }

  getWellErrorMessage() {
    return this.form.controls.well.hasError('required') ? 'Поле "Скважина" не должно быть пустым.' : '';
  }

  getProjectDepthErrorMessage() {
    return this.form.controls.project_depth.hasError('required') ? 'Поле "Проектная глубина" не должно быть пустым.' : '';
  }

  getDrillStartErrorMessage() {
    return this.form.controls.drill_start.hasError('required') ? 'Выберите дату начала.' : '';
  }

  getDrillEndErrorMessage() {
    return this.form.controls.drill_end.hasError('required') ? 'Выберите дату конца.' : '';
  }

  getDrillrigErrorMessage() {
    return this.form.controls.spr_drillrigs_id.hasError('required') ? 'Выберите бур. установку.' : '';
  }

  getCustomerErrorMessage() {
    return this.form.controls.spr_customers_id.hasError('required') ? 'Выберите заказчика.' : '';
  }

  getWellPurposeErrorMessage() {
    return this.form.controls.spr_well_purposes_id.hasError('required') ? 'Выберите назначение.' : '';
  }

  getTechnologyErrorMessage() {
    return this.form.controls.spr_technologies_id.hasError('required') ? 'Выберите технологию.' : '';
  }

  getTypeErrorMessage() {
    return this.form.controls.spr_types_id.hasError('required') ? 'Выберите тип.' : '';
  }

  getDiameterErrorMessage() {
    return this.form.controls.diameter.hasError('required') ? 'Поле "Диаметер" не должно быть пустым.' : '';
  }

}
