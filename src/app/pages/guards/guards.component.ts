import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Guard } from '../../models/guard.interface'

@Component({
  selector: 'app-guards',
  templateUrl: './guards.component.html',
  styleUrls: ['./guards.component.css']
})
export class GuardsComponent implements OnInit {

  guards: Guard = [
    {id: 1, name: "guard 1", email: "guard@email.com"},
    {id: 2, name: "guard 2", email: "guard2@email.com"},
    {id: 3, name: "guard 3", email: "guard3@email.com"},
    {id: 4, name: "guard 4", email: "guard4@email.com"}
  ];
  selectedEmployee;

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.api.getGuards().toPromise()
      .then((data: any) => {
        if(data.success === true){
          this.guards = data.guards
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  public selectEmployee(e){
    this.selectedEmployee = e;
  }
}
