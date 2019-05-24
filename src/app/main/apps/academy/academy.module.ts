import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { FuseSidebarModule } from '@fuse/components';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { CoursesComponent } from './courses/courses.component';
import { CourseComponent } from './course/course.component';
import { CoursesService } from './courses.service';
import { CourseService } from './course.service';
import { TransLevelPipe } from './academy.pipe';
import { SanitizerPipe } from './sanitizer.pipe';
import { OembedPipe } from './oembed.pipe';
import { MemoComponent } from './course/memo/memo.component';

// import { CKEditorModule } from '../../../../ckeditor/ckeditor.module';

const routes = [
  {
    path: 'courses',
    component: CoursesComponent,
    resolve: {
      academy: CoursesService
    }
  },
  {
    path: 'courses/:cId',
    component: CourseComponent,
    resolve: {
      academy: CourseService
    }
  },
  {
    path: '**',
    redirectTo: 'courses'
  }
];

@NgModule({
  declarations: [
    CoursesComponent,
    CourseComponent,
    TransLevelPipe,
    SanitizerPipe,
    OembedPipe,
    MemoComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SweetAlert2Module.forRoot(),

    MatFormFieldModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule,

    FuseSharedModule,
    FuseSidebarModule

    // CKEditor 5
    // CKEditorModule
  ],
  providers: [CoursesService, CourseService],
  entryComponents: [MemoComponent]
})
export class AcademyModule {}
