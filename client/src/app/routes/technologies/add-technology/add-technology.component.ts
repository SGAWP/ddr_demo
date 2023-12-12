import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SprTechnologiesService } from '../../../shared/services/spr-technologies.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-add-technology',
  templateUrl: './add-technology.component.html',
  styleUrls: ['./add-technology.component.scss']
})
export class AddTechnologyComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddTechnologyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _technologyService: SprTechnologiesService,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.initializeForm()
  }

  initializeForm() {
    if (this.data.action == 'add') {
      this.form = new FormGroup({
        technology: new FormControl("", Validators.required),
        is_active: new FormControl(true)
      })
    }
  }

  onSave() {
    this._technologyService.create(this.form.value).subscribe(
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

  getTechnologyErrorMessage() {
    return this.form.controls.technology.hasError('required') ? 'Поле "Технология" не должно быть пустым.' : '';
  }

}