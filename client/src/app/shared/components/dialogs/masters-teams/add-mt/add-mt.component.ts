import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MastersTeamsService } from '../../../../services/masters-teams.service';
import { MastersComponent } from '../../masters/masters.component';
import { TeamsComponent } from '../../teams/teams.component';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-add-mt',
  templateUrl: './add-mt.component.html',
  styleUrls: ['./add-mt.component.scss']
})
export class AddMtComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddMtComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private _mtService: MastersTeamsService,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.initializeForm()
  }

  initializeForm() {
    if (this.data.action == 'add') {
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
    this._mtService.create(this.form.value).subscribe(
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
