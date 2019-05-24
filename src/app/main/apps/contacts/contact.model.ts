import { FuseUtils } from '@fuse/utils';

export class Contact {
  id: number;
  name: string;
  email: string;
  nick: string;
  level: number;
  thumbnail_image: string;
  mtype: number;
  tid: number;
  phone: number;
  notes: string;

  /**
   * Constructor
   *
   * @param contact
   */
  constructor(contact) {
    {
      this.id = contact.id;
      this.name = contact.name || '';
      this.email = contact.email || '';
      this.nick = contact.nick || '';
      this.level = contact.level || '';
      this.thumbnail_image =
        contact.thumbnail_image || 'assets/images/avatars/profile.jpg';
      this.mtype = contact.mtype || '';
      this.tid = contact.tid || '';
      this.phone = contact.phone || '';
      this.notes = contact.notes || '';
    }
  }
}
