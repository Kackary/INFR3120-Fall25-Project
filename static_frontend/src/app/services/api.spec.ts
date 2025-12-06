import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  backend = "https://infr3120-fall25-project-cnvg.onrender.com/";

  constructor(private http: HttpClient) {}

  login(body: any) {
    return this.http.post(`${this.backend}/login`, body);
  }

  register(body: any) {
    return this.http.post(`${this.backend}/register`, body);
  }

  resetPassword(body: any) {
    return this.http.post(`${this.backend}/reset-password`, body);
  }

  getTasks() {
    return this.http.get(`${this.backend}/api/tasks`);
  }

  addTask(body: any) {
    return this.http.post(`${this.backend}/api/tasks`, body);
  }

  updateTask(id: string, body: any) {
    return this.http.post(`${this.backend}/api/tasks/${id}`, body);
  }

  deleteTask(id: string) {
    return this.http.delete(`${this.backend}/api/tasks/${id}`);
  }
}