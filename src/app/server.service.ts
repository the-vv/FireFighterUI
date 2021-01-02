import { Injectable } from '@angular/core';
import { status } from './interfaces/mainStatus'
import { AlertService } from '@full-fledged/alerts';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import * as io from 'socket.io-client';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  FighterSystemUrl = '';
  streamFrame = '../assets/frameLoader.gif';
  mainStatus: status;
  terminalLog: string = '';
  statusUrl = '';
  videoTrig: boolean;
  redirectSeconds: any;
  loadingText = 'Connecting...';
  fighterConectionStatus = false;
  ping: any = "null";
  socketTest: SocketIOClient.Socket = io('null');

  constructor(
    private alert: AlertService,
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private router: Router
  ) {
    this.socketTest.close()
    this.showSpinner('<br><br><h2 class="mt-sm-5" style="padding-bottom:10px;margin-bottom:0px;">Welcome to Fighter Control Panel</h2>Now establishing connection with fighter...')
  }

  initController() {
    if (this.FighterSystemUrl && !this.fighterConectionStatus) {
      this.socketTest.close()
      this.socketTest = io(this.FighterSystemUrl)
      this.socketTest.on('connect', () => {
        this.hideSpinner()
        this.fighterConectionStatus = true
        // this.blockUI.stop();
        this.redirectSeconds && clearInterval(this.redirectSeconds)
        console.log('connected'); // true
        // this.socketTest.removeAllListeners()
        this.socketTest.removeListener('systemError');
        this.socketTest.removeListener('terminalLog');
        this.socketTest.removeListener('camFrame');
        this.socketTest.removeListener('ping');
        this.alert.success('Connected')
        this.startSocket(this.socketTest)
      })
    }
    else if (!this.fighterConectionStatus) {
      this.showSpinner('<span class="text-danger h4">Server Communication error occured<br>Redirecting...</span>');
      setTimeout(() => {
        this.loadingText = '<br><b>Now establishing connection with fighter...';
        this.router.navigate(['/starter'])
      }, 2000);
    }
  }

  showSpinner(message = 'Connecting...') {
    this.loadingText = message;
    this.spinner.show();
  }

  hideSpinner() {
    this.spinner.hide()
  }

  startRedirectTimer(duration = 15) {
    this.showSpinner('<br><h3>Disconnected!</h3>')
    this.redirectSeconds = setInterval(() => {
      this.loadingText = '<br><h3 class="mt-sm-5">Disconnected!</h3>You will be redirected in ' + duration + ' seconds, if unable to reconnect!'
      if (duration-- == 0) {
        clearInterval(this.redirectSeconds)
        this.socketTest.close()
        this.router.navigate(['/starter'])
      }
    }, 1000);
  }

  sendNav(command: any) {
    console.log(command);
    this.socketTest.emit('manualCommand', command);
  }

  sendCommand(data: string, silent: boolean = false) {
    // console.log(data);
    this.terminalLog = this.terminalLog + '>> ' + data + '\n';
    let msgContainer = document.getElementById("terminal-display");
    msgContainer.scrollTop = msgContainer.scrollHeight;
    this.socketTest.emit('newCommand', data)
  }

  customEmit(data: any, event: any = 'customEvent') {
    this.socketTest.emit(event, data)
  }

  requestVideo(action: boolean) {
    this.videoTrig = action;
    this.socketTest.emit('getVideo', action);
  }

  getStatusUrl() {
    if (this.statusUrl.length == 0) {
      this.socketTest.emit('statusUrl', true, (url) => {
        console.log(url)
        this.statusUrl = url
        return url;
      })
    } else {
      return this.statusUrl;
    }
  }

  startSocket(socket) {
    socket.on('disconnect', (err) => {
      this.startRedirectTimer()
      this.fighterConectionStatus = false
      this.streamFrame = '../assets/frameLoader.gif'
      console.log('Disconnected', err); // false
      this.alert.danger('Disconnected')
      this.terminalLog = this.terminalLog + 'Disconnected from system' + '\n'
      let msgContainer = document.getElementById("terminal-display");
      msgContainer.scrollTop = msgContainer.scrollHeight;
      // location.href = 'https://firefighteronline.herokuapp.com'
    });
    socket.on('status', (data) => {
      console.log(data);
      this.mainStatus = data
    })
    socket.on('systemError', data => {
      this.alert.warning(data)
    })
    socket.on('terminalLog', (data) => {
      if (data) {
        // console.log(data);
        this.terminalLog = this.terminalLog + data + '\n'
        let msgContainer = document.getElementById("terminal-display");
        msgContainer.scrollTop = msgContainer.scrollHeight;
      }
    })
    socket.on('newSession', () => {
      if (confirm('Session disconnected due to another session\nReconnect?')) {
        this.router.navigate(['/starter'])
      } else {
        this.router.navigate(['/starter'])
      }
    })
    this.socketTest.on('ping', ping => {
      this.ping = ping
    })
    socket.on('camFrame', data => {
      if (this.videoTrig) {
        this.streamFrame = 'data:image/jpg;base64, ' + data;
      }
    })
  }

}
