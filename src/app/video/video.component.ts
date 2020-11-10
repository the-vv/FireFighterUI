import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service'

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  constructor(
    public socketService: ServerService
  ) { }

  ngOnInit(): void {
  }

}
