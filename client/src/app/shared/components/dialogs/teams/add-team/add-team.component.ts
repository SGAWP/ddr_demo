import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TeamsService } from '../../../../services/teams.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss']
})
export class AddTeamComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddTeamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _teamsService: TeamsService,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.initializeForm()
  }

  initializeForm() {
    if (this.data.action == 'add') {
      this.form = new FormGroup({
        team_name: new FormControl("", Validators.required),
        comment: new FormControl(""),
        is_active: new FormControl(true)
      })
    }
  }

  onSave() {
    this._teamsService.create(this.form.value).subscribe(
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

  getTeamNameErrorMessage() {
    return this.form.controls.team_name.hasError('required') ? 'Поле "Бригада" не должно быть пустым.' : '';
  }

}
