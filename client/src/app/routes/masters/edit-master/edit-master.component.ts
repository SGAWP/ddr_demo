import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MastersService } from '../../../shared/services/masters.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-edit-master',
  templateUrl: './edit-master.component.html',
  styleUrls: ['./edit-master.component.scss']
})
export class EditMasterComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditMasterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private _mastersService: MastersService,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.initializeForm()
  }

  initializeForm() {
    if (this.data.action == 'edit') {
      this.form = this.fb.group({
        master_name: new FormControl(this.data.data.master_name, Validators.required),
        assistant_master: new FormControl(this.data.data.assistant_master),
        second_assistant_master: new FormControl(this.data.data.second_assistant_master),
        comment: new FormControl(this.data.data.comment),
        master_id: new FormControl(this.data.data.master_id)
      })
    } else {
      this.form = new FormGroup({
        master_name: new FormControl("", Validators.required),
        assistant_master: new FormControl(""),
        second_assistant_master: new FormControl(""),
        comment: new FormControl("")
      })
    }
  }

  onSave() {
    this._mastersService.update(this.form.value.master_id, this.form.value).subscribe(
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
