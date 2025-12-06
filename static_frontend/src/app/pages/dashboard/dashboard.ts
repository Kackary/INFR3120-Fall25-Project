import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  tasks: any[] = [];

  deleteTask(id: string) {
    this.tasks = this.tasks.filter(task => task._id !== id);
    console.log('Delete task:', id);
  }
}