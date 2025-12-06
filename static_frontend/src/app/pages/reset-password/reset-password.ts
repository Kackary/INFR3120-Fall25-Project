import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css'
})
export class ResetPassword {
  constructor(private router: Router) {}

  resetPassword(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    
    console.log('Reset password:', {
      email: formData.get('email'),
      newPassword: formData.get('newPassword')
    });
    
    this.router.navigate(['/login']);
  }
}