import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ServerService } from '../server.service';
import * as io from 'socket.io-client';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  status: string = 'Unavailable'
  url: string;
  available: boolean = true;
  socket: any

  constructor(
    private http: HttpClient,
    public server: ServerService
  ) {

    this.socket = io();

    this.socket.on('urlAvailable', (msg: any) => {
      console.log(msg);
      if (msg.url) {
        this.available = true
        server.FighterSystemUrl = msg.url
      }
    });
    this.socket.on('disconnect', () => {
      this.status = 'Disconnected';
      server.FighterSystemUrl = null;
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
    this.socket.on('newSession', () =>{
      server.FighterSystemUrl = null;
      this.available = false;
      this.status = 'Disconnected';
      confirm('Session disconnected due to another session\nclick ok to reconnect') && this.reload()
    })
  }

  reload(){
    location.reload()
  }

  ngOnInit() {
    this.http.get<any>('/geturl')
      .subscribe((data) => {
        if (data) {
          if (data.url?.length) {
            console.log(data);
            this.server.FighterSystemUrl = data.url
          } else {
            console.log(data);
            this.available = false
          }
        }
      }, (err) => {
        console.log(err);
        this.available = false
      })
  }

} 
