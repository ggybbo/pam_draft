import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { navigation } from 'app/navigation/navigation';
import { locale as navigationEnglish } from 'app/navigation/i18n/en';
// import { locale as navigationTurkish } from 'app/navigation/i18n/tr';
import { TodoCountService } from './services/todo/todocount.service';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  fuseConfig: any;
  navigation: any;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {DOCUMENT} document
   * @param {FuseConfigService} _fuseConfigService
   * @param {FuseNavigationService} _fuseNavigationService
   * @param {FuseSidebarService} _fuseSidebarService
   * @param {FuseSplashScreenService} _fuseSplashScreenService
   * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
   * @param {Platform} _platform
   * @param {TranslateService} _translateService
   */
  constructor(
    @Inject(DOCUMENT) private document: any,
    private _fuseConfigService: FuseConfigService,
    private _fuseNavigationService: FuseNavigationService,
    private _fuseSidebarService: FuseSidebarService,
    private _fuseSplashScreenService: FuseSplashScreenService,
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private _translateService: TranslateService,
    private _platform: Platform,
    private _todoCountService: TodoCountService
  ) {
    // Get default navigation
    this.navigation = navigation;

    // Register the navigation to the service
    this._fuseNavigationService.register('main', this.navigation);

    // Set the main navigation as our current navigation
    this._fuseNavigationService.setCurrentNavigation('main');

    // Add languages
    this._translateService.addLangs(['en']);

    // Set the default language
    this._translateService.setDefaultLang('en');

    // Set the navigation translations
    this._fuseTranslationLoaderService.loadTranslations(navigationEnglish);

    // Use a language
    this._translateService.use('en');

    /**
     * ----------------------------------------------------------------------------------------------------
     * ngxTranslate Fix Start
     * ----------------------------------------------------------------------------------------------------
     */

    /**
     * If you are using a language other than the default one, i.e. Turkish in this case,
     * you may encounter an issue where some of the components are not actually being
     * translated when your app first initialized.
     *
     * This is related to ngxTranslate module and below there is a temporary fix while we
     * are moving the multi language implementation over to the Angular's core language
     * service.
     **/

    // Set the default language to 'en' and then back to 'tr'.
    // '.use' cannot be used here as ngxTranslate won't switch to a language that's already
    // been selected and there is no way to force it, so we overcome the issue by switching
    // the default language back and forth.
    /**
         setTimeout(() => {
            this._translateService.setDefaultLang('en');
            this._translateService.setDefaultLang('tr');
         });
         */

    /**
     * ----------------------------------------------------------------------------------------------------
     * ngxTranslate Fix End
     * ----------------------------------------------------------------------------------------------------
     */

    // Add is-mobile class to the body if the platform is mobile
    if (this._platform.ANDROID || this._platform.IOS) {
      this.document.body.classList.add('is-mobile');
    }

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to config changes
    this._fuseConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(config => {
        this.fuseConfig = config;

        // Boxed
        if (this.fuseConfig.layout.width === 'boxed') {
          this.document.body.classList.add('boxed');
        } else {
          this.document.body.classList.remove('boxed');
        }

        // Color theme - Use normal for loop for IE11 compatibility
        for (let i = 0; i < this.document.body.classList.length; i++) {
          const className = this.document.body.classList[i];

          if (className.startsWith('theme-')) {
            this.document.body.classList.remove(className);
          }
        }

        this.document.body.classList.add(this.fuseConfig.colorTheme);
      });

    // this._todoCountService
    //   .getTodosCount()
    //   .then(data => {
    //     this._fuseNavigationService.addNavigationItem(
    //       {
    //         id: 'to-do',
    //         title: 'To-Do',
    //         translate: '숙제',
    //         type: 'item',
    //         icon: 'check_box',
    //         url: '/apps/todo',
    //         badge: {
    //           title: data.count,
    //           bg: '#FF6F00',
    //           fg: '#FFFFFF'
    //         }
    //       },
    //       'pages'
    //     );
    //     if (data.rules >= 5) {
    //       this._fuseNavigationService.addNavigationItem(
    //         {
    //           id: 'calendar',
    //           title: 'Calendar',
    //           translate: '일정',
    //           type: 'item',
    //           icon: 'today',
    //           url: '/apps/calendar'
    //         },
    //         'applications'
    //       );
    //       this._fuseNavigationService.addNavigationItem(
    //         {
    //           id: 'e-commerce',
    //           title: 'E-Commerce',
    //           translate: '수업자료',
    //           type: 'collapsable',
    //           icon: 'save',
    //           children: [
    //             {
    //               id: 'products',
    //               title: 'Materials',
    //               type: 'item',
    //               url: '/apps/e-commerce/products',
    //               exactMatch: true
    //             }
    //           ]
    //         },
    //         'applications'
    //       );
    //       this._fuseNavigationService.addNavigationItem(
    //         {
    //           id: 'contacts',
    //           title: 'Contacts',
    //           translate: '회원관리',
    //           type: 'item',
    //           icon: 'account_box',
    //           url: '/apps/contacts'
    //         },
    //         'applications'
    //       );
    //     }
    //   })
    //   .catch(err => console.log('fail to get todo count from service'));
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
   * Toggle sidebar open
   *
   * @param key
   * 오른쪽 테마 설정 (빨간색 버튼)
   */
  toggleSidebarOpen(key): void {
    this._fuseSidebarService.getSidebar(key).toggleOpen();
  }
}
