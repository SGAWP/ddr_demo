import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTreeNestedDataSource, MatDialog } from '@angular/material';
import { SprOperationsService } from '../../../services/spr-operations.service';
import { ToastrService } from "ngx-toastr";
import { takeUntil } from 'rxjs/operators';
import { Operation } from '../../../interfaces'
import { Subject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { NestedTreeControl } from '@angular/cdk/tree';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss']
})
export class OperationsComponent implements OnInit, OnDestroy {

  loading: boolean = false;
  ngUnsubscribe = new Subject<void>();

  treeData: any[];
  treeControl = new NestedTreeControl<Operation>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Operation>();

  constructor(
    public dialogRef: MatDialogRef<OperationsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _operationsService: SprOperationsService,
    public dialog: MatDialog,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this._operationsService.fetch().pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      this.loading = false;
      this.dataSource.data = data;
      this.treeData = data;
      this.treeControl.dataNodes = data;
    }, error => {
      this.loading = false;
      this._toast.error(error.error.message);
    })
  }

  hasChild = (_: number, node: Operation) => !!node.children && node.children.length > 0;

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onAddToForm(row) {
    this.dialogRef.close(row);
  }

  close() {
    this.dialogRef.close();
  }
}

