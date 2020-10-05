import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  createProfileForm: FormGroup;
  user: User;

  constructor(
    public formBuilder: FormBuilder,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.auth.userData()
    this.createProfileForm = this.createCreateProfileForm()
    console.table(this.auth.userData());
  }

  private createCreateProfileForm() {
    return this.formBuilder.group({
      firstname: [(this.user.firstname || ''), Validators.required],
      lastname: [(this.user.lastname || ''), Validators.required],
      phone: [(this.user.phone || ''), Validators.required],
      email: [(this.user.email || ''), Validators.required]
    })
  }

  updateProfile() {
    
  }

}
