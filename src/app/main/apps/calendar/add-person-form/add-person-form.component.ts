import { Component, OnInit, Inject } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddPersonService } from './add-person-form.service';

export interface PeriodicElement {
  id: number;
  name: string;
  email: string;
  nick: string;
  level: number;
  thumbnail_image: string;
}

@Component({
  selector: 'app-add-person-form',
  templateUrl: './add-person-form.component.html',
  styleUrls: ['./add-person-form.component.scss']
})
export class AddPersonFormComponent implements OnInit {
  displayedColumns: string[] = [
    'select',
    'name',
    'email',
    'nick',
    'level',
    'thumbnail_image'
  ];
  ELEMENT_DATA: PeriodicElement[];
  dataSource: any;
  selection: any;
  memberId: any;
  dialogTitle: string;
  key: string;

  constructor(
    public matDialogRef: MatDialogRef<AddPersonFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _addpersonService: AddPersonService
  ) {
    this.dialogTitle = 'Members';
    this.key = _data.event.meta.key;
  }

  ngOnInit(): void {
    this._addpersonService
      .getMemberId(this.key)
      .then(data => {
        this.memberId = data;
        this._addpersonService
          .getMember()
          .then(data => {
            const selectedMember = data.filter(e =>
              this.memberId.includes(e.id)
            );
            this.ELEMENT_DATA = data;
            console.log(this.ELEMENT_DATA);
            this.dataSource = new MatTableDataSource<PeriodicElement>(
              this.ELEMENT_DATA
            );
            this.selection = new SelectionModel<PeriodicElement>(
              true,
              selectedMember
            );
          })
          .catch(err => console.error('member list error'));
      })
      .catch(err => console.error(err));
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  singleToggle(row): void {
    // console.log(row);
    // console.log(this.selection.selected);
    // console.log(this.selection.hasValue());

    const isDeleted = this.selection.selected.find(el => {
      return el.id === row.id && el.name === row.name;
    });

    if (!isDeleted) {
      console.log('insert');
      console.log(this.key);
      this._addpersonService
        .addMember(this.key, row.id, row.thumbnail_image)
        .then(result => console.log(result))
        .catch(err => console.error(err));
    } else {
      console.log('delete');
      this._addpersonService
        .deleteMember(this.key, row.id)
        .then(result => console.log(result))
        .catch(err => console.error(err));
    }
  }
}
