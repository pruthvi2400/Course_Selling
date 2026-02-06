import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { PurchasedCoursesComponent } from './components/purchased-courses/purchased-courses.component';

@NgModule({
  declarations: [CourseListComponent, CourseDetailComponent, PurchasedCoursesComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule ],
  exports: [CourseListComponent, CourseDetailComponent, PurchasedCoursesComponent]
})
export class CourseModule {}
