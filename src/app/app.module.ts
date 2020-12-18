import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AlertModule } from '@full-fledged/alerts';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StatusComponent } from './status/status.component';
import { ManualComponent } from './manual/manual.component';
import { TerminalComponent } from './terminal/terminal.component';
import { VideoComponent } from './video/video.component';
import { MapComponent } from './map/map.component';
import { ServerService } from './server.service';
import { SafePipe } from './safepipe'

const config: SocketIoConfig = { url: 'https://92de65accbad.ngrok.io', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    StatusComponent,
    ManualComponent,
    TerminalComponent,
    VideoComponent,
    MapComponent,
    SafePipe
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    AlertModule.forRoot({maxMessages: 5, timeout: 5000, positionX: 'right', positionY: 'top'})
  ],
  providers: [
    ServerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
