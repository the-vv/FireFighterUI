import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-controller-base',
  templateUrl: './controller-base.component.html',
  styleUrls: ['./controller-base.component.scss']
})
export class ControllerBaseComponent implements OnInit {

  constructor(public server: ServerService) { }

  ngOnInit(): void {
    this.server.initController()
  }

}
