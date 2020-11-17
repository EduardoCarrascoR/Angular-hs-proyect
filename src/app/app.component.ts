import { Component } from '@angular/core';
import * as socket from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private socket: any;
  public data: any;

  constructor() {
    // Connect Socket with server URL
    this.socket = socket.io('http://localhost:4001');
  }
  public ngOnInit(): void {
    this.socket.on('connection', data => {
      this.data = data;
    });
    console.log(this.data)
  }
}
