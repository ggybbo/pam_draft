import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';
import { FuseSidebarModule } from '@fuse/components';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { CoursesComponent } from './courses/courses.component';
import { CourseComponent } from './course/course.component';
import { CoursesService } from './courses.service';
import { CourseService } from './course.service';
import { TransLevelPipe } from './academy.pipe';

const routes = [
  {
    path: 'courses',
    component: CoursesComponent,
    resolve: {
      academy: CoursesService
    }
  },
  {
    path: 'courses/:courseId/:courseSlug',
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
  declarations: [CoursesComponent, CourseComponent, TransLevelPipe],
  imports: [
    RouterModule.forChild(routes),
    SweetAlert2Module.forRoot(),

    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,

    FuseSharedModule,
    FuseSidebarModule
  ],
  providers: [CoursesService, CourseService]
})
export class AcademyModule {}
