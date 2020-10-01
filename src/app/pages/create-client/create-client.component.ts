import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

  createClientForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public api: ApiService
  ) { }

  ngOnInit(): void {
    this.createClientForm = this.createCreateClientForm()
  }
  
  private createCreateClientForm() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
    })
  }

  async addClient() {
    let name = this.createClientForm.value.name;
    let address = this.createClientForm.value.address;
    let phone = this.createClientForm.value.phone;
    let email = this.createClientForm.value.email;
    await this.api.postClient(name, address, phone, email)
    console.log('post realizado')
  }

}
