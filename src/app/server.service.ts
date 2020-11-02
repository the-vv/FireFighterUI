import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { status } from './interfaces/mainStatus'

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  mainStatus: status;
  terminalLog: string = '';

  constructor(private socket: Socket) {
    socket.on('status', (data) => {
      console.log(data);
      this.mainStatus = data
    })
    socket.on('terminalLog', (data) =>{
      if(data){
        // console.log(data);
        this.terminalLog = this.terminalLog + data + '\n'
        let msgContainer = document.getElementById("terminal-display");           
        msgContainer.scrollTop = msgContainer.scrollHeight;
      }
    })
  }

  sendCommand(data: string){    
    // console.log(data);    
    this.terminalLog = this.terminalLog + '>> ' + data + '\n';
    let msgContainer = document.getElementById("terminal-display");           
    msgContainer.scrollTop = msgContainer.scrollHeight;
    this.socket.emit('newCommand', data)
  }

}
