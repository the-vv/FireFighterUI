import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ServerService } from '../server.service'
import 'ol/ol.css';
import mapboxgl from 'mapbox-gl';
import { AlertService } from '@full-fledged/alerts';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {

  constructor(
    public socketServer: ServerService,
    private alertService: AlertService
  ) { }

  marker: any
  map: any;
  mapShown = false;

  ngOnInit() {
    this.socketServer.location.subscribe(loc => {
      var data = [loc['latitude'], loc['longitude']]
      console.log(data);
      if (this.mapShown) {
        this.map.setCenter(data.reverse())
        this.marker.setLngLat(data)
      } 
      else { 
        this.setMap(data);
        this.mapShown = true;
      }
    })
  }

  ngAfterViewInit() {
  }

  setMap(loc: any) {
    mapboxgl.accessToken = 'pk.eyJ1IjoidGhlLXZ2IiwiYSI6ImNraXI1NzB5YTBlMTMydW9icGloNTQ5djUifQ.J9gsIPoIRnDTdFgMRHySXw';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/satellite-streets-v11',
      center: loc.reverse(),
      zoom: 16
    });
    this.marker = new mapboxgl.Marker({
      color: "#ff0000",
      draggable: false
      })
      .setLngLat(loc)
      .addTo(this.map);
  }

}
