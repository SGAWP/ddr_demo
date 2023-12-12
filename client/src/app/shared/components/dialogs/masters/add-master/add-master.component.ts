import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MastersService } from '../../../../services/masters.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-add-master',
  templateUrl: './add-master.component.html',
  styleUrls: ['./add-master.component.scss']
})
export class AddMasterComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddMasterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private _mastersService: MastersService,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.initializeForm()
  }

  initializeForm() {
    if (this.data.action == 'add') {
      this.form = new FormGroup({
        master_name: new FormControl("", Validators.required),
        assistant_master: new FormControl(""),
        second_assistant_master: new FormControl(""),
        comment: new FormControl("")
      })
    }
  }

  onSave() {
    this._mastersService.create(this.form.value).subscribe(
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

  getMasterNameErrorMessage() {
    return this.form.controls.master_name.hasError('required') ? 'Поле "ФИО мастера" не должно быть пустым.' : '';
  }

}
