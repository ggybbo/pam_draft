import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { settings } from '../../../../../environments/global';

@Injectable()
export class ProjectDashboardService implements Resolve<any> {
  widgets: any;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient, private _router: Router) {}

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
      Promise.all([this.getProjects()]).then(() => {
        resolve();
      }, reject);
    });
  }

  /**
   * Get projects
   *
   * @returns {Promise<any>}
   */
  getProjects(): Promise<any> {
    const userId = JSON.parse(sessionStorage.getItem('userInfo')).userData.id;
    if (!userId) {
      this._router.navigate(['/pages/auth/login']);
      return;
    }
    return new Promise((resolve, reject) => {
      this._httpClient
        .get(`http://${settings.apiUrl}:3000/analytics/${userId}`)
        .subscribe((response: any) => {
          this.widgets = Object.assign(
            {
              widget6: {
                markers: [
                  {
                    lat: 36.3587874,
                    lng: 127.3427597,
                    label: '궁동 페리도트'
                  },
                  {
                    lat: 36.3522366,
                    lng: 127.3719799,
                    label: '갈마 하얀책상'
                  },
                  {
                    lat: 36.3622634,
                    lng: 127.3415383,
                    label: '궁동 카페에스티퍼스트'
                  },
                  {
                    lat: 36.4337576,
                    lng: 127.38938,
                    label: '관평 (주)테라테크노스'
                  },
                  {
                    lat: 36.3529169,
                    lng: 127.3775948,
                    label: '둔산 윙스터디'
                  },
                  {
                    lat: 36.3481697,
                    lng: 127.298207,
                    label: '한밭대 그린브라우니'
                  }
                ],
                styles: [
                  {
                    featureType: 'administrative',
                    elementType: 'labels.text.fill',
                    stylers: [
                      {
                        color: '#444444'
                      }
                    ]
                  },
                  {
                    featureType: 'landscape',
                    elementType: 'all',
                    stylers: [
                      {
                        color: '#f2f2f2'
                      }
                    ]
                  },
                  {
                    featureType: 'poi',
                    elementType: 'all',
                    stylers: [
                      {
                        visibility: 'off'
                      }
                    ]
                  },
                  {
                    featureType: 'road',
                    elementType: 'all',
                    stylers: [
                      {
                        saturation: -100
                      },
                      {
                        lightness: 45
                      }
                    ]
                  },
                  {
                    featureType: 'road.highway',
                    elementType: 'all',
                    stylers: [
                      {
                        visibility: 'simplified'
                      }
                    ]
                  },
                  {
                    featureType: 'road.arterial',
                    elementType: 'labels.icon',
                    stylers: [
                      {
                        visibility: 'off'
                      }
                    ]
                  },
                  {
                    featureType: 'transit',
                    elementType: 'all',
                    stylers: [
                      {
                        visibility: 'off'
                      }
                    ]
                  },
                  {
                    featureType: 'water',
                    elementType: 'all',
                    stylers: [
                      {
                        color: '#039be5'
                      },
                      {
                        visibility: 'on'
                      }
                    ]
                  }
                ]
              }
            },
            {
              widget9: {
                rows: [
                  {
                    title: '5월 7일',
                    clicks: 10,
                    conversion: 30
                  },
                  {
                    title: '5월 9일',
                    clicks: 10,
                    conversion: 0
                  },
                  {
                    title: '5월 14일',
                    clicks: 15,
                    conversion: 30
                  }
                ]
              }
            }
          );
          resolve(response);
        }, reject);
    });
  }
}
