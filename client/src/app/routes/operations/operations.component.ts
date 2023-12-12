import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageTitleService } from "../../shared/services/page-title.service";
import { Operation } from "../../shared/interfaces";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SprOperationsService } from '../../shared/services/spr-operations.service';
import { MatDialog, MatTreeNestedDataSource } from '@angular/material';
import { AddOperationComponent } from "./add-operation/add-operation.component";
import { AddOperationDirectoryComponent } from "./add-operation-directory/add-operation-directory.component";
import { EditOperationComponent } from "./edit-operation/edit-operation.component";
import { ConfirmComponent } from "../../shared/components/confirm/confirm.component";
import { ToastrService } from "ngx-toastr";
import { NestedTreeControl } from '@angular/cdk/tree';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss']
})
export class OperationsComponent implements OnInit, OnDestroy {

  title = "Операции";

  loading: boolean = false;
  isOpenForm: boolean = false;

  ngUnsubscribe = new Subject<void>();

  treeData: any[];
  treeControl = new NestedTreeControl<Operation>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Operation>();

  constructor(
    private pageTitleService: PageTitleService,
    private _operationsService: SprOperationsService,
    private _toast: ToastrService,
    public dialog: MatDialog
  ) {  }

  ngOnInit() {
    this.pageTitleService.setTitle(this.title);
    this.load();
  }

  load() {
    this.loading = true;
    this._operationsService.fetch().pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      this.loading = false;
      this.dataSource.data = data;
      this.treeData = data;
      this.treeControl.dataNodes = data;
      this.updateExpansionModel();
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

  addDirectory() {
    let dialogRef = this.dialog.open(AddOperationDirectoryComponent, {
      width: "500px",
      data: { title: "Добавить", action: "add" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.load();
      }
    });
  }

  add(row: Operation) {
    let dialogRef = this.dialog.open(AddOperationComponent, {
      width: "500px",
      data: { title: "Добавить", action: "add", data: row }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.load();
      }
    });
  }

  edit(row: Operation) {
    let dialogRef = this.dialog.open(EditOperationComponent, {
      width: "500px",
      data: { title: "Редактировать", action: "edit", data: row }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.load();
      }
    });
  }

  delete(row: Operation) {
    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        title: "Подтвердите удаление",
        message: `Вы уверены что хотите удалить операцию ${row.operation_full_name} и все связанные записи?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._operationsService.delete(row.operation_id).subscribe(
          response => this._toast.success(response.message),
          error => {
            this._toast.error(error.error.message);
          },
          () => {
            this.load();
          }
        );
      }
    });
  }

  public updateExpansionModel() {
    const allNodes = this.treeControl.dataNodes.reduce<Operation[]>(
      (accumulator, dataNode) => [
        ...accumulator,
        ...this.treeControl.getDescendants(dataNode),
        dataNode
      ],
      []
    );
    const selected = this.treeControl.expansionModel.selected;
    const newSelected = selected
      .map(({ operation_id }) => allNodes.find(node => node.operation_id === operation_id))
      .filter(node => typeof node !== 'undefined');
    this.treeControl.expansionModel.clear();
    this.treeControl.expansionModel.select(...newSelected);
  }

}

