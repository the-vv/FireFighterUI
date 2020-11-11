import { Component, HostListener, OnInit } from '@angular/core';
import { ServerService } from '../server.service'

@Component({
  selector: 'app-manual',
  templateUrl: './manual.component.html',
  styleUrls: ['./manual.component.scss']
})
export class ManualComponent implements OnInit {

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    console.log(event);    
  }

  constructor(
    public socketServer: ServerService
  ) { }

  onControl(button, action){
      let command = {}
      command[button] = action
      console.log(command);      
  }

  ngOnInit(): void {
  }
 
}
