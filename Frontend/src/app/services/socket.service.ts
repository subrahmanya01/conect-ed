import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import io from 'socket.io-client';
import { settings } from 'src/assets/appsettings';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket: any;
  baseURL:string= settings.SOCKET_URL;
  constructor() {
    this.socket = io(this.baseURL);
   }

  listen(eventName: string)
  { 
    return new Observable( subscriber =>{
      this.socket.on(eventName, (data:any)=>{
        subscriber.next(data)
      })
    }
    )
  }

  emit(eventName:string, data:any)
  {
    this.socket.emit(eventName, data);
  }
}
