import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  MatButtonModule,
  MatDividerModule,
  MatIconModule,
  MatTabsModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatInputModule,
  MatMenuModule,
  MatRippleModule,
  MatTableModule
} from '@angular/material';
import { FuseConfirmDialogModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';

import { ProfileService } from 'app/main/pages/profile/profile.service';
import { ProfileComponent } from 'app/main/pages/profile/profile.component';
import { ProfileTimelineComponent } from 'app/main/pages/profile/tabs/timeline/timeline.component';
import { ProfileAboutComponent } from 'app/main/pages/profile/tabs/about/about.component';
import { ProfilePhotosVideosComponent } from 'app/main/pages/profile/tabs/photos-videos/photos-videos.component';
import { ContactsContactFormDialogComponent } from 'app/main/pages/profile/contact-form/contact-form.component';

const routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    resolve: {
      profile: ProfileService
    }
  }
];

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileTimelineComponent,
    ProfileAboutComponent,
    ProfilePhotosVideosComponent,
    ContactsContactFormDialogComponent
  ],
  imports: [
    RouterModule.forChild(routes),

    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatTableModule,

    FuseConfirmDialogModule,
    FuseSharedModule
  ],
  providers: [ProfileService],
  entryComponents: [ContactsContactFormDialogComponent]
})
export class ProfileModule {}
