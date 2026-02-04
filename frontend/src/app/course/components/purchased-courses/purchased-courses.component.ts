import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../core/services/course.service';
import { Course } from '../../../core/models/course.model';

@Component({
  selector: 'app-purchased-courses',
  templateUrl: './purchased-courses.component.html',
  styleUrls: ['./purchased-courses.component.scss'],
  standalone: false
})
export class PurchasedCoursesComponent implements OnInit {
  courses: Course[] = [];
  loading = true;
  errorMessage = '';

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getPurchasedCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Unable to load purchased courses.';
      }
    });
  }
}
