import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';

import { ProfileService } from './profile.service';
import { ContactsContactFormDialogComponent } from 'app/main/pages/profile/contact-form/contact-form.component';
import { FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ProfileComponent implements OnInit {
  thumbnail_image: string;
  name: string;
  dialogRef: any;
  contacts: any;

  private _unsubscribeAll: Subject<any>;
  /**
   * Constructor
   */
  constructor(private _profile: ProfileService, private _matDialog: MatDialog) {
    this.thumbnail_image = '';
    this.name = '';
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this._profile
      .getUserInfo()
      .then(data => {
        this.thumbnail_image = data.thumbnail_image;
        this.name = data.name;
      })
      .catch(err => console.error(err));

    this._profile.onContactsChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(contacts => {
        this.contacts = contacts;
      });
  }

  /**
   * New contact
   */
  newContact(): void {
    this.dialogRef = this._matDialog.open(ContactsContactFormDialogComponent, {
      panelClass: 'contact-form-dialog',
      data: {
        contact: this.contacts[0],
        action: 'edit'
      }
    });

    this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
      if (!response) {
        return;
      }
      const formData: FormGroup = response[1];
      this._profile.updateContact(formData.getRawValue());
    });
  }
}
