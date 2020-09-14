import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guards',
  templateUrl: './guards.component.html',
  styleUrls: ['./guards.component.css']
})
export class GuardsComponent implements OnInit {

  guards = [
    {id: 1, name: "guard 1", description: "guard 1", email: "guard@email.com"},
    {id: 2, name: "guard 2", description: "guard 2", email: "guard2@email.com"},
    {id: 3, name: "guard 3", description: "guard 3", email: "guard3@email.com"},
    {id: 4, name: "guard 4", description: "", email: "guard4@email.com"}
  ];
  selectedEmployee;

  constructor() { }

  ngOnInit(): void {
  }

  public selectEmployee(e){
    this.selectedEmployee = e;
  }
}
