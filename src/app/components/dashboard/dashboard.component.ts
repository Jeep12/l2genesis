import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isSidebarClosed: boolean = false;


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  toggleSidebar(): void {
    this.isSidebarClosed = !this.isSidebarClosed;
  }


}
