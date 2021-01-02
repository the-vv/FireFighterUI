import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ServerService } from '../server.service';
import * as io from 'socket.io-client';


@Component({
  selector: 'starter-component',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss']
})
export class StarterComponent implements OnInit, OnDestroy {

  status: string = 'Unavailable'
  url: string;
  available: boolean = true;
  socket: any
  redirected = false
  showLoading = true;

  constructor(
    private http: HttpClient,
    public server: ServerService
  ) {
    this.socket = io('https://firefighteronline.herokuapp.com');

    this.socket.on('urlAvailable', (msg: any) => {
      console.log(msg);
      if (msg.url) {
        this.available = true
        server.FighterSystemUrl = msg.url
      }
    });
    this.socket.on('disconnect', () => {
      this.status = 'Disconnected';
      if (!this.redirected) {
        server.FighterSystemUrl = null;
      }
      this.available = false;
    })
    this.socket.on('status', (msg: any) => {
      console.log(msg);
      if (msg.status) {
        this.status = 'Connected';
        this.socket.emit('Angular', { angular: true })
      }
    });
    this.socket.on('urlError', () => {
      server.FighterSystemUrl = null;
      this.available = false;
    })
    this.socket.on('newSession', () => {
      server.FighterSystemUrl = null;
      this.available = false;
      this.status = 'Disconnected';
      confirm('Session disconnected due to another session\nclick ok to reconnect') && this.reload()
    })
  }

  reload() {
    location.reload()
  }

  ngOnDestroy() {
    this.redirected = true;
    this.socket.close()
  }

  ngOnInit() {
    this.redirected = true
    this.showLoading = true;
    this.http.get<any>('https://firefighteronline.herokuapp.com/geturl')
      .subscribe((data) => {
        this.showLoading = false
        if (data) {
          this.server.FighterSystemUrl = data.url
          if (data.url?.length) {
            console.log(this.server.FighterSystemUrl);
            // this.server.FighterSystemUrl = data.url
          } else {
            console.log(this.server.FighterSystemUrl);
            this.available = false
          }
        }
      }, (err) => {
        console.log(err);
        this.available = false
      })
  }

} 
