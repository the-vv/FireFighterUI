import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { status } from './interfaces/mainStatus'

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  mainStatus: status;
  terminalLog: string = '';
  videoUrl = ''

  constructor(
    private socket: Socket
    ) {
    socket.on('connect', () => {
      console.log('connected'); // true
    });
    socket.on('disconnect', () => {
      console.log('Disconnected'); // false
      // location.href = 'https://firefighteronline.herokuapp.com'
    });
    socket.on('status', (data) => {
      console.log(data);
      this.mainStatus = data
    })
    socket.on('videoUrl', (data) =>{
      console.log('Video: ', data);      
      this.videoUrl = data;
    })
    socket.on('terminalLog', (data) =>{
      if(data){
        // console.log(data);
        this.terminalLog = this.terminalLog + data + '\n'
        let msgContainer = document.getElementById("terminal-display");           
        msgContainer.scrollTop = msgContainer.scrollHeight;
      }
    })
    this.socket.on('newSession', () =>{
      if(confirm('Session disconnected due to another session\nclick ok to reconnect')){
        location.reload()
      }else{
        // location.href = 'https://firefighteronline.herokuapp.com'
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
