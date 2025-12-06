import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css'
})
export class AddTask {
  constructor(private router: Router) {}

  addTask(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const task = {
      title: formData.get('title'),
      dueDate: formData.get('dueDate'),
      completed: false
    };
    
    console.log('Add task:', task);
    
    this.router.navigate(['/']);
  }
}