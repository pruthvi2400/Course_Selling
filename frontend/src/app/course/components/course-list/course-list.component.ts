import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../core/services/course.service';
import { Course } from '../../../core/models/course.model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  standalone: false
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  loading = true;
  errorMessage = '';
  private readonly demoCourses: Course[] = [
    {
      _id: 'demo-1',
      title: 'Frontend Foundations',
      description: 'Build clean, responsive interfaces with modern tooling.',
      price: 49
    },
    {
      _id: 'demo-2',
      title: 'Node.js API Bootcamp',
      description: 'Design and ship REST APIs using Express and MongoDB.',
      price: 69
    },
    {
      _id: 'demo-3',
      title: 'Productivity for Developers',
      description: 'Upgrade your workflow with automation and best practices.',
      price: 39
    }
  ];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.courses = this.demoCourses;
        this.errorMessage = 'Backend unavailable. Showing demo courses.';
      }
    });
  }
}
