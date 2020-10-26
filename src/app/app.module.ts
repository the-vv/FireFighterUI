import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StatusComponent } from './status/status.component';
import { ManualComponent } from './manual/manual.component';
import { TerminalComponent } from './terminal/terminal.component';
import { VideoComponent } from './video/video.component';
import { MapComponent } from './map/map.component';
import { ServerService } from './server.service';


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
  ],
  providers: [
    ServerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
