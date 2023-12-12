import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { SprTechnologiesService } from '../../../shared/services/spr-technologies.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-edit-technology',
  templateUrl: './edit-technology.component.html',
  styleUrls: ['./edit-technology.component.scss']
})
export class EditTechnologyComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditTechnologyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _technologyService: SprTechnologiesService,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    if (this.data.action == 'edit') {
      this.form = this.fb.group({
        technology: new FormControl(this.data.data.technology, Validators.required),
        is_active: new FormControl(this.data.data.is_active, Validators.required),
        technology_id: new FormControl(this.data.data.technology_id, Validators.required)
      })
    } else {
      this.form = new FormGroup({
        technology: new FormControl("", Validators.required),
        is_active: new FormControl(true)
      })
    }
  }

  onSave() {
    this._technologyService.update(this.form.value.technology_id, this.form.value).subscribe(
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

  getTechnologyErrorMessage() {
    return this.form.controls.technology.hasError('required') ? 'Поле "Технология" не должно быть пустым.' : '';
  }

}
