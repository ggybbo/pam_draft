import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { delay, filter, take, takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { ProfileService } from 'app/layout/profile.service';
import { TodoCountService } from 'app/services/todo/todocount.service';

@Component({
  selector: 'navbar-vertical-style-1',
  templateUrl: './style-1.component.html',
  styleUrls: ['./style-1.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarVerticalStyle1Component implements OnInit, OnDestroy {
  fuseConfig: any;
  navigation: any;
  name: string;
  email: string;
  imgUrl: string = '';

  // Private
  private _fusePerfectScrollbar: FusePerfectScrollbarDirective;
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {FuseConfigService} _fuseConfigService
   * @param {FuseNavigationService} _fuseNavigationService
   * @param {FuseSidebarService} _fuseSidebarService
   * @param {Router} _router
   */
  constructor(
    private _fuseConfigService: FuseConfigService,
    private _fuseNavigationService: FuseNavigationService,
    private _fuseSidebarService: FuseSidebarService,
    private _router: Router,
    private _profileService: ProfileService,
    private _todoCountService: TodoCountService
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  // Directive
  @ViewChild(FusePerfectScrollbarDirective)
  set directive(theDirective: FusePerfectScrollbarDirective) {
    if (!theDirective) {
      return;
    }

    this._fusePerfectScrollbar = theDirective;

    // Update the scrollbar on collapsable item toggle
    this._fuseNavigationService.onItemCollapseToggled
      .pipe(
        delay(500),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        this._fusePerfectScrollbar.update();
      });

    // Scroll to the active item position
    this._router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        take(1)
      )
      .subscribe(() => {
        setTimeout(() => {
          const activeNavItem: any = document.querySelector(
            'navbar .nav-link.active'
          );

          if (activeNavItem) {
            const activeItemOffsetTop = activeNavItem.offsetTop,
              activeItemOffsetParentTop = activeNavItem.offsetParent.offsetTop,
              scrollDistance =
                activeItemOffsetTop - activeItemOffsetParentTop - 48 * 3 - 168;

            this._fusePerfectScrollbar.scrollToTop(scrollDistance);
          }
        });
      });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this._router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        if (this._fuseSidebarService.getSidebar('navbar')) {
          this._fuseSidebarService.getSidebar('navbar').close();
        }
      });

    // Subscribe to the config changes
    this._fuseConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(config => {
        this.fuseConfig = config;
      });

    // Get current navigation
    this._fuseNavigationService.onNavigationChanged
      .pipe(
        filter(value => value !== null),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        this.navigation = this._fuseNavigationService.getCurrentNavigation();
      });

    // const accessToken = JSON.parse(localStorage.getItem('currentUser'));
    // const userDB = JSON.parse(sessionStorage.getItem('userInfo'));
    const accessToken = JSON.parse(sessionStorage.getItem('currentUser'));

    if (accessToken === null) {
      this._router.navigate(['/pages/auth/login']);
      return;
    }

    this._profileService
      .getProfile(accessToken.access_token)
      .subscribe((data: any) => {
        if (data.code === -401) {
          this._router.navigate(['/pages/auth/login']);
          return;
        }

        this.name = data.properties.nickname;
        this.email = data.kakao_account.email;
        this.imgUrl =
          data.properties.thumbnail_image ||
          'https://accounts.kakao.com/assets//weblogin/default_thumb@2x.png';
        this._todoCountService
          .getTodosCount(data.userData.id, data.userData.mtype)
          .then(data => {
            this._fuseNavigationService.addNavigationItem(
              {
                id: 'to-do',
                title: 'To-Do',
                translate: '숙제',
                type: 'item',
                icon: 'check_box',
                url: '/apps/todo',
                badge: {
                  title: data.count,
                  bg: '#FF6F00',
                  fg: '#FFFFFF'
                }
              },
              'pages'
            );
            if (data.rules >= 5) {
              this._fuseNavigationService.addNavigationItem(
                {
                  id: 'calendar',
                  title: 'Calendar',
                  translate: '일정',
                  type: 'item',
                  icon: 'today',
                  url: '/apps/calendar'
                },
                'applications'
              );
              this._fuseNavigationService.addNavigationItem(
                {
                  id: 'e-commerce',
                  title: 'E-Commerce',
                  translate: '수업자료',
                  type: 'collapsable',
                  icon: 'save',
                  children: [
                    {
                      id: 'products',
                      title: 'Materials',
                      type: 'item',
                      url: '/apps/e-commerce/products',
                      exactMatch: true
                    }
                  ]
                },
                'applications'
              );
              this._fuseNavigationService.addNavigationItem(
                {
                  id: 'contacts',
                  title: 'Contacts',
                  translate: '회원관리',
                  type: 'item',
                  icon: 'account_box',
                  url: '/apps/contacts'
                },
                'applications'
              );
            }
          })
          .catch(err => console.log('fail to get todo count from service'));
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle sidebar opened status
   */
  toggleSidebarOpened(): void {
    this._fuseSidebarService.getSidebar('navbar').toggleOpen();
  }

  /**
   * Toggle sidebar folded status
   */
  toggleSidebarFolded(): void {
    this._fuseSidebarService.getSidebar('navbar').toggleFold();
  }
}
