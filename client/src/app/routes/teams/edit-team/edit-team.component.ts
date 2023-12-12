import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TeamsService } from '../../../shared/services/teams.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.scss']
})
export class EditTeamComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditTeamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _teamsService: TeamsService,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.initializeForm()
  }

  initializeForm() {
    if (this.data.action == 'edit') {
      this.form = this.fb.group({
        team_name: new FormControl(this.data.data.team_name, Validators.required),
        comment: new FormControl(this.data.data.comment),
        is_active: new FormControl(this.data.data.is_active),
        team_id: new FormControl(this.data.data.team_id)
      })
    } else {
      this.form = new FormGroup({
        team_name: new FormControl(null, Validators.required),
        comment: new FormControl(""),
        is_active: new FormControl(true)
      })
    }
  }

  onSave() {
    this._teamsService.update(this.form.value.team_id, this.form.value).subscribe(
      () => {
        this.dialogRef.close(true);
        this._toast.success("Данные сохраненны.");
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
