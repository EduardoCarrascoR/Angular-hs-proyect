import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-guards',
  templateUrl: './guards.component.html',
  styleUrls: ['./guards.component.css']
})
export class GuardsComponent implements OnInit {

  guards: User[];

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

}
