import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

// ngx-socket-io
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs';
// rxjs
import * as Rx from "rxjs";
// rxjs doc
import { webSocket } from "rxjs/webSocket";
import { catchError, delayWhen, retryWhen, switchAll, tap } from 'rxjs/operators';
export const UrlWS: string = environment.apiUrlWebSocket;

import * as socketio from 'socket.io-client';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
// ngx-socket-io
export class WebSocketService extends Socket {
  // ngx-socket-io ngx-socket-service @leifer33
  @Output() outEven: EventEmitter<any> = new EventEmitter();
    
  //  * En nuestro constructor injectamos el "CookieService" para luego hacer uso de sus metodos.
  
  constructor(private cookieService: CookieService) {

    
    //  * En nuestro "super" declaramos la configuración inicial de conexión la cual hemos declarado en nuestro
    //  * "environment.serverSocket",
    //  * tambien vemos como pasamos el "payload" dentro de options y "query"
    

    super({
        url: UrlWS,
        options: {
            query: {
                payload: cookieService.get('user')
            }
        }

    });

    
    //  * ---------------- ESCUCHAMOS----------------
    //  * En este punto nuestro socket.io-client esta listo para recibir los eventos.
    //  * 
    //  * En esta funcion vemos como esta preparado para recibir un evento llamado "message" el cual
    //  * una vez sea recibido va a emitir por nuestro "outEven"
    

    this.ioSocket.on('message', res => this.outEven.emit(res))
  }

  
  // * ---------------- EMITIR-------------------
  // * Ahora solo nos falta poder emitir mensajes, para ello declaramos la funcion
  // * "emitEvent" la cual va ser disparada por un "(click)" la cual emite un envento
  // * con el nombre "default", y un payload de información el cual sera parseado 
  // * por nuestro backend.
 

  emitEvent = (event = 'default',payload = {}) => {
    this.ioSocket.emit('default', {
        cookiePayload:this.cookieService.get('user'),
        event,
        payload
    });
  }


  //loquito
  /* private subject: Rx.Subject<MessageEvent> */
  
  /* constructor(
    
    ) {
      // ngx-socket-io
      super({
        url: UrlWS,
        
      });
      
    } */
  // rxjs doc
  /* private subject = webSocket(UrlWS);
  
  constructor() {
    
    this.subject.subscribe(
      msg => console.log('message received: ' + msg), // Called whenever there is a message from the server.
      err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    );
    const observableA = this.subject.multiplex(
      () => ({subscribe: 'A'}), // When server gets this message, it will start sending messages for 'A'...
      () => ({unsubscribe: 'A'}), // ...and when gets this one, it will stop.
      message => message === 'A' // If the function returns `true` message is passed down the stream. Skipped if the function returns false.
    );

    const subA = observableA.subscribe(messageForA => console.log(messageForA))
  } */

  //loquito
  /* public connect(url): Rx.Subject<MessageEvent> {
    if(!this.subject) {
      this.subject = this.create(url)
      console.log("Successfully connect" + url)
    }
    return this.subject
  }

  private create(url): Rx.Subject<MessageEvent> {
    let ws = new WebSocket(url)

    let observable = Rx.Observable.create(
      (obs: Rx.Observer<MessageEvent>) => {
        ws.onmessage = obs.next.bind(obs)
        ws.onerror = obs.error.bind(obs)
        ws.onclose = obs.complete.bind(obs)
        return ws.close.bind(obs)
      }
    )

    let observer = {
      next: (data: Object) => {
        if(ws.readyState === WebSocket.OPEN){
          ws.send(JSON.stringify(data))
        }
      }
    }

    return Rx.Subject.create(observer, observable )
  } */
  // ngx-socket-io
  /* public getMessages$() {
    this.ioSocket.on('message', res => this.outEven.emit(res))
    
  } */

  //loquita
  /* private socket$;
  private messagesSubject$ = new Subject();
  public messages$ = this.messagesSubject$.pipe(switchAll(), catchError(e => { throw e }));

  constructor() {
  }

  *
   * Creates a new WebSocket subject and send it to the messages subject
   * @param cfg if true the observable will be retried.
  
  public connect(cfg: { reconnect: boolean } = { reconnect: false }): void {

    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();
      const messages = this.socket$.pipe(cfg.reconnect ? this.reconnect : o => o,
        tap({
          error: error => console.log(error),
        }), catchError(_ => Rx.EMPTY))
      //toDO only next an observable if a new subscription was made double-check this
      this.messagesSubject$.next(messages);
    }
  }

  
  //  * Retry a given observable by a time span
  //  * @param observable the observable to be retried
  
  private reconnect(observable: Rx.Observable<any>): Rx.Observable<any> {
    return observable.pipe(retryWhen(errors => errors.pipe(tap(val => console.log('[Data Service] Try to reconnect', val)),
      delayWhen(_ => Rx.timer(60000)))));
  }

  close() {
    this.socket$.complete();
    this.socket$ = undefined;
  }

  sendMessage(msg: any) {
    this.socket$.next(msg);
  }

  //  * Return a custom WebSocket subject which reconnects after failure
  
  private getNewWebSocket() {
    return webSocket({
      url: UrlWS,
      openObserver: {
        next: () => {
          console.log('[DataService]: connection ok');
        }
      },
      closeObserver: {
        next: () => {
          console.log('[DataService]: connection closed');
          this.socket$ = undefined;
          this.connect({ reconnect: true });
        }
      },

    });
  } */

  // loquito youtube miner grafic
  /* constructor() { }

  public getMiners$(uri) {
    return new Rx.Observable(observer => {
      try {
        const minerSocket = webSocket(uri);
        minerSocket.subscribe((d) =>
          console.log(':::webSocket Miner arrived'),
          (err) => console.warn(':::webSocket Miner DIDNOT arrived'),
          () => console.log(':::webSocket COMPLETED')
        );
        const socket$ = new WebSocket(uri)
        const socket = socketio.io(uri,{
          path: '/websocket',
          transports: ['websocket']         
          
          reconnection: true,
          reconnectionAttempts: Infinity,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 5000,
          randomizationFactor: 0.5,
          timeout: 20000,
          autoConnect: true,
          query: {},
          // options of the Engine.IO client
          upgrade: true,
          forceJSONP: false,
          jsonp: true,
          forceBase64: false,
          enablesXDR: false,
          timestampRequests: true,
          timestampParam: 't',
          transports: ['polling', 'websocket'],
          transportOptions: {},
          rememberUpgrade: false,
          onlyBinaryUpgrades: false,
          // options for Node.js
          agent: false,
          pfx: null,
          key: null,
          passphrase: null,
          cert: null,
          ca: null,
          rejectUnauthorized: true,
        });
        socket$.addEventListener('open', function (event) {
          socket$.send('Hello Server!');
          observer.next( event );
        })
        socket$.addEventListener('message', function (event) {
          console.log('Message from server ', event.data);
          observer.next( event.data );
        });
        
        socket.on('connect', () => {
          console.log('WS: Connected', socket.id);
        });

        socket.on('message', ( minerLastValue ) => {
          console.log('WS: Message');
          observer.next( minerLastValue );
        });

        socket.on('newReport', ( minerLastValue ) => {
          console.log('WS: newReport');
          observer.next( minerLastValue );
        });

        socket.on('disconnect', () => {
          console.warn('WS: Disconnected!');
          // observer.complete();
        });

        socket.on('error', (error) => {
          console.log('WS: Error!');
          observer.error(error);
        });

        socket.on('connect_error', (error) => {
          console.log('WS: Connect error');
          observer.error(error);
        });

        return () => {
          console.log('Observable completed!');
          socket.disconnect();
        };

      } catch (error) {
        observer.error(error);
      }
    });
  } */
  // @leifer33


  receivedReport() {
    /* const observableB = this.socket$.wsSubject().multiplex(
        // And the same goes for 'B'.
        () => ({ charts: 'newReport' }),
        () => ({ charts: 'newReport' }),
        message => message.type === 'newReport'
      );
      observableB.subscribe(msg => {
        console.log('newReport');
        // this.copy = this.barData;
        // this.copy.datasets[0].data = msg.data;
        // this.barData = { ...this.copy };
        return msg.data
      }); */
  }
}
