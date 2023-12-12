import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OwlDateTimeIntl } from 'ng-pick-datetime';
import { TextMaskModule } from 'angular2-text-mask';
import { DialogsModule } from './components/dialogs/dialogs.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToastrModule } from "ngx-toastr";
import { ConfirmComponent } from './components/confirm/confirm.component';
import { OwlDTIntl } from './classes/owldatetimeintl';
import { CloseComponent } from './components/close/close.component';

@NgModule({
  declarations: [
    ConfirmComponent,
    CloseComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    TextMaskModule,
    MaterialModule,
    DialogsModule,
    ToastrModule.forRoot(),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FlexLayoutModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TextMaskModule,
    ReactiveFormsModule,
    MaterialModule,
    DialogsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FlexLayoutModule
  ],
  entryComponents: [
    ConfirmComponent,
    CloseComponent
  ],
  providers: [
    { provide: OwlDateTimeIntl, useClass: OwlDTIntl }
  ]
})
export class SharedModule { }
