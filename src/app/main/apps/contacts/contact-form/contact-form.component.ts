import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Contact } from 'app/main/apps/contacts/contact.model';

@Component({
  selector: 'contacts-contact-form-dialog',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContactsContactFormDialogComponent {
  action: string;
  contact: Contact;
  contactForm: FormGroup;
  dialogTitle: string;

  /**
   * Constructor
   *
   * @param {MatDialogRef<ContactsContactFormDialogComponent>} matDialogRef
   * @param _data
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    public matDialogRef: MatDialogRef<ContactsContactFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder
  ) {
    // Set the defaults
    this.action = _data.action;

    if (this.action === 'edit') {
      this.dialogTitle = 'Edit Contact';
      this.contact = _data.contact;
    } else {
      this.dialogTitle = 'New Contact';
      this.contact = new Contact({});
    }

    this.contactForm = this.createContactForm();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Create contact form
   *
   * @returns {FormGroup}
   */
  createContactForm(): FormGroup {
    return this._formBuilder.group({
      id: [{ value: this.contact.id, disabled: true }],
      name: [{ value: this.contact.name, disabled: true }],
      email: [{ value: this.contact.email, disabled: true }],
      nick: [this.contact.nick],
      level: [this.contact.level],
      avatar: [this.contact.thumbnail_image],
      mtype: [this.contact.mtype],
      tid: [this.contact.tid],
      phone: [this.contact.phone],
      notes: [this.contact.notes]
    });
  }
}
