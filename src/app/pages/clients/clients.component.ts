import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[];

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.api.getClients().toPromise()
      .then((data: any) => {
        if(data.success === true){
          this.clients = data.clients
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

}
