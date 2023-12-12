import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MastersTeamsService } from '../../../../services/masters-teams.service';
import { MastersComponent } from '../../masters/masters.component';
import { TeamsComponent } from '../../teams/teams.component';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-edit-mt',
  templateUrl: './edit-mt.component.html',
  styleUrls: ['./edit-mt.component.scss']
})
export class EditMtComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditMtComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private _mtService: MastersTeamsService,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.initializeForm()
  }

  initializeForm() {
    if (this.data.action == 'edit') {
      this.form = this.fb.group({
        masters_id: new FormControl(this.data.data.masters_id, Validators.required),
        master_name: new FormControl({ value: this.data.data.master_name, disabled: true }, Validators.required),
        assistant_master: new FormControl({ value: this.data.data.assistant_master, disabled: true }),
        second_assistant_master: new FormControl({ value: this.data.data.second_assistant_master, disabled: true }),
        teams_id: new FormControl(this.data.data.teams_id, Validators.required),
        team_name: new FormControl({ value: this.data.data.team_name, disabled: true }, Validators.required),
        master_team_id: new FormControl(this.data.data.master_team_id)
      })
    } else {
      this.form = new FormGroup({
        masters_id: new FormControl(null, Validators.required),
        master_name: new FormControl({ value: "", disabled: true }, Validators.required),
        assistant_master: new FormControl({ value: "", disabled: true }),
        second_assistant_master: new FormControl({ value: "", disabled: true }),
        teams_id: new FormControl(null, Validators.required),
        team_name: new FormControl({ value: "", disabled: true }, Validators.required)
      })
    }
  }

  openDialogMasters() {
    let dialogRef = this.dialog.open(MastersComponent, {
      width: "500px",
      data: { title: "Мастера" }
    });
    dialogRef.afterClosed().subscribe(masters => {
      if (masters) {
        this.form.get("masters_id").patchValue(masters.master_id);
        this.form.get("master_name").patchValue(masters.master_name);
        this.form.get("assistant_master").patchValue(masters.assistant_master);
        this.form.get("second_assistant_master").patchValue(masters.second_assistant_master);
      }
    });
  }

  openDialogTeams() {
    let dialogRef = this.dialog.open(TeamsComponent, {
      width: "500px",
      data: { title: "Бригада" }
    });
    dialogRef.afterClosed().subscribe(teams => {
      if (teams) {
        this.form.get("teams_id").patchValue(teams.team_id);
        this.form.get("team_name").patchValue(teams.team_name);
      }
    });
  }

  onSave() {
    this._mtService.update(this.form.value.master_team_id, this.form.value).subscribe(
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
}
