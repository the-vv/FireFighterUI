import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor( private socket: Socket ) { 
    socket.on('status', (data) =>{
      console.log(data);      
    })
  }
}
