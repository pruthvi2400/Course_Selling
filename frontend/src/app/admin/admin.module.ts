import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { CreateEditCourseComponent } from './components/create-edit-course/create-edit-course.component';

@NgModule({
  declarations: [AdminDashboardComponent, CreateEditCourseComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [AdminDashboardComponent, CreateEditCourseComponent]
})
export class AdminModule {}
