import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-guards',
  templateUrl: './guards.component.html',
  styleUrls: ['./guards.component.css']
})
export class GuardsComponent implements OnInit {

  guards$: Observable<any>

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.guards$ = this.api.getGuards()
  }

}
