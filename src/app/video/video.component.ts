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
  }


}
