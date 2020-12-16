import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  currentDate: Date
  ping: any = "null";
 
  constructor(
    public server: ServerService
  ) { }

  ngOnInit(): void {
    setInterval(() => {
      this.currentDate = new Date();      
    }, 1000);    
    this.server.distance.subscribe(ping => {
      this.ping = ping;
    })
  }

}
