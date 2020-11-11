import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { status } from './interfaces/mainStatus'

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  mainStatus: status;
  terminalLog: string = '';
  videoUrl = '';
  statusUrl = '';
  location: any

  constructor(
    private socket: Socket
    ) {
    socket.on('connect', () => {
      console.log('connected'); // true
    });
    socket.on('piLocation', (location) =>{
      console.log(location);      
      this.location = location;
    })
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

  sendNav(command: any){
    console.log(command);
    this.socket.emit('manualCommand', command);    
  }

  sendCommand(data: string, silent: boolean = false){    
    // console.log(data);
      this.terminalLog = this.terminalLog + '>> ' + data + '\n';
    let msgContainer = document.getElementById("terminal-display");           
    msgContainer.scrollTop = msgContainer.scrollHeight;
    this.socket.emit('newCommand', data)
  }

  customEmit(data: any){
    this.socket.emit('customEvent', data)
  }

  getStatusUrl(){ 
    if(this.statusUrl.length == 0){
      this.socket.emit('statusUrl', true, (url) =>{
        console.log(url)     
        this.statusUrl = url 
        return url;
      })
    } else{
      return this.statusUrl;
    }
  }

}
