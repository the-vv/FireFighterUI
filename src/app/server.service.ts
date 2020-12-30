import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { status } from './interfaces/mainStatus'
import { AlertService } from '@full-fledged/alerts';
import { NgxSpinnerService } from "ngx-spinner";

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  streamFrame = '../assets/frameLoader.gif';
  mainStatus: status;
  terminalLog: string = '';
  statusUrl = '';
  videoTrig: boolean;
  redirectSeconds: any;
  loadingText = 'Connecting...'
  location = this.socket.fromEvent<any>('piLocation')
  distance = this.socket.fromEvent<any>('ping')
  mapboxKey = this.socket.fromOneTimeEvent<any>('mapboxKey')


  constructor(
    private socket: Socket,
    private alert: AlertService,
    private spinner: NgxSpinnerService,
    private http: HttpClient
  ) {
    this.showSpinner('<br><br><h2 class="mt-sm-5" style="padding-bottom:10px;margin-bottom:0px;">Welcome to Fighter Control Panel</h2>Now establishing connection with fighter...')
    
  }

  showSpinner(message = 'Connecting...') {
    this.loadingText = message;
    this.spinner.show();
  }

  hideSpinner() {
    this.spinner.hide()
  }

  startRedirectTimer(duration = 30) {
    this.showSpinner('<br><h3>Disconnected!</h3>')
    this.redirectSeconds = setInterval(() => {
      this.loadingText = '<br><h3 class="mt-sm-5">Disconnected!</h3>You will be redirected in ' + duration + ' if unable to connect!'
      if (duration-- == 0) {
        clearInterval(this.redirectSeconds)
        location.href = 'https://firefighteronline.herokuapp.com'
      }
    }, 1000);
  }

  sendNav(command: any) {
    console.log(command);
    this.socket.emit('manualCommand', command);
  }

  sendCommand(data: string, silent: boolean = false) {
    // console.log(data);
    this.terminalLog = this.terminalLog + '>> ' + data + '\n';
    let msgContainer = document.getElementById("terminal-display");
    msgContainer.scrollTop = msgContainer.scrollHeight;
    this.socket.emit('newCommand', data)
  }

  customEmit(data: any, event: any = 'customEvent') {
    this.socket.emit(event, data)
  }

  requestVideo(action: boolean) {
    this.videoTrig = action;
    this.socket.emit('getVideo', action);
  }

  getStatusUrl() {
    if (this.statusUrl.length == 0) {
      this.socket.emit('statusUrl', true, (url) => {
        console.log(url)
        this.statusUrl = url
        return url;
      })
    } else {
      return this.statusUrl;
    }
  }

  startSocket() {
    this.socket.on('connect', () => {
      this.hideSpinner()
      // this.blockUI.stop();
      this.redirectSeconds && clearInterval(this.redirectSeconds)
      console.log('connected'); // true
      this.alert.success('Connected')
    });
    this.socket.on('disconnect', (err) => {
      this.startRedirectTimer()
      this.streamFrame = '../assets/frameLoader.gif'
      console.log('Disconnected', err); // false
      this.alert.danger('Disconnected')
      this.terminalLog = this.terminalLog + 'Disconnected from system' + '\n'
      let msgContainer = document.getElementById("terminal-display");
      msgContainer.scrollTop = msgContainer.scrollHeight;
      // location.href = 'https://firefighteronline.herokuapp.com'
    });
    this.socket.on('status', (data) => {
      console.log(data);
      this.mainStatus = data
    })
    this.socket.on('systemError', data => {
      this.alert.warning(data)      
    })
    this.socket.on('terminalLog', (data) => {
      if (data) {
        // console.log(data);
        this.terminalLog = this.terminalLog + data + '\n'
        let msgContainer = document.getElementById("terminal-display");
        msgContainer.scrollTop = msgContainer.scrollHeight;
      }
    })
    this.socket.on('newSession', () => {
      if (confirm('Session disconnected due to another session\nReconnect?')) {
        location.reload()
      } else {
        location.href = 'https://firefighteronline.herokuapp.com'
      }
    })
    this.socket.on('camFrame', data => {
      if (this.videoTrig) {
        this.streamFrame = 'data:image/jpg;base64, ' + data;
      }
    })
  }

}
