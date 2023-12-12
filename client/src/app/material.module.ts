import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkTableModule } from '@angular/cdk/table';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatIconModule,
  MatBadgeModule,
  MatMenuModule,
  MatInputModule,
  MatListModule,
  MatDividerModule,
  MatFormFieldModule,
  MatRippleModule,
  MatStepperModule,
  MatNativeDateModule,
  MatTreeModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatAutocompleteModule,
  MatToolbarModule,
  MatTooltipModule,
  MatPaginatorIntl,
  MatChipsModule,
  MatCardModule
} from "@angular/material";

import { CustomMatPaginatorIntl } from "./shared/classes/custom-mat-paginator-int";

@NgModule({
  exports: [
    ScrollingModule,
    CdkTableModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatTreeModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSelectModule,
    MatStepperModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: CustomMatPaginatorIntl
    }
  ]
})
export class MaterialModule { }
