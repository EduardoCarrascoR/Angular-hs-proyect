import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  createProfileForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createProfileForm = this.createCreateProfileForm()
  }

  private createCreateProfileForm() {
    return this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  updateProfile() {
    
  }

}
