import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../core/services/course.service';
import { Course } from '../../../core/models/course.model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
  standalone: false
})
export class CourseDetailComponent implements OnInit {
  course?: Course;
  loading = true;
  errorMessage = '';
  successMessage = '';
  purchasing = false;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id');
    if (!courseId) {
      this.loading = false;
      this.errorMessage = 'Course not found.';
      return;
    }

    this.courseService.getCourse(courseId).subscribe({
      next: (course) => {
        this.course = course;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Unable to load course details.';
      }
    });
  }

  purchaseCourse(): void {
    if (!this.course || this.purchasing) {
      return;
    }

    this.purchasing = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.courseService.purchaseCourse(this.course._id).subscribe({
      next: (response) => {
        this.purchasing = false;
        this.successMessage = response.message || 'Course purchased successfully.';
      },
      error: (error) => {
        this.purchasing = false;
        this.errorMessage = error?.error?.message ?? 'Unable to complete purchase.';
      }
    });
  }
}
