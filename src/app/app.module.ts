import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AlertModule } from '@full-fledged/alerts';
import { NgxSpinnerModule } from "ngx-spinner";
import { UiSwitchModule } from 'ngx-toggle-switch';

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
    AlertModule.forRoot({maxMessages: 5, timeout: 5000, positionX: 'right', positionY: 'top'}),
    NgxSpinnerModule,
    UiSwitchModule
  ],
  providers: [
    ServerService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
