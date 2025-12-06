import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './edit-task.html',
  styleUrl: './edit-task.css'
})
export class EditTask implements OnInit {
  task: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.task = {
      _id: id,
      title: 'Sample Task',
      dueDate: '2024-12-31',
      completed: false
    };
  }

  updateTask(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const updatedTask = {
      title: formData.get('title'),
      dueDate: formData.get('dueDate'),
      completed: formData.get('completed') === 'true'
    };
    
    console.log('Update task:', updatedTask);
    this.router.navigate(['/']);
  }
}