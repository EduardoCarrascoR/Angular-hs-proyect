import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { toast } from 'angular2-materialize';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

  createClientForm: FormGroup;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private api: ApiService
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

  addClient() {
    let name = this.createClientForm.value.name;
    let address = this.createClientForm.value.address;
    let phone = this.createClientForm.value.phone.toString();
    let email = this.createClientForm.value.email;
    this.api.postClient(name, address, phone, email).toPromise()
    .then((res: any) => {
      console.log(res);
      toast('Cliente creado correctamente', 3000)
      this.router.navigate(['/dashboard/clients'])
    })
    .catch(err => {
      toast('Error al crear cliente', 3000)
    })
  }

}
