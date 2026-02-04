import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../../core/services/course.service';

@Component({
  selector: 'app-create-edit-course',
  templateUrl: './create-edit-course.component.html',
  styleUrls: ['./create-edit-course.component.scss']
})
export class CreateEditCourseComponent implements OnInit {
  loading = false;
  errorMessage = '';
  successMessage = '';
  courseId: string | null = null;

  form = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    price: [0, [Validators.required, Validators.min(0)]]
  });

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    if (this.courseId) {
      this.loading = true;
      this.courseService.getCourse(this.courseId).subscribe({
        next: (course) => {
          this.form.patchValue(course);
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.errorMessage = 'Unable to load course details.';
        }
      });
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const action = this.courseId
      ? this.courseService.updateCourse(this.courseId, this.form.getRawValue())
      : this.courseService.createCourse(this.form.getRawValue());

    action.subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = this.courseId ? 'Course updated.' : 'Course created.';
        if (!this.courseId) {
          this.router.navigate(['/admin']);
        }
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error?.error?.message ?? 'Unable to save course.';
      }
    });
  }
}
