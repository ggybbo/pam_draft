import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { settings } from '../../../../environments/global';
import { Contact } from 'app/main/apps/contacts/contact.model';

@Injectable()
export class ProfileService implements Resolve<any> {
  timeline: any;
  about: any;
  photosVideos: any;
  userInfo: any;
  contacts: Contact[];

  timelineOnChanged: BehaviorSubject<any>;
  aboutOnChanged: BehaviorSubject<any>;
  photosVideosOnChanged: BehaviorSubject<any>;
  onContactsChanged: BehaviorSubject<any>;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient, private _router: Router) {
    // Set the defaults
    this.timelineOnChanged = new BehaviorSubject({});
    this.aboutOnChanged = new BehaviorSubject({});
    this.photosVideosOnChanged = new BehaviorSubject({});
    this.onContactsChanged = new BehaviorSubject([]);

    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    if (!this.userInfo) {
      sessionStorage.removeItem('userInfo');
      sessionStorage.removeItem('currentUser');
      this._router.navigate(['/pages/auth/login']);
      location.reload();
      return;
    }
  }

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getTimeline(),
        this.getAbout(),
        this.getPhotosVideos(),
        this.getUserInfo(),
        this.getContacts()
      ]).then(() => {
        resolve();
      }, reject);
    });
  }

  /**
   * Get contacts
   *
   * @returns {Promise<any>}
   */
  getContacts(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient
        .get(
          `http://${settings.apiUrl}:3000/users/info/${
            this.userInfo.userData.id
          }`
        )
        .subscribe((response: any) => {
          this.contacts = [response];

          this.contacts = this.contacts.map(contact => {
            return new Contact(contact);
          });

          this.onContactsChanged.next(this.contacts);
          resolve(this.contacts);
        }, reject);
    });
  }

  /**
   * Get timeline
   */
  getTimeline(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient
        .get(`http://${settings.apiUrl}:3000/courses`)
        .subscribe((timeline: any) => {
          this.timeline = timeline;
          this.timelineOnChanged.next(this.timeline);
          resolve(this.timeline);
        }, reject);
    });
  }

  /**
   * Get about
   */
  getAbout(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient
        .get(`http://${settings.apiUrl}:3000/courses`)
        .subscribe((about: any) => {
          this.about = about;
          this.aboutOnChanged.next(this.about);
          resolve(this.about);
        }, reject);
    });
  }

  /**
   * Get photos & videos
   */
  getPhotosVideos(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient
        .get(`http://${settings.apiUrl}:3000/users`)
        .subscribe((photosVideos: any) => {
          this.photosVideos = photosVideos;
          this.photosVideosOnChanged.next(this.photosVideos);
          resolve(this.photosVideos);
        }, reject);
    });
  }

  /**
   * Get User Info
   */
  getUserInfo(): any {
    return new Promise((resolve, reject) => {
      this._httpClient
        .get(
          `http://${settings.apiUrl}:3000/users/info/${
            this.userInfo.userData.id
          }`
        )
        .subscribe(data => {
          resolve(data);
        }, reject);
    });
  }

  /**
   * Update contact
   *
   * @param contact
   * @returns {Promise<any>}
   */
  updateContact(contact): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient
        .patch(`http://${settings.apiUrl}:3000/users/`, { ...contact })
        .subscribe(response => {
          this.getContacts();
          resolve(response);
        });
    });
  }
}
