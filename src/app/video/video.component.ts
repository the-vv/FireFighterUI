import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service'

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  trigger: boolean = true

  constructor(
    public socketService: ServerService
  ) { }

  ngOnInit(): void {
    !this.trigger && this.triggerVideo();
  }

  triggerVideo() {
    if (!this.trigger) {
      this.socketService.getStatusUrl()
    }
  }


}
