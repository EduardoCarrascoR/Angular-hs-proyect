import { Component, OnDestroy, OnInit } from '@angular/core';
import { toast } from 'angular2-materialize';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subscription } from 'rxjs';
import { catchError, delay, map, retryWhen, tap } from 'rxjs/operators';
import { ChatService } from 'src/app/services/chat.service';
import { environment } from 'src/environments/environment';
import { WebSocketService } from '../../services/web-socket.service';

// loquito youtube
export const UrlWS: string = environment.apiUrlWebSocket;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit/* , OnDestroy */ {
  reports=[];

  // loquito youtube miner grafic
  title = 'socket-front-client';
  user:any;
  user_id:any;
  msg:any;
  input_message:any;
  show_message:any;
  messages=[];

  constructor(protected socketService: WebSocketService,

    private cookieService: CookieService) {
    socketService.outEven.subscribe(res => {
        this.messages.push(res.msg)
    })

   }

  ngOnInit() {
    try{
      this.show_message = JSON.parse(this.cookieService.get('user'));
    }catch(e){
      this.show_message = null
    }
 
  }

   mockedUser = () => {
    this.cookieService.set('user',JSON.stringify({
      user:this.user ,
      id:this.user_id
    }))

    window.location.reload();
   }

   sendData = (event) =>{
    this.socketService.emitEvent(event,
      {
        message: this.input_message
      })
      this.input_message = null;
   }

  /* serverData;
  private socketSubscription: Subscription; */
  //loquita
  /* transactions$ = this.service.messages$.pipe(
    map(rows => rows['data']),
    catchError(error => { throw error }),
    tap({
      error: error => console.log('[Live Table component] Error:', error),
      complete: () => console.log('[Live Table component] Connection Closed')
    })
  ); */
  
  /* constructor(
    //loquita
    private service: WebSocketService
    //loquito
    private chatSevice: ChatService
    // loquito youtube miner grafic
    private minersService: WebSocketService
  ) { 
      //loquito
    chatSevice.messages.subscribe(msg => {
      console.log("Reponse From Websocket Server:" + msg)
    })

    // ngx-socket-io
    wss.outEven.subscribe(res => {
      this.reports.push(res.msg)
    })
  } */

  //loquito
  /* private message = {
    author: 'ediondo',
    message: 'sdihbaksbd'
  }

  sendMsg() {
    console.log("New message sent from client")
    this.chatSevice.messages.next(this.message)
  } */

 /*  ngOnInit() {
    this.reports = this.wss.getMessages$()
    //   // And the same goes for 'B'.
    //   () => ({ charts: 'charts' }),
    //   () => ({ charts: 'charts' }),
    //   message => message.type === 'charts'
    // );
    //loquita
    console.log(this.transactions$)
    // loquito youtube miner grafic
    this.init();
  } */

  ngOnChanges() {
    //loquita

    /* if (this.transactions$) {
      toast(`Nuevo reporte generado`, 4000);
    } */
  }
  // loquito youtube miner grafic
 /*  init() {
    const delayTime = 6000;
    this.socketSubscription = this.minersService.getMiners$(UrlWS)
      .pipe(
        retryWhen(errors =>
          errors.pipe(
            tap(err => {
              console.error('Got error', err);
            }),
            delay(delayTime),
          )
        )
      )
      .subscribe((latestStatus: any) => {
        this.serverData = latestStatus;
      }, err => {
        console.log('No more data');
        console.error(err);
      });
  }

  toggle() {
    if (this.socketSubscription && !this.socketSubscription.closed) {
      return this.socketSubscription.unsubscribe();
    }
    this.init();
  } */
  receivedReport() {
    //loquita
    /* if(this.transactions$) {
      toast(`Nuevo reporte generado`, 4000);
      console.log(this.transactions$ || JSON);
    } */
    
  }

  /* ngOnDestroy(){
    this.wss.closeConnection()
  } */

  //loquita
  /* ngAfterViewInit() {
    this.service.connect();
  } */
}
