import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: User = JSON.parse(sessionStorage.getItem('user'))
  constructor(
    private auth: AuthService
    ) { }
    
  ngOnInit(): void {
  }

  logout(): void {
    this.auth.logout();
  }

}
