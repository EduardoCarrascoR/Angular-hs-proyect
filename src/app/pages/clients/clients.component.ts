import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients = [
    {id: 1, name: "client 1", description: "client 1", email: "client1@email.com"},
    {id: 2, name: "client 2", description: "client 2", email: "clien2@email.com"},
    {id: 3, name: "client 3", description: "client 3", email: "client3@email.com"},
    {id: 4, name: "client 4", description: "client 4", email: "client4@email.com"}
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
