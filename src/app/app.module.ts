import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StatusComponent } from './status/status.component';
import { ManualComponent } from './manual/manual.component';
import { TerminalComponent } from './terminal/terminal.component';
import { VideoComponent } from './video/video.component';
import { MapComponent } from './map/map.component';
import { ServerService } from './server.service';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
 
@NgModule({
  declarations: [
    AppComponent,
    StatusComponent,
    ManualComponent,
    TerminalComponent,
    VideoComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    ServerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
