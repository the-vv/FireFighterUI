import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service'

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  trigger: boolean = false

  constructor(
    public socketService: ServerService
  ) { }

  ngOnInit(): void {
    if (!this.trigger) {
      this.socketService.getStatusUrl()
      this.socketService.customEmit(false, 'getVideo')
    } else {
      this.socketService.customEmit(true, 'getVideo')
    }
  }

  triggerVideo() {    
    this.trigger = !this.trigger
    this.socketService.requestVideo(this.trigger)
    if (!this.trigger) {
      this.socketService.getStatusUrl()
      this.socketService.streamFrame = '../assets/frameLoader.gif';
    } else {
    }
  }


}
