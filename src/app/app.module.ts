import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import {
  FuseProgressBarModule,
  FuseSidebarModule,
  FuseThemeOptionsModule
} from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
// import { JwtInterceptor, ErrorInterceptor } from './services/auth/_helpers';
import { AuthGuard } from './services/auth/_guards';

import { TodoCountService } from './services/todo/todocount.service';

const appRoutes: Routes = [
  {
    path: 'apps',
    loadChildren: './main/apps/apps.module#AppsModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'pages',
    loadChildren: './main/pages/pages.module#PagesModule'
  },
  {
    path: 'documentation',
    loadChildren:
      './main/documentation/documentation.module#DocumentationModule'
  },
  {
    path: '**',
    redirectTo: 'pages/profile'
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),

    TranslateModule.forRoot(),

    // Material moment date module
    MatMomentDateModule,

    // Material
    MatButtonModule,
    MatIconModule,

    // Fuse modules
    FuseModule.forRoot(fuseConfig),
    FuseProgressBarModule,
    FuseSharedModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,

    // third party modules
    SweetAlert2Module.forRoot(),

    // App modules
    LayoutModule,
    SampleModule
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    TodoCountService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
