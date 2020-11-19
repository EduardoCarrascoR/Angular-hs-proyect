import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Message } from '../models/message.interface';
import { WebSocketService } from './web-socket.service';
export const UrlWS: string = environment.apiUrlWebSocket;


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  //loquito
  /* public messages: Subject<Message>
  constructor(private wsService: WebSocketService) { 
    this.messages = <Subject<Message>>wsService
      .connect(UrlWS)
      .map((response: MessageEvent): Message => {
        let data = JSON.parse(response.data);
        return {
          author: data.author,
          message: data.message
        }
      })
  } */
}
