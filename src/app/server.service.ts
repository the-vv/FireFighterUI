import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { status } from './interfaces/mainStatus'

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  mainStatus: status;

  constructor(private socket: Socket) {
    socket.on('status', (data) => {
      console.log(data);
      this.mainStatus = data
    })
  }
}
