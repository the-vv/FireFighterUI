import { Component, HostListener, OnInit } from '@angular/core';
import { ServerService } from '../server.service'

@Component({
  selector: 'app-manual',
  templateUrl: './manual.component.html',
  styleUrls: ['./manual.component.scss']
})
export class ManualComponent implements OnInit {

  prevState = null
  buttonActive = ''
  manualMode: boolean = false

  @HostListener('document:keydown', ['$event'])
  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.type != this.prevState) {
      // console.log(event);
      this.prevState = event.type
      if(event.code == 'Space'){        
        this.onControl('ext', event.type == 'keyup' ? false : true)
      }
      switch (event.key) {
        case 'ArrowUp':
          this.onControl('forward', event.type == 'keyup' ? false : true)
          break;
        case 'ArrowDown':
          this.onControl('back', event.type == 'keyup' ? false : true)
          break;
        case 'ArrowLeft':
          this.onControl('left', event.type == 'keyup' ? false : true)
          break;
        case 'ArrowRight':
          this.onControl('right', event.type == 'keyup' ? false : true)
          break;
        default:
          break;
      }
    }
  }

  constructor(
    public socketServer: ServerService
  ) { }

  onControl(button, action) {
    this.buttonActive = action ? button : '';
    let command = {}
    command = {
      button,
      action
    }
    // command[button] = action
    // console.log(command);
    this.socketServer.sendNav(command)
  }

  triggerManual(){
    console.log(this.manualMode);
    this.socketServer.customEmit(this.manualMode ? 'manual' : 'auto')
  }

  ngOnInit(): void {
  }

}
