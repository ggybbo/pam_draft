import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class CoursesService implements Resolve<any> {
  // 나중에 any에 courses 모델을 넣어주어야 한다
  onCategoriesChanged: BehaviorSubject<any>;
  onCoursesChanged: BehaviorSubject<any>;

  constructor(private _httpClient: HttpClient) {
    this.onCategoriesChanged = new BehaviorSubject({});
    this.onCoursesChanged = new BehaviorSubject({});
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([this.getCategories(), this.getCourses()]).then(() => {
        resolve();
      }, reject);
    });
  }

  getCategories(): Promise<any> {
    return new Promise((resolve, reject) => {
      // this._httpClient
      //   .get('api/courses/categories')
      //   .subscribe((response: any) => {
      this.onCategoriesChanged.next([
        {
          label: 'beginner',
          value: '1'
        },
        {
          label: 'speaker',
          value: '2'
        },
        {
          label: 'fluent',
          value: '3'
        }
      ]);
      //     resolve(response);
      //   }, reject);
      resolve('Category for courses');
    });
  }

  getCourses(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient
        .get('http://localhost:3000/classes')
        .subscribe((response: any) => {
          this.onCoursesChanged.next(response);
          resolve(response);
        }, reject);
      // this.onCoursesChanged.next([
      //   {
      //     id: '15459251a6d6b397565',
      //     title: 'Basics of Angular',
      //     slug: 'basics-of-angular',
      //     category: 'speaker',
      //     length: 30,
      //     updated: 'Jun 28, 2017',
      //     level: 5,
      //     location: '궁동 더처치',
      //     member: 3
      //   },
      //   {
      //     id: '154588a0864d2881124',
      //     title: 'Basics of TypeScript',
      //     slug: 'basics-of-typeScript',
      //     category: 'web',
      //     length: 60,
      //     updated: 'Nov 01, 2017',
      //     level: 3,
      //     location: '궁동 더처치',
      //     member: 3
      //   },
      //   {
      //     id: '15453ba60d3baa5daaf',
      //     title: 'Android N: Quick Settings',
      //     slug: 'android-n-quick-settings',
      //     category: 'speaker',
      //     length: 120,
      //     updated: 'Jun 28, 2017',
      //     level: 3,
      //     location: '궁동 더처치',
      //     member: 3
      //   },
      //   {
      //     id: '15453a06c08fb021776',
      //     title: 'Keep Sensitive Data Safe and Private',
      //     slug: 'keep-sensitive-data-safe-and-private',
      //     category: 'speaker',
      //     length: 45,
      //     updated: 'Jun 28, 2017',
      //     level: 3,
      //     location: '궁동 더처치',
      //     member: 3
      //   },
      //   {
      //     id: '15427f4c1b7f3953234',
      //     title: 'Building a gRPC Service with Java',
      //     slug: 'building-a-grpc-service-with-java',
      //     category: 'cloud',
      //     length: 30,
      //     updated: 'Jun 28, 2017',
      //     level: 3,
      //     location: '궁동 더처치',
      //     member: 3
      //   },
      //   {
      //     id: '1542d75d929a603125',
      //     title: 'Build a PWA Using Workbox',
      //     slug: 'build-a-pwa-using-workbox',
      //     category: 'speaker',
      //     length: 120,
      //     updated: 'Jun 28, 2017',
      //     level: 3,
      //     location: '궁동 더처치',
      //     member: 3
      //   },
      //   {
      //     id: '1543ee3a5b43e0f9f45',
      //     title:
      //       'Build an App for the Google Assistant with Firebase and Dialogflow',
      //     slug:
      //       'build-an-app-for-the-google-assistant-with-firebase-and-dialogflow',
      //     category: 'beginner',
      //     length: 30,
      //     updated: 'Jun 28, 2017',
      //     level: 3,
      //     location: '궁동 더처치',
      //     member: 3
      //   },
      //   {
      //     id: '1543cc4515df3146112',
      //     title: 'Cloud Functions for Firebase',
      //     slug: 'cloud-functions-for-firebase',
      //     category: 'fluent',
      //     length: 45,
      //     updated: 'Jun 28, 2017',
      //     level: 3,
      //     location: '궁동 더처치',
      //     member: 3
      //   },
      //   {
      //     id: '154398a4770d7aaf9a2',
      //     title: "Manage Your Pivotal Cloud Foundry App's Using Apigee Edge",
      //     slug: 'manage-your-pivotal-cloud-foundry-apps-using-apigee-Edge',
      //     category: 'beginner',
      //     length: 90,
      //     updated: 'Jun 28, 2017',
      //     level: 3,
      //     location: '궁동 더처치',
      //     member: 3
      //   },
      //   {
      //     id: '15438351f87dcd68567',
      //     title: 'Building Beautiful UIs with Flutter',
      //     your: 'building-beautiful-uis-with-flutter',
      //     category: 'beginner',
      //     length: 90,
      //     updated: 'Jun 28, 2017',
      //     level: 3,
      //     location: '궁동 더처치',
      //     member: 3
      //   },
      //   {
      //     id: '1544e43dcdae6ebf876',
      //     title: 'Cloud Firestore',
      //     slug: 'cloud-firestore',
      //     category: 'firebase',
      //     length: 90,
      //     updated: 'Jun 28, 2017',
      //     level: 3,
      //     location: '궁동 더처치',
      //     member: 3
      //   },
      //   {
      //     id: '1541ca7af66da284177',
      //     title: 'Customize Network Topology with Subnetworks',
      //     slug: 'customize-network-topology-with-subnetworks',
      //     category: 'web',
      //     length: 45,
      //     updated: 'Jun 28, 2017',
      //     level: 3,
      //     location: '궁동 더처치',
      //     member: 3
      //   },
      //   {
      //     id: '154297167e781781745',
      //     title: 'Looking at Campaign Finance with BigQuery',
      //     slug: 'looking-at-campaign-finance-with-bigquery',
      //     category: 'beginner',
      //     length: 60,
      //     updated: 'Jun 28, 2017',
      //     level: 3,
      //     location: '궁동 더처치',
      //     member: 3
      //   },
      //   {
      //     id: '154537435d5b32bf11a',
      //     title: 'Firebase Android',
      //     slug: 'firebase-android',
      //     category: 'fluent',
      //     length: 45,
      //     updated: 'Jun 28, 2017',
      //     level: 3,
      //     location: '궁동 더처치',
      //     member: 3
      //   },
      //   {
      //     id: '154204e45a59b168453',
      //     title: 'Simulating a Thread Network Using OpenThread',
      //     slug: 'simulating-a-thread-network-using-openthread',
      //     category: 'beginner',
      //     length: 45,
      //     updated: 'Jun 28, 2017',
      //     level: 3,
      //     location: '궁동 더처치',
      //     member: 3
      //   },
      //   {
      //     id: '1541dd1e05dfc439216',
      //     title: 'Your First Progressive Web App',
      //     slug: 'your-first-progressive-web-app',
      //     category: 'speaker',
      //     length: 30,
      //     updated: 'Jun 28, 2017',
      //     level: 3,
      //     location: '궁동 더처치',
      //     member: 3
      //   },
      //   {
      //     id: '1532dfc67e704e48515',
      //     title: 'Launch Cloud Datalab',
      //     slug: 'launch-cloud-datalab',
      //     category: 'fluent',
      //     length: 60,
      //     updated: 'Jun 28, 2017',
      //     level: 3,
      //     location: '궁동 더처치',
      //     member: 3
      //   },
      //   {
      //     id: '1542e43dfaae6ebf226',
      //     title: 'Personalize Your iOS App with Firebase User Management',
      //     slug: 'personalize-your-ios-app-with-firebase-user-management',
      //     category: 'speaker',
      //     length: 90,
      //     updated: 'Jun 28, 2017',
      //     level: 3,
      //     location: '궁동 더처치',
      //     member: 3
      //   }
      // ]);
      // resolve([]);
    });
  }
}
