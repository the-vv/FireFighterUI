import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ServerService } from '../server.service'

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit, AfterViewInit {

  currentCommand: string
  msgContainer

  constructor(
    public server: ServerService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
  }

  onSubmit(){
    if(this.currentCommand?.length){
      this.server.sendCommand(this.currentCommand)
      this.currentCommand = ''
    }
  }

}
